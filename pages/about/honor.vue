<template>
    <section>
        <CiSubMenu />

        <div class="width_box certification_module mt30px!">
            <div class="reuse_module">
                <ClientOnly>
                    <p class="reuse_title">
                        {{ $lang(nowMenu?.title, nowMenu?.title_en) }}
                    </p>
                </ClientOnly>
                <figure class="reuse_img">
                    <img class="co-filter-color" src="assets/image/deco.png" alt="">
                </figure>
            </div>
            <ul class="certification_ul">
                <!-- <li v-for="item in photo" :key="item.id" class="certification_li">
                        <img :src="item?.img || ''" :alt="item?.title">
                    </li> -->
                <li v-for="(item, index) in photo" :key="item.id" class="certification_li">
                    <CoImage class="w100% pb137% block!" :src="item?.img || ''" :preview-src-list="srcList"
                        :initial-index="index" :alt="item?.title" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'home',
})

const { data: photo } = await useCustomFetch<ISlideListResponse[]>('/api/page/get_about_link?type=6')
const srcList = photo.value?.map(item => item.img)

const { nowMenu } = useMenuState()
</script>

<style lang="scss" scoped>
@import url('@/assets/css/about.css');
</style>
