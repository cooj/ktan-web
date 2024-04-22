<template>
    <section>
        <CiSubMenu />
        <article class="width_box mt30px!">
            <!-- 关于我们 -->
            <div class="about_module">
                <div class="reuse_module">
                    <p class="reuse_title">
                        {{ $lang(data?.title, data?.title_en) }}
                    </p>
                    <figure class="reuse_img">
                        <img class="co-filter-color" src="assets/image/deco.png" alt="">
                    </figure>
                    <!-- <span class="reuse_subhead">致力于向广大客户提供智能化电力测试仪器仪表</span> -->
                </div>
                <div class="about_box">
                    <figure class="about_img">
                        <!-- <img src="static/picture/厂房效果图.jpg"> -->
                        <img :src="data?.img || ''">
                    </figure>
                    <h1 class="about_title font-bold">
                        {{ $lang(systemInfo?.company, systemInfo?.company_en) }}
                    </h1>
                    <div class="about_content" v-html="$lang(data?.content, data?.content_en)" />
                </div>
            </div>
        </article>
        <div class="about_banner">
            <div class="width_box">
                <Swiper :modules="[SwiperNavigation, SwiperPagination]" :slides-per-view="1" navigation>
                    <SwiperSlide v-for="(item, idx) in photo" :key="idx" class="w100%">
                        <img class="w100%" :src="item.img" :alt="item.title">
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

definePageMeta({
    layout: 'home',
})
const systemInfo = await useSystemState().getSystemInfo()
const { data } = await useCustomFetch<Prisma.OtherMaxAggregateOutputType>('/api/page/other', {
    params: {
        type: 'about',
    },
})

const { data: photo } = await useCustomFetch<ISlideListResponse[]>('/api/page/get_about_link', {
    method: 'post',
    body: {
        type: 7,
        isPage: 1,
    },
})
</script>

<style lang="scss" scoped>
@import url('@/assets/css/about.css');
</style>
