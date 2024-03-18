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

        <div class="zp_module">
            <ul class="width_box zp_ul">
                <ClientOnly>
                    <li v-for="item in list" :key="item.id" class="zp_list">
                        <div class="zp_top" :class="{ zp_active: item.id === active }" @click="onToggleItem(item)">
                            <p>{{ $lang(item.title, item.title_en) }}</p>
                            <p>{{ $lang('招聘人数', 'Recruiting Numbers') }}：{{ item.people }}</p>
                            <p>{{ $lang('工作地点', 'Work location') }}：{{ $lang(item.address, item.address_en) }}</p>
                            <figure class="zp_icon">
                                <img :src="systemInfo?.logo || ''">
                            </figure>
                        </div>
                        <div class="zp_base">
                            <div class="zp_box">
                                <div class="zp_desc" v-html="$lang(item.describe, item.describe_en)" />
                                <div class="zp_desc" v-html="$lang(item.content, item.content_en)" />
                            </div>
                        </div>
                    </li>
                </ClientOnly>
            </ul>
        </div>

        <!-- 说明 -->
        <div class="width_box">
            <div class="state_module">
                <div class="state_list">
                    <strong class="state_title">
                        {{ $lang('简历请投至', 'Please submit your resume to') }}
                    </strong>
                    <p class="state_text">
                        {{ $lang('邮箱', 'Email') }}：{{ systemInfo?.email }}
                    </p>
                </div>
                <div class="state_list">
                    <strong class="state_title">
                        {{ $lang('联系电话', 'Telephone') }}
                    </strong>
                    <p class="state_text">
                        {{ $lang('客服热线', 'Hotline') }}：{{ systemInfo?.phone }}
                    </p>
                    <p class="state_text">
                        {{ $lang('服务热线', 'Service hotline') }}：{{ systemInfo?.phone2 }}
                    </p>
                </div>
                <div class="state_list">
                    <strong class="state_title">
                        {{ $lang('联系地址', 'Address') }}
                    </strong>
                    <p class="state_text">
                        {{ $lang(systemInfo?.address, systemInfo?.address_en) }}
                    </p>
                </div>
                <div class="state_list">
                    <strong class="state_title">
                        {{ $lang('我们的近况', 'Our current situation') }}
                    </strong>
                    <NuxtLinkLocale to="/news" class="state_text">
                        {{ $lang('了解更多', 'Learn more') }} >>
                    </NuxtLinkLocale>
                    <!-- <a target="" href="center-zh-Hans1.html" class="state_text"></a> -->
                </div>
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
        type: 'recruit-person',
    },
})

const { data: recruit } = await useCustomFetch<{ data: { list: IRecruitGetListItem[] } }>('/api/page/recruit', {
    params: {
        type: 1, // 1：启用，2：禁用
    },
})

const list: IRecruitGetListItem[] = recruit.value?.data?.list || []

const active = ref(0)

const onToggleItem = (item: IRecruitGetListItem) => {
    if (item.id === active.value) active.value = 0
    else active.value = item.id
}
</script>

<style lang="scss" scoped>
@import url('@/assets/css/recruit.css');
</style>
