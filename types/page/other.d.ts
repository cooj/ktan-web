/**
 * 商品页面参数
 */
declare interface GoodsListParams<T = Record<string, any>> {
    query: T // 参数
    relate?: boolean // 是否携带浏览器地址上的参数
    url?: boolean // 返回地址的形式
}

declare interface GoodsListParamsQuery {
    page?: string | number // 关键字
    cid?: string | number // 商品分类id   类别
    // bid?: string | number // 商品品牌id
}
