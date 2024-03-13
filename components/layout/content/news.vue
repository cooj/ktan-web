<template>
    <section>
        <!-- 分类 -->
        <CiSubMenu />
        <ul class="width_box news_module">
            <ClientOnly>
                <li v-for="item in defData.listData" :key="item.id" class="news_list">
                    <NuxtLinkLocale :to="`/news/${item.id}`" class="news_link">
                        <figure class="news_img">
                            <CoImage class="w100% pb45% block!" :src="item.img" />
                            <!-- <img src="static/picture/春节祝福新春快乐公众号首图.jpg"> -->
                        </figure>
                        <div class="news_box">
                            <p class="news_date">
                                {{ formatTime(new Date(item!.createdAt), 'YYYY-mm-dd') }}
                            </p>
                            <h1 class="news_title">
                                {{ $lang(item.title, item.title_en) }}
                            </h1>
                            <figure class="news_icon news_icon0">
                                <img src="assets/image/icon_news.png" alt="">
                            </figure>
                            <figure class="news_icon news_icon1">
                                <img src="assets/image/icon_news1.png" alt="">
                            </figure>
                            <p class="news_text">
                                {{ $lang(item.describe, item.describe_en) }}
                            </p>
                        </div>
                    </NuxtLinkLocale>
                </li>
            </ClientOnly>
        </ul>
        <div class="py50px">
            <CiPagination v-model:page="page" v-model:page-size="pageSize" v-model:total="defData.pagination.total"
                @change="onHandleCurrentChange" />
        </div>
    </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
    type: 1 | 2 // 类型 1:公司新闻 2:行业新闻
}>()

// const route = useRoute()
const { $lang } = useNuxtApp()

const pageSize = ref(8)
const page = useRouteQuery('page', 1) // 当前页

const defData = reactive({

    pagination: {
        total: 0,
        page: 1,
        page_size: props.type === 1 ? 10 : 12,
        page_sizes: [10],
    },
    listData: [] as INewsResponse[],
})

// 初始化数据
const initTableData = async () => {
    const { data, error } = await useCustomFetch<{ code: number, data: INewsResponseList, msg: string }>('/api/page/news', {
        method: 'post',
        body: {
            type: props.type,
            isPage: 1,
            page: defData.pagination.page,
            pageSize: defData.pagination.page_size,
        },
    })

    if (error.value) return ElMessage.error('网络错误')

    defData.listData = data.value?.data.list || []
    defData.pagination.total = data.value?.data.total || 0
    // await wait(500)
    if (data.value?.code === 200) {
        // defData.listData = data.value.data.list
        // defData.pagination.total = data.value.data.total
    } else {
        ElMessage.error(data.value?.msg)
    }
}

// 分页点击
const onHandleCurrentChange = (val: number) => {
    initTableData()
}

initTableData()
</script>

<style>
@import url('assets/css/news.css');
</style>

<style lang="scss" scoped></style>
