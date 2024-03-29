<template>
    <section class="sec-index">
        <!-- 热门推荐 -->
        <div class="hot_module">
            <div class="reuse_module">
                <p class="reuse_title">
                    {{ $lang('热门产品', 'Hot Product') }}
                </p>
                <figure class="reuse_img">
                    <img class="co-filter-color" src="assets/image/deco.png" alt="">
                </figure>
                <!--        <span class="reuse_subhead">致力于向广大客户提供智能化电力测试仪器仪表</span> -->
            </div>
            <div class="min-h-300px">
                <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
                    :slides-per-view="1" :space-between="10" :loop="true"
                    :autoplay="{ delay: 8000, disableOnInteraction: true }" :breakpoints="breakpoints"
                    class="hot_swiper">
                    <SwiperSlide v-for="item in productList" :key="item.id" class="w100%">
                        <NuxtLinkLocale :to="`/product/${item.id}`" class="banner-link">
                            <p class="hot_name line-clamp-1">
                                {{ $lang(item?.title, item?.title_en) }}
                            </p>
                            <CiClassifyName class="hot_explain" :item="item?.classify" />
                            <CoImage class="w100% pb100% <md:ma block! <md:w95% <md:pb95%" :src="item?.img" />
                            <!-- <figure class="hot_img">
                            <img :src="item?.img" alt="">
                        </figure> -->
                        </NuxtLinkLocale>
                    </SwiperSlide>
                </Swiper>
            </div>
            <NuxtLinkLocale to="/product" class="hot_more">
                {{ $lang('查看更多', 'Read More') }} >>
            </NuxtLinkLocale>
        </div>

        <!-- 咨询 -->
        <!-- <div class="news_module" style="background-image: url(assets/image/backdrop_img.jpg)"> -->
        <div class="news_module min-h-500px">
            <div class="news_shadow" />
            <div class="news_box">
                <div class="reuse_module">
                    <p class="reuse_title">
                        {{ $lang('新闻资讯', 'News and information') }}
                        <!-- {{ $lang(newMenu?.title, newMenu?.title_en) }} -->
                    </p>
                    <figure class="reuse_img">
                        <img class="co-filter-color" src="assets/image/deco.png" alt="">
                    </figure>
                    <!--            <span class="reuse_subhead">我们依靠企业生存，企业依靠我们发展。</span> -->
                </div>

                <div v-if="newsList.length" class="min-h100px">
                    <div class="news_content flex">
                        <NuxtLinkLocale :to="`/news/${newsList?.[0]?.id}`" class="news_left">
                            <figure class="news_img">
                                <img :src="newsList?.[0]?.img" alt="">
                            </figure>
                            <div class="news_txt flex">
                                <div class="news_title">
                                    <h2 class="font-bold">
                                        {{ $lang(newsList?.[0]?.title, newsList?.[0]?.title_en) }}
                                    </h2>
                                    <p>{{ $lang(newsList?.[0]?.describe, newsList?.[0]?.describe_en) }}</p>
                                </div>
                                <div class="news_date">
                                    <strong>{{ formatTime(newsList[0]?.createdAt, 'dd') }}</strong>
                                    <span>{{ formatTime(newsList[0]?.createdAt, 'YYYY-mm') }}</span>
                                </div>
                            </div>
                        </NuxtLinkLocale>
                        <div class="news_right">
                            <NuxtLinkLocale v-for="item in newsList.slice(1)" :key="item.id" :to="`/news/${item.id}`"
                                class="news_list">
                                <div class="news_dates">
                                    <strong>{{ formatTime(item.createdAt, 'dd') }}</strong>
                                    <span>{{ formatTime(item.createdAt, 'YYYY-mm') }}</span>
                                </div>
                                <div class="news_headline">
                                    <h2 class="font-bold">
                                        {{ $lang(item.title, item.title_en) }}
                                    </h2>
                                    <p>{{ $lang(item.describe, item.describe_en) }}</p>
                                </div>
                            </NuxtLinkLocale>
                        </div>
                    </div>
                </div>
                <NuxtLinkLocale to="/news" class="hot_more">
                    {{ $lang('查看更多', 'Read More') }} >>
                </NuxtLinkLocale>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const { $lang } = useNuxtApp()

const breakpoints = ref({
    750: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    900: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 15,
    },
    1255: {
        slidesPerView: 5,
        spaceBetween: 15,
    },
})

const { data } = await useCustomFetch<IIndexResponse>('/api/page/index')

const productList = computed(() => data.value?.productList || [])
const newsList = computed(() => data.value?.newsList || [])

// const menuState = useMenuState()
// await menuState.getMenuList()
// console.log(menuState.allList.value)

// const newMenu = computed(() => {
//     return menuState.allList.value.find(item => item.href === '/news')
// })
</script>

<style lang="scss" scoped>
@import url(~/assets/css/home.css);
</style>
