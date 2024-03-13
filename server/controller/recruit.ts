import type { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { ResponseMessage } from '~/config/message'

// news
type FindListQueryParam = {
    type: number
    title: string
} & ListPage

/**
 * 列表查询
 * @param event
 * @returns
 */
export const getList = async (event: H3Event) => {
    const url = getRequestURL(event)
    // /api/page**的接口，跳过登录校验
    if (!url.pathname.includes('/api/page')) {
        // 接口校验(是否登录)
        if (!event.context.user) return ResponseMessage.token
    }

    // 获取参数
    const param = await getEventParams<FindListQueryParam>(event)

    // if (!param?.type) return { msg: '请传递类型' }
    const where: any = {
        // classifyId,
        title: {
            contains: param?.title, // 包含
        },
    }

    // if (param?.type) where.classifyId = Number(param?.type)

    // 查询菜单姓"张"，1页显示20条
    let page: number | undefined
    let pageSize: number | undefined
    let pageSkip: number | undefined

    if (param?.isPage) {
        page = Number(param.page) || 1
        pageSize = Number(param.pageSize) || 20
        pageSkip = pageSize * (page - 1) || 0
    }
    // console.log('where :>> ', where)
    const [res1, res2] = await Promise.all([
        event.context.prisma.recruit.findMany({
            skip: pageSkip,
            take: pageSize,
            where,
            orderBy: {
                sort: 'desc', // 按id正序排序
            },
            // include: {
            //     links: true,
            //     classify: {
            //         select: {
            //             title: true,
            //         },
            //     },
            // },
            // select: { // 只返回指定的字段
            //     username: true,
            //     account: true,
            // },
        }),
        event.context.prisma.recruit.count({
            where,
        }),
    ])

    if (res1) {
        return { code: 200, data: { list: res1, total: res2 } }
    } else {
        return { code: 400, message: '查询失败' }
    }
}

/**
 * 新增
 * @param event
 * @returns
 */
export const insert = async (event: H3Event) => {
    // 接口校验(是否登录)
    if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.RecruitCreateInput>(event)
    // console.log('param-----', param)
    if (!param?.title) return { msg: '名称不能为空' }

    const res = await event.context.prisma.recruit.create({
        data: {
            ...param,
        },
    })

    if (res) {
        return { code: 200, msg: '添加成功' }
    } else {
        return { msg: '网络错误' }
    }
}

/**
 * 修改
 * @param event
 * @returns
 */
export const update = async (event: H3Event) => {
    // 接口校验(是否登录)
    if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<Prisma.RecruitUncheckedUpdateInput>(event)
    // console.log('param-----', param)

    if (!param?.id) return { msg: '缺少参数id' }
    if (!param?.title) return { msg: '标题不能为空' }

    const res = await event.context.prisma.recruit.update({
        data: {
            ...param,
        },
        where: {
            id: param.id as number,
        },
    })

    if (res) {
        return { code: 200, msg: '修改成功' }
    } else {
        return { msg: '网络错误' }
    }
}

/**
 * 删除
 * @param event
 * @returns
 */
export const del = async (event: H3Event) => {
    // 接口校验(是否登录)
    if (!event.context.user) return ResponseMessage.token

    // 获取参数
    const param = await getEventParams<{ id: number }>(event)
    // console.log('param-----', param)

    if (!param?.id) return { msg: '缺少参数id' }

    const res = await event.context.prisma.recruit.delete({
        where: {
            id: param.id,
        },
    })

    if (res) {
        return { code: 200, msg: '删除成功' }
    } else {
        return { msg: '网络错误' }
    }
}
