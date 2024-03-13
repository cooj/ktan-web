import { load } from 'cheerio'
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
        const data = `<ul class="width_box zp_ul">
        <li class="zp_list">
<div class="zp_top zp_active">
    <p>电子工程师 （研发）</p>
    <p>招聘人数：多名</p>
    <p>工作地点：广州白云</p>
    <figure class="zp_icon"><img src="/public/upload/recruit/2023/10-09/集体1-2.jpg"></figure>
</div>
<div class="zp_base" style="display: block;">
    <div class="zp_box">
        <ul>
            <li>岗位职责：</li>
            <li>1、负责产品电子系统总成项目的技术支持与协调，并参与项目管理以及产品开发设计；<br>2、现场支持系统总装和评估，负责解决系统级工程问题；<br>3、配合项目管理组，完成新产品开发工作流程；</li>
        </ul>
        <ul>
            <li>职位要求：</li>
            <li>1、精通数字、模拟、高频电路。<br>2、具有扎实的硬件电路设计经验。<br>3、精通电路原理图、PCB 设计。<br>4、精通大规模集成电路硬件焊接、拆卸、维修、测试。<br>5、三年及以上工作经验。<br>6、本科及以上学历，40 岁以下。、<br>7、面试必备：个人简历、学历证书、身份证（原件+复印件）。<br>8、待遇：面议</li>
        </ul>
    </div>
</div>
</li>
        <li class="zp_list">
<div class="zp_top">
    <p>单片机工程师（研发）</p>
    <p>招聘人数：多名</p>
    <p>工作地点：广州白云</p>
    <figure class="zp_icon"><img src="/public/upload/recruit/2023/10-09/集体1-2.jpg"></figure>
</div>
<div class="zp_base" style="display: none;">
    <div class="zp_box">
        <ul>
            <li>岗位职责：</li>
            <li></li>
        </ul>
        <ul>
            <li>职位要求：</li>
            <li>1、精通单片机软件设计。<br>2、有 MCU 的应用经验，具有良好的编程习惯。 <br>3、精通 USB/RS232/485/WIFI/蓝牙/433MHz/4G 等各种通讯。<br>4、熟悉数字、模拟、高频电路。<br>5、熟悉电路原理图、PCB 设计。<br>6、两年及以上嵌入式系统软件设计开发经验。 <br>7、DSP 开发应用优先。 <br>8、本科及以上学历，36 岁以下。<br>9、面试必备：个人简历、学历证书、身份证（原件+复印件）。<br>10、待遇：面议</li>
        </ul>
    </div>
</div>
</li>
        <li class="zp_list">
<div class="zp_top">
    <p>项目工程师（研发）</p>
    <p>招聘人数：多名</p>
    <p>工作地点：广州市白云区</p>
    <figure class="zp_icon"><img src="/public/upload/recruit/2023/10-09/集体1-2.jpg"></figure>
</div>
<div class="zp_base" style="display: none;">
    <div class="zp_box">
        <ul>
            <li>岗位职责：</li>
            <li></li>
        </ul>
        <ul>
            <li>职位要求：</li>
            <li>1、精通单片机软件设计。<br>2、精通嵌入式系统软件设计。 <br>3、精通数字、模拟、高频电路。<br>4、精通电路原理图、PCB 设计。<br>5、精通软硬件联调。 <br>6、精通大规模集成电路的焊接、拆卸。<br>7、三年及以上项目研发经验。 <br>8、具有独立的项目研发能力、领导能力。 <br>9、本科及以上学历，40 岁以下。<br>10、 面试必备：个人简历、学历证书、身份证（原件+复印件）。<br>11、 待遇：面议</li>
        </ul>
    </div>
</div>
</li>
        <li class="zp_list">
<div class="zp_top">
    <p>区域业务经理</p>
    <p>招聘人数：多名</p>
    <p>工作地点：不限</p>
    <figure class="zp_icon"><img src="/public/upload/recruit/2023/10-09/集体1-2.jpg"></figure>
</div>
<div class="zp_base" style="display: none;">
    <div class="zp_box">
        <ul>
            <li>岗位职责：</li>
            <li>区域内销售业务<br></li>
        </ul>
        <ul>
            <li>职位要求：</li>
            <li>1、为人谦逊、勤学好问、服从安排。<br>2、一年以上销售工作经验。<br>3、具备良好的沟通能力、团队能力、身体能力。<br>4、能驻外、能常出差。<br>5、电子、电气、通讯等相关专业优先。<br>6、大专及以上学历，36 岁以下。 <br>7、面试必备：个人简历、学历证书、身份证（原件+复印件）。<br>8、待遇：面议</li>
        </ul>
    </div>
</div>
</li>
        <li class="zp_list">
<div class="zp_top">
    <p>外贸业务经理</p>
    <p>招聘人数：多名</p>
    <p>工作地点：广州</p>
    <figure class="zp_icon"><img src="/public/upload/recruit/2023/10-09/集体1-2.jpg"></figure>
</div>
<div class="zp_base" style="display: none;">
    <div class="zp_box">
        <ul>
            <li>岗位职责：</li>
            <li>负责公司外贸业务</li>
        </ul>
        <ul>
            <li>职位要求：</li>
            <li>1、为人谦逊、勤学好问、服从安排。<br>2、一年以上销售工作经验。<br>3、流利的英语口语能力，沟通能力、团队能力、身体能力。<br>4、商务英语、电子商务、电子、电气、通讯等相关专业优先。<br>5、大专及以上学历，36 岁以下。 <br>6、面试必备：个人简历、学历证书、身份证（原件+复印件）。<br>7、待遇：面议</li>
        </ul>
    </div>
</div>
</li>
        <li class="zp_list">
<div class="zp_top">
    <p>普工</p>
    <p>招聘人数：10</p>
    <p>工作地点：广州白云区</p>
    <figure class="zp_icon"><img src="/public/upload/recruit/2023/10-09/集体1-2.jpg"></figure>
</div>
<div class="zp_base" style="display: none;">
    <div class="zp_box">
        <ul>
            <li>岗位职责：</li>
            <li>线路板元器件焊接、仪表组装等</li>
        </ul>
        <ul>
            <li>职位要求：</li>
            <li>年龄18-35岁，高中或高中以上文凭，能长期稳定工作；男女不限，熟手优先</li>
        </ul>
    </div>
</div>
</li>
</ul>`

        const $ = load(data)
        const list: Prisma.RecruitCreateManyInput[] = []
        $('.zp_ul>li').each(function () {
            let tle = ''
            let people = ''
            let address = ''
            let desc = ''
            let content = ''
            $(this).find('.zp_top>p').each(function (i) {
                const text = $(this).text()
                if (i === 0) {
                    tle = text
                } else if (i === 1) {
                    people = text.split('：')?.[1] || ''
                } else if (i === 2) {
                    address = text.split('：')?.[1] || ''
                }
            })
            $(this).find('.zp_box>ul').each(function (i) {
                const text = $(this).html()
                if (i === 0) {
                    desc = text || ''
                } else if (i === 1) {
                    content = text || ''
                }
            })
            const dat: Prisma.RecruitCreateManyInput = {
                title: tle,
                title_en: '',
                people,
                address,
                content,
                describe: desc,
            }
            list.push(dat)
        })
        // await event.context.prisma.recruit.createMany({
        //     data: list,
        //     skipDuplicates: true, // 跳过重复项
        // })

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
