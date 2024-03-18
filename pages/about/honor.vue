<template>
    <section>
        <CiSubMenu />

        <div class="width_box certification_module mt30px!">
            <div class="reuse_module">
                <p class="reuse_title">
                    荣誉资质
                </p>
                <figure class="reuse_img">
                    <img src="assets/image/deco.png" alt="">
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

const { data: photo } = await useCustomFetch<ISlideListResponse[]>('/api/page/get_banner?type=6')
const srcList = photo.value?.map(item => item.img)
</script>

<style lang="scss" scoped>
@import url('@/assets/css/about.css');
</style>
