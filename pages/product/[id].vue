<template>
    <section>
        <CiClassify v-if="product?.classify?.type" :id="product?.classify?.id" :type="product?.classify?.type || 1" />
        <!-- 商品详情 -->
        <div class="width_box">
            <div class="flex py45px <lg:flex-wrap">
                <div class="goods_swiper">
                    <!-- <ClientOnly> -->
                    <Swiper :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="gallery-top">
                        <SwiperSlide v-for="item in photoList" :key="item.id">
                            <CoImage class="w100% pb100% block!" :src="item.img" />
                            <!-- <img src="https://swiperjs.com/demos/images/nature-1.jpg"> -->
                        </SwiperSlide>
                    </Swiper>
                    <div class="gallery-base">
                        <div class="swiper-button-prev goods_btn" />
                        <Swiper :space-between="10" :slides-per-view="4" :free-mode="true" :watch-slides-progress="true"
                            :modules="modules" :navigation="navigation" class="gallery-thumbs"
                            @swiper="setThumbsSwiper">
                            <SwiperSlide v-for="item in photoList" :key="item.id">
                                <CoImage class="w100% pb100% block!" :src="item.img" />
                                <!-- <img src="https://swiperjs.com/demos/images/nature-1.jpg"> -->
                            </SwiperSlide>
                        </Swiper>
                        <div class="swiper-button-next goods_btn" />
                    </div>
                    <!-- </ClientOnly> -->
                </div>
                <article class="goods_content">
                    <h1 class="goods_name">
                        {{ $lang(product?.title, product?.title_en) }}
                        <CiClassifyName :item="product?.classify" />
                    </h1>
                    <div class="pt10px" v-html="$lang(product?.describe, product?.describe_en)" />
                </article>
            </div>
        </div>

        <!-- 产品简介 -->
        <article class="width_box info_module">
            <div class="info_top info_active">
                <a v-for="item in contentData" :key="item.key" :class="{ a_active: active === item.key }"
                    @click="setActiveValue(item.key)">
                    <p>{{ item.title }}</p>
                </a>
                <div class="info_cols">
                    <span class="sp1" />
                    <span class="sp2" />
                    <span class="sp3" />
                </div>
                <!-- <figure><img class="co-filter-color" src="assets/image/icon_rectangle.png" alt=""></figure> -->
            </div>
            <ul class="info_base">
                <li v-for="item in contentData" :key="item.key" :class="{ info_show: active === item.key }">
                    <ul v-if="item.key === 4" class="download_ul">
                        <li v-for="opt in downloadList" :key="opt.id" class="download_li">
                            <h1 class="download_name">
                                {{ $lang(opt.title, opt.title_en) }}
                            </h1>
                            <CoImage class="download_img w100% pb100%" :src="opt.img || photoList?.[0]?.img" />
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
                    </ul>
                    <div v-else class="info_content" v-html="item.content" />
                </li>
            </ul>
        </article>
    </section>
</template>

<script lang="ts" setup>
import type { ThumbsOptions } from 'swiper/types'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

definePageMeta({
    layout: 'home',
})

const { $lang } = useNuxtApp()
const active = ref(1)
const setActiveValue = (val: number) => {
    active.value = val
}

const navigation = {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
}
const modules = ref([FreeMode, Navigation, Thumbs])
const thumbsSwiper = ref<ThumbsOptions['swiper']>()

const setThumbsSwiper = (swiper: ThumbsOptions['swiper']) => {
    thumbsSwiper.value = swiper
}

const systemState = await useSystemState().getSystemInfo()

const id = useRouteParam('id')
const { data } = await useCustomFetch<Record<'nextNews' | 'prevNews' | 'data', IGoodsGetListItem>>('/api/page/product/detail', {
    params: {
        id: id.value,
        // type: props.type,
    },
})
if (!data.value) {
    showErrorPage()
}

const product = data.value?.data
// const photoList = []
const photoList = computed(() => product?.links?.filter(item => item.type === 1) || [])
const downloadList = computed(() => product?.links?.filter(item => item.type === 2) || [])

const contentData = computed(() => {
    return [
        {
            key: 1,
            title: $lang('技术参数', 'Technical Parameter'),
            content: $lang(product?.content, product?.content_en),
        },
        {
            key: 2,
            title: $lang('型号对比', 'Model comparison'),
            content: $lang(product?.contrast, product?.contrast_en),
        },
        {
            key: 3,
            title: $lang('包装附件', 'Packaging accessories'),
            content: $lang(product?.annex, product?.annex_en),
        },
        {
            key: 4,
            title: $lang('下载', 'File Download'),
            content: '',
        },
    ]
})
useHead({
    title: `${systemState.value?.title} - ${product?.title}`,
    // meta: [
    //     {
    //         name: 'description',
    //         content: $lang(product?.describe, product?.describe_en),
    //     },
    //     // {
    //     //     name: 'keywords',
    //     //     content: $lang(product?.keywords, product?.keywords_en),
    //     // }
    // ],
})
</script>

<style>
@import url('@/assets/css/download.css');
</style>

<style lang="scss" scoped>
@import url('@/assets/css/goods-detail.css');

.info_base>li {
    :deep(.info_content) {
        * {
            max-width: 100% !important;
        }
    }

    // width: 100% !important;
}
</style>
