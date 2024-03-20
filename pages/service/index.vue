<template>
    <section>
        <!-- 分类 -->
        <CiSubMenu />

        <!-- 下载列表 -->
        <div class="width_box download_module">
            <!-- 分类 -->
            <div class="filter_module">
                <a v-for="(item, key) in typeList" :key="key" class="cursor-pointer"
                    :class="{ filter_active: type === Number(key) }" @click="setFileType(key)">{{ item }}</a>
            </div>

            <!-- 列表 -->
            <ul class="download_ul min-h-300px">
                <ClientOnly>
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
                                <img class="co-filter-color" src="assets/image/icon_download.png" alt="">
                            </a>
                        </div>
                    </li>
                </ClientOnly>
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
const { $lang } = useNuxtApp()

definePageMeta({
    layout: 'home',
})

const typeList = ref({
    2: $lang('文档', 'Docs'),
    3: $lang('视频', 'Video'),
    4: $lang('软件', 'Software'),
})
const type = ref(2)

// const { activeMenu, menuList } = useMenuState()
const pageSize = ref(8)
const page = useRouteQuery('page', 1) // 当前页
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
            type: Number(type.value) || null,
        },
    })

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

const setFileType = (key: string | number) => {
    type.value = Number(key)
    initData()
}

const onHandleCurrentChange = () => {
    // linkGoodsList({ query: { page: pg.value }, relate: true })
    // refresh()
    initData()
}
</script>

<style>
@import url('@/assets/css/download.css');
</style>

<style lang="scss" scoped>
.goods-page {
    --el-pagination-border-radius: 50%;
    --el-pagination-button-width: 38px;
    --el-pagination-button-height: 38px;
}
</style>
