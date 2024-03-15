<template>
    <!-- 头部开始 -->
    <header class="header">
        <!-- 顶部 -->
        <div class="width_module main-bg-color Top_box">
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
                                        <!-- <a target="" class="nav_title" href="95-zh-Hans.html">高低压核相相序系列</a> -->
                                        <div v-if="opt.children?.length" class="nav_sublevel">
                                            <NuxtLinkLocale v-for="sub in opt.children" :key="sub.id"
                                                :to="`/product?cid=${sub.id}`">
                                                {{ $lang(sub.title, sub.title_en) }}
                                            </NuxtLinkLocale>
                                            <!-- <a target="" href="103.html">本地语音智能核相仪</a>
                                            <a target="" href="102.html">远程卫星授时核相仪</a>
                                            <a target="" href="101.html">网络基站定相核相仪</a>
                                            <a target="" href="173-zh-Hans.html">中置柜专用核相仪</a>
                                            <a target="" href="100.html">高低压核相相序仪</a> -->
                                        </div>
                                    </li>
                                    <template v-if="0">
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="105.html">电缆识别路径仪系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="109-zh-Hans.html">多功能电缆识别仪</a>
                                                <a target="" href="108.html">综合管线路径仪</a>
                                                <a target="" href="187.html">电缆故障测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="80-zh-Hans.html">绝缘电阻测试仪系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="172.html">在线绝缘电阻监测报警仪</a>
                                                <a target="" href="86-zh-Hans.html">手持式绝缘电阻测试仪</a>
                                                <a target="" href="190.html">箱式绝缘电阻测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="155-zh-Hans.html">接地电阻测试仪系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="83-zh-Hans.html">数字式接地电阻测试仪</a>
                                                <a target="" href="82-zh-Hans.html">接地电阻/土壤电阻测试仪</a>
                                                <a target="" href="174-zh-Hans.html">双钳接地电阻测试仪</a>
                                                <a target="" href="191.html">在线式接地电阻测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="94-zh-Hans.html">智能相位伏安表系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="99.html">单钳相位伏安表</a>
                                                <a target="" href="98-zh-Hans.html">双钳相位伏安表</a>
                                                <a target="" href="96-zh-Hans.html">三钳相位伏安表</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="177-zh-Hans.html">电能质量分析仪系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="178-zh-Hans.html">电能质量分析仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="68-zh-Hans.html">高低压变比测试仪</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="78-zh-Hans.html">无线高压变比测试仪</a>
                                                <a target="" href="74-zh-Hans.html">低压变比测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="87.html">高压电流电压表系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="92-zh-Hans.html">高低压电流·漏电流测试仪</a>
                                                <a target="" href="90-zh-Hans.html">高低压验电·电压测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="165.html">钳形电流功率表系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="167.html">钳形电流表</a>
                                                <a target="" href="169.html">钳形功率表</a>
                                                <a target="" href="170.html">柔性线圈大电流记录仪</a>
                                                <a target="" href="166.html">变压器铁芯电流测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="179-zh-Hans.html">直阻回路等电位系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="180.html">等电位测试仪</a>
                                                <a target="" href="181-zh-Hans.html">直流电阻测试仪</a>
                                                <a target="" href="188.html">回路电阻测试仪</a>
                                                <a target="" href="189.html">导通电阻测试仪</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="58.html">电流传感器系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="71-zh-Hans.html">钳形电流传感器</a>
                                                <a target="" href="70-zh-Hans.html">开合式电流传感器</a>
                                                <a target="" href="72.html">柔性线圈电流传感器</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="182-zh-Hans.html">其他专用仪器系列</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="60-zh-Hans.html">仪器箱/仪器包</a>
                                            </div>
                                        </li>
                                        <li class="nav_li">
                                            <a target="" class="nav_title" href="192.html">电池内阻测试仪</a>
                                            <div class="nav_sublevel">
                                                <a target="" href="193.html">蓄电池检测仪</a>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                                <ul v-else class="nav_ul">
                                    <li v-for="sub in item.children" :key="sub.id" class="nav_li">
                                        <NuxtLinkLocale :to="sub.href" class="nav_title">
                                            {{ $lang(sub.title, sub.title_en) }}
                                        </NuxtLinkLocale>
                                        <!-- <a target="" class="nav_title" href="aboutUs.html">关于我们</a> -->
                                    </li>

                                    <!-- <li class="nav_li">
                                        <a target="" class="nav_title" href="2-zh-Hans.html">企业文化</a>
                                    </li>
                                    <li class="nav_li">
                                        <a target="" class="nav_title" href="3-zh-Hans.html">企业架构</a>
                                    </li>
                                    <li class="nav_li">
                                        <a target="" class="nav_title" href="4.html">荣誉资质</a>
                                    </li> -->
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
                <div class="mo_explain main-bg-color">
                    <span>{{ $lang(systemInfo?.welcome, systemInfo?.welcome_en) }}</span>
                    <span>{{ systemInfo?.phone }}</span>
                </div>
                <div class="mo_top main-bg-color">
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
// console.log(dat)

const menuState = useMenuState()

const menuList = await menuState.getMenuList()
if (process.client) {
    setTimeout(() => {
        console.log('🚀 ~ file: header.vue:21 ~ menuList:', menuList)
    }, 1500)
}

const classifyList = await useGoodsClassifyState().getClassify()
// console.log('classifyList :>> ', classifyList)

const setActiveMenu = (item: string) => {
    const href = menuState.activeMenu.value?.href

    return href === item
    // if (href === item) {
    // }
    console.log(menuState.activeMenu.value?.href)
    const route = useRoute()
    // console.log(route)
    // const url = useRequestURL()
    // console.log(url)

    const path = route.path
    // let path=url.pathname
    // const path = '/public/upload/product/2021/04-17/S-042KD.jpg'

    // 查找第一个斜杠的索引
    const firstSlashIndex = path.indexOf('/')
    let first = ''
    if (firstSlashIndex !== -1) {
        // 截取第一个斜杠及其前面的内容
        first = path.substring(0, firstSlashIndex + 1) // 包括斜杠
    }

    if (path === item) {
        return true
    } else if (item !== '/' && (path === `/${item}` || item === first)) {
        return true
    } else {
        return false
    }
}

const searchOpen = ref('')
const onToggleSearch = (close?: boolean) => {
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
