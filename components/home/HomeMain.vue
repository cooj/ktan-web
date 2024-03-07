<template>
    <section class="sec-index">
        <!-- 热门推荐 -->
        <div class="hot_module">
            <div class="reuse_module">
                <p class="reuse_title">
                    热门产品
                </p>
                <figure class="reuse_img">
                    <img src="assets/image/deco.png" alt="">
                </figure>
                <!--        <span class="reuse_subhead">致力于向广大客户提供智能化电力测试仪器仪表</span> -->
            </div>

            <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
                :slides-per-view="1" :space-between="10" :loop="true"
                :autoplay="{ delay: 8000, disableOnInteraction: true }" :breakpoints="breakpoints" class="hot_swiper">
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S191 智能电缆综合探测仪
                        </p>
                        <span class="hot_explain">电缆识别路径仪系列【综合管线路径仪】</span>
                        <figure class="hot_img">
                            <img src="assets/image/e17fecaf35cd6a3efb1fb1b0d3345538.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S688 大口径钳形漏电电流表
                        </p>
                        <span class="hot_explain">钳形电流功率表系列【钳形电流表】</span>
                        <figure class="hot_img">
                            <img src="assets/image/S688.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S191 智能电缆综合探测仪
                        </p>
                        <span class="hot_explain">电缆识别路径仪系列【综合管线路径仪】</span>
                        <figure class="hot_img">
                            <img src="assets/image/S688.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S-100F/S-200F/S-300F 柔性线圈电流传感器
                        </p>
                        <span class="hot_explain">电流传感器系列【柔性线圈电流传感器】</span>
                        <figure class="hot_img">
                            <img src="assets/image/N.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S191 智能电缆综合探测仪
                        </p>
                        <span class="hot_explain">电缆识别路径仪系列【综合管线路径仪】</span>
                        <figure class="hot_img">
                            <img src="assets/image/e17fecaf35cd6a3efb1fb1b0d3345538.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S688 大口径钳形漏电电流表
                        </p>
                        <span class="hot_explain">钳形电流功率表系列【钳形电流表】</span>
                        <figure class="hot_img">
                            <img src="assets/image/S688.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S191 智能电缆综合探测仪
                        </p>
                        <span class="hot_explain">电缆识别路径仪系列【综合管线路径仪】</span>
                        <figure class="hot_img">
                            <img src="assets/image/N.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="w100%">
                    <NuxtLink to="" class="banner-link">
                        <p class="hot_name">
                            S451 直流电阻测试仪
                        </p>
                        <span class="hot_explain">直阻回路等电位系列【直流电阻测试仪】</span>
                        <figure class="hot_img">
                            <img src="assets/image/e17fecaf35cd6a3efb1fb1b0d3345538.jpg" alt="">
                        </figure>
                    </NuxtLink>
                </SwiperSlide>
            </Swiper>
            <a target="" href="center-zh-Hans.html" class="hot_more">查看更多 >></a>
        </div>

        <!-- 咨询 -->
        <div class="news_module" style="background-image: url(assets/image/backdrop_img.jpg)">
            <div class="news_shadow" />
            <div class="news_box">
                <div class="reuse_module">
                    <p class="reuse_title">
                        新闻资讯
                    </p>
                    <figure class="reuse_img">
                        <img src="assets/image/deco.png" alt="">
                    </figure>
                    <!--            <span class="reuse_subhead">我们依靠企业生存，企业依靠我们发展。</span> -->
                </div>

                <div class="news_content flex">
                    <a class="news_left" target="" href="97-zh-Hans.html">
                        <figure class="news_img"><img src="assets/image/春节祝福新春快乐公众号首图.jpg" alt=""></figure>
                        <div class="news_txt flex">
                            <div class="news_title">
                                <h2>2024开工大吉！</h2>
                                <p>2024年2月18日（初九）正式开工啦</p>
                            </div>
                            <div class="news_date">
                                <strong>18</strong>
                                <span>2024-02</span>
                            </div>
                        </div>
                    </a>
                    <div class="news_right">
                        <a target="" href="96-zh-Hans1.html" class="news_list">
                            <div class="news_dates">
                                <strong>09</strong>
                                <span>2024-02</span>
                            </div>
                            <div class="news_headline">
                                <h2>鹰测技术祝大家新年快乐！龙年大吉！</h2>
                                <p>祝大家新年快乐</p>
                            </div>
                        </a>
                        <a target="" href="95-zh-Hans1.html" class="news_list">
                            <div class="news_dates">
                                <strong>15</strong>
                                <span>2024-01</span>
                            </div>
                            <div class="news_headline">
                                <h2>鹰测技术2023年度【团建+爬山比赛+联欢晚会】</h2>
                                <p>2024年1月13日，我司组织了为期一天的团建活动，举办了公司第六届爬山比赛，以及2023年度年终盛典联欢晚会。</p>
                            </div>
                        </a>
                        <a target="" href="94-zh-Hans1.html" class="news_list">
                            <div class="news_dates">
                                <strong>04</strong>
                                <span>2024-01</span>
                            </div>
                            <div class="news_headline">
                                <h2>鹰测技术2024年春节放假安排</h2>
                                <p>我司定于2024年2月4日-17日放假</p>
                            </div>
                        </a>
                        <a target="" href="93-zh-Hans.html" class="news_list">
                            <div class="news_dates">
                                <strong>26</strong>
                                <span>2023-12</span>
                            </div>
                            <div class="news_headline">
                                <h2>2024元旦放假通知</h2>
                                <p>2023年12月30日~2024年1月1日放假</p>
                            </div>
                        </a>
                        <a target="" href="92-zh-Hans1.html" class="news_list">
                            <div class="news_dates">
                                <strong>20</strong>
                                <span>2023-11</span>
                            </div>
                            <div class="news_headline">
                                <h2>2023上海国际电力电工展圆满落幕</h2>
                                <p>11月15-17日，2023上海国际电力电工展在上新国际博览中心举办，我司携多款新产品参加了此次展会。 </p>
                            </div>
                        </a>
                    </div>
                </div>
                <a target="" href="center-zh-Hans1.html" class="hot_more">查看更多 >></a>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const { $lang } = useNuxtApp()

const effect = {
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
    },
    next: { translate: ['100%', 0, 0] },
}

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
        spaceBetween: 10,
    },
    1255: {
        slidesPerView: 5,
        spaceBetween: 10,
    },
})

const { data } = await useCustomFetch<IIndexResponse>('/api/page/index')
// console.log('🚀 ~ file: HomeMain.vue:116 ~ data:', data)

const { data: companyInfo } = await useCustomFetch<IAboutInfoResponse>('/api/page/about', {
    params: {
        type: 1,
    },
})
</script>

<style lang="scss" scoped>
@import url(~/assets/css/home.css);

.tle-line {
    position: relative;
    padding: 0 20px;

    &::after,
    &::before {
        content: '';
        width: 70px;
        height: 1px;
        background-color: #ccc;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    &::before {
        right: 100%;
    }

    &::after {
        left: 100%;
    }
}

.swp-box {
    position: relative;
    --swiper-navigation-size: 20px;
    --swiper-theme-color: var(--co-main-color);

    .swiper-button-next {
        right: -45px;
        width: 35px;
        height: 35px;
        border: 1px solid var(--swiper-theme-color);
    }

    .swiper-button-prev {
        left: -45px;
        width: 35px;
        height: 35px;
        border: 1px solid var(--swiper-theme-color);
    }
}

.banner-links {
    display: block;
    width: 100%;
    padding-bottom: 75%;
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;

    >img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .cover {
        width: 0;
        transition: all .3s ease-out;

        span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-250px, -50%);
            transition: all .6s ease-out;
            white-space: nowrap;
        }
    }

    &:hover {

        .cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background-color: rgba(71, 204, 173, .5);
            transition: all .3s ease-out;

            --color: rgb(from var(--co-main-color) r g b / 50%);
            background-color: var(--color);
            // background-color: color-mix(in oklch, var(--co-main-color), transparent 60%);

            span {
                transform: translate(-50%, -50%);
                padding: 5px 20px;
                color: #fff;
                font-size: 16px;
                border: 2px solid #fff;
                transition: all .6s ease-out;
            }
        }
    }

}
</style>
