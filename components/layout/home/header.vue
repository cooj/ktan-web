<template>
    <!-- 头部开始 -->
    <header class="header">
        <!-- 顶部 -->
        <div class="main-bg-color Top_box width_module">
            <div class="width_box Top_module flex">
                <span class="Top_title">{{ $lang(systemInfo?.welcome, systemInfo?.welcome_en) }}</span>
                <div class="Top_right flex">
                    <div class="Top_list flex">
                        <div class="Top_icon Top_phone">
                            <img src="assets/image/icon_phone.png" alt="">
                        </div>
                        <span>{{ systemInfo?.phone }}</span>
                    </div>
                    <!-- <a class="Top_list flex" href="JavaScript:;">
                        <div class="Top_icon"><img src="assets/picture/icon_user.png" alt=""></div>
                        <span>用户登录</span>
                    </a> -->
                    <div class="langue_module flex">
                        <NuxtLink to="/" class="langue_list flex items-center">
                            <div class="Top_icon">
                                <img src="assets/image/zh-Hans.png" alt="">
                            </div>
                            <span>中文版</span>
                        </NuxtLink>
                        <NuxtLink to="/en" class="langue_list flex items-center">
                            <div class="Top_icon">
                                <img src="assets/image/en.png" alt="">
                            </div>
                            <span>English</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- 导航 -->
        <div class="width_box dh_module flex">
            <NuxtLinkLocale to="/" class="logo_icon">
                <img :src="systemInfo?.logo" alt="">
            </NuxtLinkLocale>
            <div class="nav_module flex">
                <nav>
                    <ul class="flex">
                        <li v-for="item in menuList.filter(i => i.status)" :key="item.id" class="nav_list"
                            :class="{ nav_list1: item.children?.length }">
                            <NuxtLinkLocale :to="item.href" class="nav_btn"
                                :class="{ nav_active: setActiveMenu(item.href || '') }">
                                {{ $lang(item.title, item.title_en) }}
                            </NuxtLinkLocale>

                            <!-- 子菜单列表 -->
                            <div v-if="item.is_goods || item.children?.length" class="nav_hide">
                                <ul v-if="item.is_goods" class="nav_ul">
                                    <li v-for="opt in classifyList" :key="opt.id" class="nav_li">
                                        <NuxtLinkLocale :to="`/product?cid=${opt.id}`" class="nav_title">
                                            {{ $lang(opt.title, opt.title_en) }}
                                        </NuxtLinkLocale>
                                        <div v-if="opt.children?.length" class="nav_sublevel">
                                            <NuxtLinkLocale v-for="sub in opt.children" :key="sub.id"
                                                :to="`/product?cid=${sub.id}`">
                                                {{ $lang(sub.title, sub.title_en) }}
                                            </NuxtLinkLocale>
                                        </div>
                                    </li>
                                </ul>
                                <ul v-else class="nav_ul">
                                    <li v-for="sub in item.children" :key="sub.id" class="nav_li">
                                        <NuxtLinkLocale :to="sub.href" class="nav_title">
                                            {{ $lang(sub.title, sub.title_en) }}
                                        </NuxtLinkLocale>
                                    </li>
                                </ul>
                                <!-- 产品列表 -->
                            </div>
                        </li>
                    </ul>
                </nav>
                <div class="nav_search mt2px" @click="onToggleSearch()">
                    <img src="assets/image/icon_search.png" alt="">
                </div>
            </div>
        </div>
        <!-- 搜索 -->
        <div class="search_module" :class="searchOpen">
            <form class="search_box" onsubmit="return false">
                <button class="search_icon" type="submit">
                    <img src="assets/image/icon_search.png" alt="">
                </button>
                <input v-model="keyword" class="search_ipt" type="text" name="keyword"
                    :placeholder="$lang('搜索关键字', 'keyword') || ''" @keyup.enter="onSearch">
                <p class="search_shut" @click="onToggleSearch(true)">
                    x
                </p>
            </form>
        </div>

        <!-- 移动端顶部 -->
        <div class="mo_header">
            <div class="mo_search_switch" @click="onToggleMenu()">
                <img src="assets/image/list_icon.png" alt="">
            </div>
            <NuxtLinkLocale to="/" class="mo_search_logo">
                <img :src="systemInfo?.logo2 || ''" alt="">
            </NuxtLinkLocale>
            <div class="nav_search" @click="onToggleSearch()">
                <img src="assets/image/icon_search.png" alt="">
            </div>
        </div>
        <div class="mo_module" :class="activeClass">
            <div ref="target" class="mo_box">
                <div class="main-bg-color mo_explain">
                    <span>{{ $lang(systemInfo?.welcome, systemInfo?.welcome_en) }}</span>
                    <span>{{ systemInfo?.phone }}</span>
                </div>
                <div class="main-bg-color mo_top">
                    <NuxtLink to="/" class="mo_language flex">
                        <div><img src="assets/image/zh-Hans.png" alt=""></div>
                        <span>中文版</span>
                    </NuxtLink>
                    <NuxtLink to="/en" class="mo_language flex">
                        <div><img src="assets/image/en.png" alt=""></div>
                        <span>English</span>
                    </NuxtLink>
                </div>
                <!--            <a href="JavaScript:;" class="mo_user"> -->
                <!--                <figure class="mo_icon"><img src="/template/home/static/img/public/icon_user.png" alt=""></figure> -->
                <!--                <p>用户登录</p> -->
                <!--            </a> -->
                <nav>
                    <ul class="mo_ul">
                        <li v-for="item in menuList.filter(i => i.status)" :key="item.id" class="mo_li">
                            <NuxtLinkLocale :to="item.href" class="mo_btn">
                                {{ $lang(item.title, item.title_en) }}
                            </NuxtLinkLocale>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
const { $lang } = useNuxtApp()

const route = useRoute()
const systemInfo = await useSystemState().getSystemInfo()

const menuState = useMenuState()

const menuList = await menuState.getMenuList()
// if (process.client) {
//     setTimeout(() => {
//         console.log('🚀 ~ file: header.vue:21 ~ menuList:', menuList)
//     }, 1500)
// }

const classifyList = await useGoodsClassifyState().getClassify()

const setActiveMenu = (item: string) => {
    const href = menuState.activeMenu.value?.href

    return href === item
    // // if (href === item) {
    // // }

    // const route = useRoute()
    // // const url = useRequestURL()

    // const path = route.path
    // // let path=url.pathname
    // // const path = '/public/upload/product/2021/04-17/S-042KD.jpg'

    // // 查找第一个斜杠的索引
    // const firstSlashIndex = path.indexOf('/')
    // let first = ''
    // if (firstSlashIndex !== -1) {
    //     // 截取第一个斜杠及其前面的内容
    //     first = path.substring(0, firstSlashIndex + 1) // 包括斜杠
    // }

    // if (path === item) {
    //     return true
    // } else if (item !== '/' && (path === `/${item}` || item === first)) {
    //     return true
    // } else {
    //     return false
    // }
}

const searchOpen = ref('')
const onToggleSearch = (close?: boolean) => {
    if (close && keyword.value) keyword.value = ''
    searchOpen.value = close ? '' : 'open'
}

const keyword = ref('')
const onSearch = async () => {
    if (!keyword.value?.trim()) return false
    let url = '/product'
    if (route.path.startsWith('/en')) {
        url = '/en/product'
    }
    await navigateTo(`${url}?keyword=${keyword.value}`)
    onToggleSearch(true)
}

// 移动端
//

const activeClass = ref('')
const onToggleMenu = (close?: boolean) => {
    activeClass.value = close ? '' : 'mo_show'
}

const target = ref(null)
onClickOutside(target, (event) => {
    if (activeClass.value) activeClass.value = ''
})
watch(() => route.path, () => {
    if (activeClass.value) activeClass.value = ''
})
</script>

<style lang="scss" scoped>
// @import url(~/assets/css/header.css);
</style>
