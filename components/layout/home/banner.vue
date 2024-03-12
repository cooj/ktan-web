<template>
    <div class="banner">
        <Swiper v-if="activeMenu?.href === '/'"
            :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]" :slides-per-view="1"
            :loop="true" :autoplay="{ delay: 8000, disableOnInteraction: true }" effect="creative"
            :creative-effect="effect" navigation :pagination="{ clickable: true }">
            <SwiperSlide v-for="(item, idx) in banner" :key="idx" class="w100%">
                <NuxtLink :to="item.href" class="banner-link">
                    <img :src="item.img" :alt="item.title">
                </NuxtLink>
            </SwiperSlide>
        </Swiper>

        <template v-else>
            <!-- banner图 -->
            <ClientOnly>
                <div class="banner_img">
                    <img :src="menu?.img" alt="">
                </div>

                <!-- 面包屑 -->
                <div class="width_box crumbs_module">
                    <nav>
                        <!-- {{ $lang('当前位置', 'Location') }}： -->
                        <ClientOnly>
                            <i class="i-ep-home-filled mr10px block" />
                            <el-breadcrumb :separator-icon="ArrowRight" class="bread-box">
                                <el-breadcrumb-item>
                                    <NuxtLinkLocale to="/">
                                        <!-- {{ $t('home') }} -->
                                        {{ $lang('首页', 'Home') }}
                                    </NuxtLinkLocale>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>
                                    <NuxtLinkLocale :to="activeMenu?.href">
                                        {{ $lang(activeMenu?.title, activeMenu?.title_en) }}
                                    </NuxtLinkLocale>
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </ClientOnly>
                    </nav>
                </div>
            </ClientOnly>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
const { activeMenu, menuList } = useMenuState()
// :creative-effect="{
//             prev: {
//                 shadow: false,
//                 translate: ['-20%', 0, -1]
//             },
//             next: { translate: ['100%', 0, 0] }
//         }"

const menu = ref(activeMenu.value)

const effect = {
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
    },
    next: { translate: ['100%', 0, 0] },
}

const { data: banner } = await useCustomFetch<ISlideListResponse[]>('/api/page/get_banner?type=5')
// console.log(banner)
</script>

<style lang="scss" scoped>
.banner {
    --swiper-theme-color: var(--co-main-color);
    --swiper-pagination-bullet-size: 12px;
}

.banner-link {
    display: block;
    width: 100%;
    height: 600px;
    position: relative;
    top: 0;
    left: 0;
    // padding-bottom: 30%;

    >img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.bread-box {
    font-size: 16px;
    color: var(--el-text-color-regular);
    --el-text-color-primary: var(--el-text-color-regular);
}
</style>
