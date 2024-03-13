<template>
    <section>
        <!-- 分类 -->
        <CiSubMenu />

        <!-- 下载列表 -->
        <div class="width_box download_module">
            <!-- 分类 -->
            <div class="filter_module">
                <a href="javascript:setType('2')" class="filter_active">文档</a>
                <a href="javascript:setType('3')" class="">视频</a>
                <a href="javascript:setType('4')" class="">软件</a>
            </div>

            <!-- 列表 -->
            <ul class="download_ul">
                <li v-for="opt in productData.list" :key="opt.id" class="download_li">
                    <h1 class="download_name">
                        {{ $lang(opt.title, opt.title_en) }}
                    </h1>
                    <CoImage class="download_img w100% pb100%" :src="opt.img" />
                    <p class="download_info">
                        {{ $lang(opt.content, opt.content_en) }}
                    </p>
                    <div class="download_base">
                        <p class="download_date">
                            {{ formatTime(new Date(opt!.createdAt)) }}
                        </p>
                        <a target="" :href="opt.href" class="download_icon" download="">
                            <img src="assets/image/icon_download.png" alt="">
                        </a>
                    </div>
                </li>
            </ul>

            <!-- 分页 -->
            <div class="py50px">
                <CiPagination v-model:page="page" v-model:page-size="pageSize" v-model:total="productData.total"
                    @change="onHandleCurrentChange" />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'

definePageMeta({
    layout: 'home',
})

const { activeMenu, menuList } = useMenuState()
const pageSize = ref(8)
const page = useRouteQuery('page', 1) // 当前页
const cid = useRouteQuery('cid', 2) // 当前页
const pg = ref(Number(page.value))

const productData = reactive({
    list: [] as ILinkItem[],
    total: 0,
})

const initData = async () => {
    const { data, error, refresh, execute } = await useCustomFetch<{ code: number, data: { list: ILinkItem[], total: number } }>(`/api/page/files`, {
        method: 'GET',
        params: {
            isPage: 1,
            page: pg.value,
            pageSize: pageSize.value,
            type: Number(cid.value) || null,
        },
    })
    console.log('data :>> ', data)

    if (error.value) return ElMessage.error('网络错误')

    const list = data.value?.data.list || []
    // list.forEach((item) => {
    //     const node = item.links.find(opt => opt.type === 1)
    //     item.img = node?.img || ''
    // })
    productData.list = list
    productData.total = data.value?.data.total || 0
}

initData()

const onHandleCurrentChange = () => {
    // linkGoodsList()
    linkGoodsList({ query: { page: pg.value }, relate: true })
    // console.log('pg.value :>> ', pg.value)
    // console.log('page.value', page.value)
    // refresh()
    initData()
}

/**
 * 商品页面参数
 */
declare interface GoodsListParams {
    query: GoodsListParamsQuery // 参数
    relate?: boolean // 是否携带浏览器地址上的参数
    url?: boolean // 返回地址的形式
}

declare interface GoodsListParamsQuery {
    page?: string | number // 关键字
    cid?: string | number // 商品分类id   类别
    // bid?: string | number // 商品品牌id
}

/**
 * 进入商品页面方法
 */
const linkGoodsList = async (params: GoodsListParams) => {
    const url = '/product'
    const route = useRoute()
    const query = route.query as GoodsListParamsQuery

    const data = params.query
    if (params.relate) { // 获取
        // console.log('Number.isNaN(Number(query.cid)) :>> ', Number.isNaN(Number(query.cid)))
        // keyword不存在params对象里面时,并且路由里面存在keyword字段时
        if (!('keyword' in params.query) && 'keyword' in query) data.page = query.page

        // c不存在params对象里面时,并且路由里面存在数字类型cid时
        if (!('cid' in params.query) && !Number.isNaN(Number(query.cid))) {
            data.cid = Number(query.cid)
        }

        // c不存在params对象里面时,并且路由里面存在数字类型cid时
        // if (!('bid' in params.query) && 'bid' in query) data.bid = query.bid
    }

    // 返回地址的形式, /goods/list?cid=1
    if (params.url) {
        const list = Object.keys(data).map(i => `${i}=${encodeURIComponent(data[i as keyof GoodsListParamsQuery] || '')}`)
        return list.length > 0 ? `${url}?${list.join('&')}` : url
    } else {
        console.log('page:', page.value, 'pg:', pg.value)
        await navigateTo({
            path: url,
            query: data as any,
            // replace: true,
        })
        initData()
        return ''
    }

    // return navigateTo({
    //   path: '/goods/list',
    //   query: {
    //     page: 1,
    //     sort: 'asc',
    //   },
    // })
}
</script>

<style>
@import url('@/assets/css/goods-detail.css');
</style>

<style lang="scss" scoped>
.goods-page {
    --el-pagination-border-radius: 50%;
    --el-pagination-button-width: 38px;
    --el-pagination-button-height: 38px;
}
</style>
