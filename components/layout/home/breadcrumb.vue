<template>
    <section>
        <!-- banner图 -->
        <div class="banner_img">
            <!-- <img src="static/picture/新闻中心.jpg" alt=""> -->
        </div>

        <!-- 面包屑 -->
        <div class="width_box crumbs_module">
            <nav>
                {{ $lang('当前位置', 'Location') }}：
                <ClientOnly>
                    <el-breadcrumb class="bread-box">
                        <el-breadcrumb-item>
                            <NuxtLinkLocale to="/">
                                <!-- {{ $t('home') }} -->
                                {{ $lang('首页', 'Home') }}
                            </NuxtLinkLocale>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <!-- <NuxtLinkLocale :to="activeMenu?.href">
                                {{ $lang(activeMenu?.title, activeMenu?.title_en) }}
                            </NuxtLinkLocale> -->
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </ClientOnly>

                <a target="" href="index.html" class="crumbs_a">
                    <!-- <figure class="crumbs_icon"><img src="static/picture/idxPath.png" alt=""></figure> -->
                    <p>首页</p>
                </a>
                <span class="crumbs_span">></span>
                <a href="javascript:(0)" class="crumbs_a">新闻中心</a>
            </nav>
        </div>
    </section>
</template>

<script lang="ts" setup>
const { activeMenu, menuList } = useMenuState()
</script>
