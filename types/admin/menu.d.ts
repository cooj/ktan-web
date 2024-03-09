/**
 *  查询菜单  - 请求
 */
declare interface MenuFindParam extends ListPage {
    title?: string // 菜单名称
}

/**
 *  创建菜单  - 请求
 */
declare interface MenuCreateParam {

    title: string // 菜单名称
    title_en: string // 菜单名称（英文）
    href: string // 链接地址
    sort: number // 排序

}

/**
 *  修改菜单  - 请求
 */
declare interface MenuCreateParamEdit extends MenuCreateParam {
    id: number
}

/**
 *  创建banner  - 请求
 */
declare interface BannerCreateParam {

    title: string // 菜单名称
    title_en: string // 菜单名称（英文）
    href: string // 链接地址
    sort: number // 排序
    img: string // 图片地址

}

/**
 *  修改banner   - 请求
 */
declare interface BannerCreateParamEdit extends BannerCreateParam {
    id: number
}

/**
 * 产品列表 - 添加
 */
declare interface IProductCreateParam {

    title: string // 标题
    title_en?: string // 标题
    img: string // 图片地址
    // author?: string;  // 作者
    describe: string // 简介
    describe_en: string // 简介

    content: string // 内容
    content_en: string // 内容

    isHide: boolean // 是否首页显示
    sort: number // 排序

    type: number // 类型 1:新闻
    read: number // 阅读量

    sub_title: string
    sub_title_en: string
    // "author": string | null,
    describe: string
    describe_en: string
    content: string
    content_en: string
    contrast: string
    contrast_en: string
    annex: string
    annex_en: string
    // "img": string,
    // "sort": 0,
    // "isHide": boolean,
    // "type": 0,
    read: 0
    classifyId: number
    links: { title: string, href: string, content: string, type: number, img: string }[]
}

/**
 * 产品列表 - 修改
 */
declare interface IProductCreateParamEdit extends IProductCreateParam {
    id: number
}
