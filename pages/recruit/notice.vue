<template>
    <section>
        <CiSubMenu />
        <!-- 文章 -->
        <article class="width_box article_module">
            <div class="article_content">
                <h1 class="article_title mb10px font-bold">
                    {{ $lang(data?.title, data?.title_en) }}
                </h1>
                <!-- <p class="article_subhead">
                    All rivers run into sea, is the use
                </p> -->
                <div class="article_text" v-html="$lang(data?.content, data?.content_en)" />
            </div>
            <figure class="article_img">
                <img :src="data?.img || ''" alt="">
            </figure>
        </article>
    </section>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

definePageMeta({
    layout: 'home',
})

const { data } = await useCustomFetch<Prisma.OtherMaxAggregateOutputType>('/api/page/other', {
    params: {
        type: 'recruit-notice',
    },
})
</script>

<style lang="scss" scoped>
@import url('@/assets/css/recruit.css');
</style>
