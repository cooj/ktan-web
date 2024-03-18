import type { H3Event } from 'h3'

// import { ResponseMessage } from '~/config/message'

/**
 * 获取系统信息
 */
export const getSystemInfo = async (event: H3Event) => {
    // 接口校验
    // if (!event.context.user) return ResponseMessage.token

    const [res1, res2] = await Promise.all([
        event.context.prisma.system.findUnique({ where: { id: 1 } }),
        event.context.prisma.system.findUnique({ where: { id: 2 } }),
    ])
    if (res1 && res2) {
        return {
            ...res1,
            title_en: res2.title,
            address_en: res2.address,
            filing_en: res2.filing,
            copyright_en: res2.copyright,
        }
    } else {
        return null
    }
}

/**
 * 获取菜单
 */
export const getMenuList = async (event: H3Event) => {
    // 接口校验
    // if (!event.context.user) return ResponseMessage.token

    // const lang = useCookie<'cn' | 'en'>('i18n_redirected')

    // 获取参数
    const param = await getEventParams<{ status: number | boolean }>(event)

    const where: any = {
        p_id: 0,
    }
    if (param?.status) where.status = 1

    const res = await event.context.prisma.menu.findMany({
        where,
        orderBy: {
            sort: 'asc', // 按id正序排序
        },
        include: {
            children: true,
        },
        // select: { // 只返回指定的字段
        //     username: true,
        //     account: true,
        // },
    })

    return res
}

/**
 * 获取轮播图
 */
export const getBannerList = async (event: H3Event) => {
    // 接口校验
    // if (!event.context.user) return ResponseMessage.token

    // const lang = useCookie<'cn' | 'en'>('i18n_redirected')

    // 获取参数
    const param = await getEventParams<{ type: number } & ListPage>(event)

    const types = param?.type.toString().split(',').filter(item => !!item).map(item => Number(item))
    const where: any = {
        type: { in: types },
        isHide: false,
    }

    const res = await event.context.prisma.link.findMany({
        skip: 0,
        take: 10,
        where,
        orderBy: {
            sort: 'asc', // 按id正序排序
        },
        // include: {
        //     children: true,
        // },
        // select: { // 只返回指定的字段
        //     username: true,
        //     account: true,
        // },
    })

    return res
}

/**
 * 获取文件列表
 */
export const getFileList = async (event: H3Event) => {
    // 接口校验
    // if (!event.context.user) return ResponseMessage.token

    // const lang = useCookie<'cn' | 'en'>('i18n_redirected')

    // 获取参数
    const param = await getEventParams<{ type: number } & ListPage>(event)

    const where: any = {
        type: param?.type ? Number(param?.type) : 1,
        isHide: false,
    }
    if (param?.type) {
        where.type = { in: [Number(param?.type)] }
    } else {
        where.type = { in: [2, 3, 4] }
    }

    let page: number | undefined
    let pageSize: number | undefined
    let pageSkip: number | undefined

    if (param?.isPage) {
        page = param.page || 1
        pageSize = Number(param.pageSize) || 20
        pageSkip = pageSize * (page - 1) || 0
    }
    // console.log('where :>> ', where)
    const [res1, res2] = await Promise.all([
        event.context.prisma.link.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: {
                sort: 'asc', // 按id正序排序
            },
            include: {
                Product: {
                    include: {
                        links: {
                            where: {
                                type: 1,
                            },
                        },
                    },
                },
            },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        event.context.prisma.link.count({
            where,
        }),
    ])

    if (res1) {
        res1.forEach((item) => {
            if (!item?.img) item.img = item.Product?.links[0]?.img || ''
        })
        return { code: 200, data: { list: res1, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
}

/**
 * 获取关于我们、联系我们的内容
 */
export const getAboutInfo = async (event: H3Event) => {
    // 获取参数
    const param = await getEventParams<{ type: string }>(event)

    if (!param?.type) return { msg: '不存在记录' }

    const res = await event.context.prisma.other.findUnique({
        where: {
            key: param.type,
        },
    })

    return res
}

/**
 * 获取商品
 */
export const getGoodsList = async (event: H3Event) => {
    // TODO: 商品
    // 获取参数
    const param = await getEventParams<{ type: string }>(event)

    if (!param?.type) return { msg: '不存在记录' }

    const res = await event.context.prisma.other.findUnique({
        where: {
            key: param.type,
        },
    })
    return res
}

/**
 * 获取新闻详情
 */
export const getNewsInfo = async (event: H3Event) => {
    // 获取参数
    const param = await getEventParams<{ id: number, type: number }>(event)

    if (!param?.id) return null
    // if (!param?.type) return null

    const res = await event.context.prisma.news.findUnique({
        where: {
            id: Number(param.id),
            // type: Number(param.type),
        },
    })

    if (!res) return null
    // 取得上一条、下一条记录、更新阅读量
    const [res1, res2] = await Promise.all([
        event.context.prisma.news.findMany({ // lte 小于等于，使用倒序
            where: {
                createdAt: {
                    lte: res.createdAt,
                },
                id: { // 排除
                    not: res.id,
                },
                type: res.type, // 类型相同
            },
            orderBy: {
                createdAt: 'desc', // 倒序排序
            },
        }),
        event.context.prisma.news.findMany({ // gte 大于等于，使用正序
            where: {
                createdAt: {
                    gt: res.createdAt,
                },
                id: {
                    not: res.id,
                },
                type: res.type,
            },
            orderBy: {
                createdAt: 'asc', // 升序排序
            },
        }),
        event.context.prisma.news.update({
            where: {
                id: res.id,
            },
            data: {
                read: (res.read || 0) + 1,
            },
        }),
    ])

    return {
        data: res,
        prevNews: res1[0],
        nextNews: res2[0],
    }
}

/**
 * 获取商品详情
 */
export const getProductInfo = async (event: H3Event) => {
    // 获取参数
    const param = await getEventParams<{ id: number }>(event)

    if (!param?.id) return null

    const res = await event.context.prisma.product.findUnique({
        where: {
            id: Number(param.id),
            // type: Number(param.type),
        },
        include: {
            links: true,
            classify: {
                include: {
                    parent: true,
                },
            },
        },
    })

    if (!res) return null
    // 取得上一条、下一条记录、更新阅读量
    // const [res1, res2] = await Promise.all([
    //     event.context.prisma.product.findMany({ // lte 小于等于，使用倒序
    //         where: {
    //             createdAt: {
    //                 lte: res.createdAt,
    //             },
    //             id: { // 排除
    //                 not: res.id,
    //             },
    //             type: res.type, // 类型相同
    //         },
    //         orderBy: {
    //             createdAt: 'desc', // 倒序排序
    //         },
    //     }),
    //     event.context.prisma.product.findMany({ // gte 大于等于，使用正序
    //         where: {
    //             createdAt: {
    //                 gt: res.createdAt,
    //             },
    //             id: {
    //                 not: res.id,
    //             },
    //             type: res.type,
    //         },
    //         orderBy: {
    //             createdAt: 'asc', // 升序排序
    //         },
    //     }),
    //     event.context.prisma.product.update({
    //         where: {
    //             id: res.id,
    //         },
    //         data: {
    //             read: (res.read || 0) + 1,
    //         },
    //     }),
    // ])

    return {
        data: res,
        // prevNews: res1[0],
        // nextNews: res2[0],
    }
}

/**
 * 获取首页信息
 */
export const getIndexData = async (event: H3Event) => {
    // 获取参数
    // const param = await getEventParams<{ id: number }>(event)

    // if (!param?.id) return null
    // 推荐商品\商品分类、商品\新闻和风采
    const [res1, res2] = await Promise.all([
        event.context.prisma.product.findMany({
            skip: 0,
            take: 20,
            where: {
                isHide: false,
                isHot: true,
                // type: Number(param.type),
            },
            include: {
                links: true,
                classify: {
                    // select: {
                    //     title: true,
                    //     title_en: true,
                    // },
                    include: {
                        parent: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc', // 升序排序
            },
        }),
        event.context.prisma.news.findMany({
            skip: 0,
            take: 6,
            where: {
                // type: {
                //     in: [1, 3],
                // },
                isHide: false,
                isHot: true,
                // type: Number(param.type),
            },
            orderBy: {
                createdAt: 'desc', // 升序排序
            },
        }),
    ])
    // console.log(res1)
    const list = res1.map((item) => {
        const node = item.links.find(item => item.type === 1)
        item.img = node?.img || ''
        return item
    })

    return {
        productList: list,
        newsList: res2,
    }
}
