<template>
    <section>
        <CiClassify />
        <div class="width_box">
            <!-- 产品列表 -->
            <ul class="goods_module goods-grid pt50px <md:pt35px">
                <ClientOnly>
                    <li v-for="item in productData.list" :key="item.id" class="goods_list">
                        <NuxtLinkLocale :to="`/product/${item.id}`" class="goods_link">
                            <CoImage class="goods_img w100% pb100% block!" :src="item.img" />
                            <!-- <figure class="goods_img">
                        <img src="http://www.eaglotest.com.cn/public/upload/product/2022/03-10/S390A.jpg">
                    </figure> -->
                            <p class="goods-tle line-clamp-1 text-center">
                                {{ $lang(item.title, item.title_en) }}
                            </p>
                        </NuxtLinkLocale>
                    </li>
                </ClientOnly>
            </ul>
            <div class="py50px md:pt30px">
                <CiPagination v-model:page="page" v-model:page-size="pageSize" v-model:total="productData.total"
                    @change="onHandleCurrentChange" />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'home',
})

// const route = useRoute()
// const query:GoodsListParamsQuery = route.query

const pageSize = ref(8)
const pg = useRouteQuery('page', 1)
const cid = useRouteQuery('cid', '')
const page = ref(Number(pg.value) || 1)

// const cid = computed({
//     get: () => query.cid || '',
//     set: () => { },
// })

const productData = reactive({
    list: [] as IGoodsGetListItem[],
    total: 0,
})

const initData = async () => {
    console.log('page.value :>> ', page.value)
    // console.log('cid.value :>> ', cid.value)
    const route = useRoute()
    const query = route.query as GoodsListParamsQuery
    // const cid=query.cid
    const { data, error, refresh, execute } = await useCustomFetch<{ code: number, data: { list: IGoodsGetListItem[], total: number } }>(`/api/page/product`, {
        method: 'GET',
        params: {
            isPage: 1,
            page: Number(query.page) || 1,
            pageSize: pageSize.value,
            type: Number(query.cid) || null,
        },
    })
    console.log('data :>> ', data)

    if (error.value) return ElMessage.error('网络错误')

    const list = data.value?.data.list || []
    list.forEach((item) => {
        const node = item.links.find(opt => opt.type === 1)
        item.img = node?.img || ''
    })
    productData.list = list
    productData.total = data.value?.data.total || 0
}

initData()

const onHandleCurrentChange = () => {
    linkGoodsList({ query: { page: page.value }, relate: true })
}

// onBeforeRouteUpdate(() => {
//     initData()
// })

// watch(() => route.query, () => {
//     console.log('111111 :>> ', 111111)
//     initData()
// })
watch(() => [pg.value, cid.value], () => {
    page.value = Number(pg.value) || 1
    // if (!pg.value && !cid.value && !bid.value) return
    initData()
})
</script>

<style>
@import url('@/assets/css/goods.css');
</style>

<style lang="scss" scoped></style>
