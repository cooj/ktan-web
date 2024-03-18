import type { Prisma } from '@prisma/client'

// 不存在域名时拼接域名
function addDomainToLink(link: string, defaultDomain: string) {
    const url = new URL(link, defaultDomain)
    // console.log('url :>> ', url)
    if (url.hostname) {
        return url.href
        // return link // Link already contains a domain
    } else {
        url.hostname = defaultDomain
        return url.href
    }
}

export default defineEventHandler(async (event) => {
    // `prisma` is typed and will help you to interact with the database. In addition all parameters you put into your database will be validated at runtime to ensure maximum safety.
    // const prisma = usePrisma(event)
    // console.log(prisma)
    // const res = await event.context.prisma.user.create({
    //   data: {
    //     name: `张三${Date.now()}`,
    //   },
    // })
    // console.log(event)
    // return { code: 200, data: JSON.stringify(event) }
    try {
        // const data: string = await $fetch('http://www.eaglotest.com.cn/')
        // // console.log(data)
        // const $ = load(data)

        const classList: Prisma.ClassifyCreateManyInput[] = []

        // 获取商品一级分类
        // const text = $('.flex.nav_module>nav>.flex>.nav_list:nth-child(3)>.nav_btn').text()
        // console.log(text)
        // $('.flex.nav_module>nav>.flex>.nav_list:nth-child(3) .nav_ul .nav_li .nav_title').each(function (item) {
        //     console.log($(this).html())
        //     const dat: Prisma.ClassifyCreateManyInput = {
        //         title: $(this).text(),
        //         sort: item,
        //         status: 1,
        //     }
        //     classList.push(dat)
        // })
        // console.log(classList)

        //////////////////////////////////////////////////////
        // 二级分类
        // const nodeList: { one: string, two: string }[] = []
        // const text = $('.flex.nav_module>nav>.flex>.nav_list:nth-child(3)>.nav_btn').text()
        // console.log(text)
        // $('.flex.nav_module>nav>.flex>.nav_list:nth-child(3) .nav_ul .nav_li .nav_title').each(function (item) {
        //     console.log($(this).html())
        //     const one = $(this).text()
        //     $(this).next('.nav_sublevel').find('a').each(function (item) {
        //         // console.log($(this).html())

        //         nodeList.push({
        //             one,
        //             two: $(this).text(),
        //         })
        //     })
        //     // const dat: Prisma.ClassifyCreateManyInput = {
        //     //     title: $(this).text(),
        //     //     sort: item,
        //     //     status: 1,
        //     // }
        //     // classList.push(dat)
        // })

        // for (const item of nodeList) {
        //     const node = await event.context.prisma.classify.findFirst({
        //         where: {
        //             title: item.one,
        //         },
        //     })
        //     const dat: Prisma.ClassifyCreateManyInput = {
        //         title: item.two,
        //         sort: 0,
        //         status: 1,
        //     }
        //     console.log('node :>> ', node)
        //     if (node) {
        //         dat.p_id = node.id
        //     }
        //     classList.push(dat)
        // }

        // console.log(classList)

        //////////////////////////////////////////////////////
        // 获取商品

        // // 获取商品id
        // const ids: string[] = []
        // const pageList = Array.from({ length: 9 }).map((item, index) => index + 1) // 共9页

        // for (const item of pageList) {
        //     // console.log(item)
        //     const data: string = await $fetch(`http://www.eaglotest.com.cn/home/Product/center?page=${item}`)
        //     // console.log(data)
        //     const $ = load(data)
        //     $('ul.goods_module>.goods_list>a').each(function (item) {
        //         const href = $(this).attr('href') || ''
        //         const id = href.split('?')[0].split('/').pop()
        //         console.log(id)
        //         if (id) ids.push(id)
        //     })
        // }
        // await useStorage('db').setItem('ids', ids)

        // const data: string = await $fetch('http://www.eaglotest.com.cn/home/Product/detail/id/75?lang=zh-Hans')
        // // console.log(data)
        // const $ = load(data)

        // const titleHtml = $('.goods_content .goods_name').html() || ''
        // // const title=titleHtml.
        // console.log(titleHtml)

        // // 1. 获取 <span> 之前的字符串
        // const regex1 = /^(.*?)<span>/
        // const match1 = titleHtml.match(regex1)
        // const title = match1 ? match1[1] : ''

        // // 2. 获取 <span> 和 【 之间的字符
        // const regex2 = /<span>(.*?)【/
        // const match2 = titleHtml.match(regex2)
        // const className = match2 ? match2[1] : ''

        // // 3. 获取 【】 中间的字符
        // const regex3 = /【(.*?)】/
        // const match3 = titleHtml.match(regex3)
        // const brand = match3 ? match3[1] : ''

        // console.log(title)
        // console.log(className)
        // console.log(brand)

        // const goods_desc = $('.goods_content .goods_list>li').html()

        // 商品图片
        // const photo: string[] = []
        // $('.gallery-thumbs .swiper-slide img').each(function (item) {
        //     console.log($(this).attr('src'))
        //     const src = $(this).attr('src')
        //     if (src) photo.push(addDomainToLink(src, 'http://www.eaglotest.com.cn'))
        // })
        // console.log('photo :>> ', photo)

        // 参数、对比、附件、下载

        // let goods_param = ''
        // let goods_contrast = ''
        // let goods_annex = ''
        // let goods_download = ''

        // $('.info_base>li').each(function (i) {
        //     console.log($(this).html())
        //     const content = $(this).html() || ''
        //     if (i === 0) {
        //         goods_param = content
        //     } else if (i === 1) {
        //         goods_contrast = content
        //     } else if (i === 2) {
        //         goods_annex = content
        //     }
        //     if (i === 3) {
        //         goods_download = content
        //     }
        // })

        // const ids = await useStorage('db').getItem<string[]>('ids') || []
        // console.log(ids)

        // const product: any = []

        // for (const id of ids) {
        //     const data: string = await $fetch(`http://www.eaglotest.com.cn/home/Product/detail/id/${id}?lang=zh-Hans`)
        //     // console.log(data)
        //     const $ = load(data)

        //     const titleHtml = $('.goods_content .goods_name').html() || ''
        //     // const title=titleHtml.
        //     console.log(titleHtml)

        //     // 1. 获取 <span> 之前的字符串
        //     const regex1 = /^(.*?)<span>/
        //     const match1 = titleHtml.match(regex1)
        //     const title = match1 ? match1[1] : ''

        //     // 2. 获取 <span> 和 【 之间的字符
        //     const regex2 = /<span>(.*?)【/
        //     const match2 = titleHtml.match(regex2)
        //     const className = match2 ? match2[1] : ''

        //     // 3. 获取 【】 中间的字符
        //     const regex3 = /【(.*?)】/
        //     const match3 = titleHtml.match(regex3)
        //     const brand = match3 ? match3[1] : ''

        //     console.log(title, className, brand)
        //     // console.log(className)
        //     // console.log(brand)

        //     const goods_desc = $('.goods_content .goods_list>li').html()

        //     // 商品图片
        //     const goods_link: Prisma.LinkCreateInput[] = []
        //     $('.gallery-thumbs .swiper-slide img').each(function (item) {
        //         // console.log($(this).attr('src'))
        //         const src = $(this).attr('src')
        //         if (src) {
        //             const dat: Prisma.LinkCreateInput = {
        //                 img: addDomainToLink(src, 'http://www.eaglotest.com.cn'),
        //                 type: 1,
        //             }
        //             goods_link.push(dat)
        //         }
        //     })
        //     console.log('photo :>> ', goods_link)

        //     let goods_param = ''
        //     let goods_contrast = ''
        //     let goods_annex = ''
        //     // const goods_download: Prisma.LinkCreateInput[] = []

        //     $('.info_base>li').each(function (i) {
        //         // console.log($(this).html())
        //         const content = $(this).html() || ''
        //         if (i === 0) {
        //             goods_param = content
        //         } else if (i === 1) {
        //             goods_contrast = content
        //         } else if (i === 2) {
        //             goods_annex = content
        //         }
        //         if (i === 3) {
        //             // goods_download = content

        //             // const down = $(this).find('.download_ul').html()
        //             // console.log(down)

        //             $(this).find('.download_ul>.download_li').each(function (i) {
        //                 const href = $(this).find('.download_base a').attr('href') || ''
        //                 const o: Prisma.LinkCreateInput = {
        //                     title: $(this).find('.download_name').text() || '',
        //                     href: addDomainToLink(href, 'http://www.eaglotest.com.cn'),
        //                     content: $(this).find('.download_info').text() || '',
        //                     type: 2,
        //                 }

        //                 goods_link.push(o)
        //             })

        //             // throw new Error('stop...')
        //             // break
        //         }
        //     })

        //     const node = await event.context.prisma.classify.findFirst({
        //         where: {
        //             title: className,
        //         },
        //     })
        //     const obj = {
        //         title,
        //         classifyId: node?.id || 0,
        //         sub_title: brand,
        //         describe: goods_desc || '',
        //         content: goods_param || '',
        //         contrast: goods_contrast || '',
        //         annex: goods_annex || '',
        //         // goods_download,
        //         links: {
        //             create: goods_link,
        //         },
        //     }
        //     await event.context.prisma.product.create({
        //         data: {
        //             title,
        //             classifyId: node?.id || 0,
        //             sub_title: brand,
        //             describe: goods_desc || '',
        //             content: goods_param || '',
        //             contrast: goods_contrast || '',
        //             annex: goods_annex || '',
        //             // goods_download,
        //             links: {
        //                 create: goods_link,
        //             },
        //         },
        //     })

        //     product.push(obj)
        // }

        // await useStorage('db').setItem('product', product)
        // await event.context.prisma.classify.createMany({
        //     data: classList,
        //     skipDuplicates: true, // 跳过重复项
        // })
        // console.log(list)
    } catch (err) {

    }

    return 1

    // const res = await event.context.prisma.user.findMany()
    // console.log(res)
    // return { code: 200, data: res }
    // return prisma.example.findMany()

    // 查询用户姓"张"，1页显示20条
    const page = 1
    const pageSize = 20
    const keyword = '张'
    const firstQueryResults = await event.context.prisma.user.findMany({
        skip: pageSize * (page - 1) || 0,
        take: pageSize,
        where: {
            username: {
                contains: keyword, // 包含
            },
        },
        orderBy: {
            id: 'asc', // 按id正序排序
        },
        select: { // 只返回指定的字段
            username: true,
            account: true,
        },
    })
})
