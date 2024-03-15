<template>
    <section>
        <!-- 分类 -->
        <CiSubMenu :value="news?.type" />
        <article class="width_box news_detail">
            <h1 class="news_detail_title">
                {{ $lang(news?.title, news?.title_en) }}
            </h1>
            <div class="news_subhead">
                <span>{{ formatTime(new Date(news!.createdAt), 'YYYY-mm-dd') }}</span>
                <span>{{ $lang('作者', 'Author') }}: {{ news?.author }}</span>
            </div>
            <div class="news_cont" v-html="$lang(news?.content, news?.content_en)" />
            <div class="news_return">
                <NuxtLinkLocale :to="`/news${news?.type === 2 ? '/industry' : ''}`">
                    {{ $lang('返回列表', 'Go Back') }}
                </NuxtLinkLocale>
            </div>
        </article>
        <ul class="width_box paging_module">
            <li>
                <!-- <a target="" href="/home/News/detail/id/94?lang=zh-Hans">上一篇: 鹰测技术2024年春节放假安排</a> -->
                <NuxtLinkLocale v-if="prevNews?.id" :to="`/news/${prevNews?.id}`">
                    <!-- {{ $t('prev') }} -->
                    {{ $lang('上一篇', 'Prev') }}： {{ $lang(prevNews?.title, prevNews?.title_en) }}
                </NuxtLinkLocale>
                <span v-else>
                    <!-- {{ $t('prev') }}：{{ $t('none') }} -->
                    {{ $lang('上一篇', 'Prev') }}：{{ $lang('无', 'none') }}
                </span>
            </li>
            <li>
                <NuxtLinkLocale v-if="nextNews?.id" :to="`/news/${nextNews?.id}`">
                    <!-- {{ $t('next') }} -->
                    {{ $lang('下一篇', 'Next') }}： {{ $lang(nextNews?.title, nextNews?.title_en) }}
                </NuxtLinkLocale>
                <span v-else>
                    <!-- {{ $t('next') }}：{{ $t('none') }}  -->
                    {{ $lang('下一篇', 'Next') }}：{{ $lang('无', 'none') }}
                </span>
            </li>
        </ul>
    </section>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'home',
})

const id = useRouteParam('id')

const { data } = await useCustomFetch<Record<'nextNews' | 'prevNews' | 'data', INewsResponse>>('/api/page/news/detail', {
    params: {
        id: id.value,
        // type: props.type,
    },
})
if (!data.value) {
    showErrorPage()
}

const news = data.value?.data
const nextNews = data.value?.nextNews
const prevNews = data.value?.prevNews
</script>

<style>
@import url('~/assets/css/news-detail.css');
</style>
