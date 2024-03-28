<template>
    <footer class="footer">
        <div class="footer_module main-bg-color">
            <div class="width_box footer_box">
                <div class="footer_one flex">
                    <div class="footer_list">
                        <p class="footer_title">
                            {{ $lang('联系我们', 'Contact us') }}
                        </p>
                        <p class="footer_phone">
                            {{ systemInfo?.phone }}
                        </p>
                        <p class="footer_phone">
                            {{ systemInfo?.phone2 }}
                        </p>
                        <p class="footer_site">
                            {{ $lang(systemInfo?.address, systemInfo?.address_en) }}
                        </p>
                        <p style="padding-left: 1.5rem;">
                            {{ systemInfo?.email }}
                        </p>
                        <!-- <p style="padding-left: 1.5rem;">
                            info@eaglotest.com.cn
                        </p>
                        <p style="padding-left: 1.5rem;">
                            7天-24小时为您服务！
                        </p> -->
                    </div>
                    <div class="footer_list">
                        <p class="footer_title">
                            {{ $lang('产品中心', 'Product Center') }}
                        </p>
                        <div class="footer_link">
                            <NuxtLinkLocale v-for="item in classifyList.filter(opt => opt.type === 1)" :key="item.id"
                                :to="`/product?cid=${item.id}`" class="footer_classify">
                                {{ $lang(item.title, item.title_en) }}
                            </NuxtLinkLocale>
                        </div>
                    </div>
                    <div class="footer_list">
                        <p class="footer_title">
                            {{ $lang('快速链接', 'Quick links') }}
                        </p>
                        <div class="footer_link">
                            <NuxtLinkLocale v-for="item in menuList" :key="item.id" :to="item.href">
                                {{ $lang(item.title, item.title_en) }}
                            </NuxtLinkLocale>
                        </div>
                    </div>
                    <div class="footer_list footer_list1">
                        <div class="footer_code">
                            <CoImage class="w100% pb100%" :src="systemInfo?.customCode" />
                            <span>{{ $lang('微信客服', 'WeChat customer service') }}</span>
                        </div>
                        <div class="footer_code">
                            <CoImage class="w100% pb100%" :src="systemInfo?.qrCode" />
                            <span> {{ $lang('微信公众号', 'WeChat official account') }}</span>
                        </div>
                    </div>
                </div>
                <div class="footer_two">
                    <div class="c-#fff" v-html="$lang(systemInfo?.filing, systemInfo?.filing_en)" />

                    <div class="footer_icBox flex">
                        <NuxtLink v-for="item in links" :key="item.id" :to="item.href" target="_blank"
                            class="footer_icon">
                            <img :src="item.img" :alt="$lang(item.title, item.title_en) || ''">
                        </NuxtLink>
                        <!-- <a target="" class="footer_icon"
                            href="https://www.facebook.com/profile.php?id=100069614070466?lang=zh-Hans"><img
                                src="assets/image/facebook.png" alt="Facebook"></a>
                        <a target="" class="footer_icon" href=""><img src="assets/image/ins.png" alt="ins"></a>
                        <a target="" class="footer_icon" href=""><img src="assets/image/linkdin.png" alt="linkdin"></a> -->

                        <!--                    <a target="" class="footer_icon" href=""><img src="/template/home/static/img/public/icon_share0.png" alt=""></a> -->
                        <!--                    <a target="" class="footer_icon" href=""><img src="/template/home/static/img/public/icon_share1.png" alt=""></a> -->
                        <!--                    <a target="" class="footer_icon" href=""><img src="/template/home/static/img/public/icon_share2.png" alt=""></a> -->
                        <!--                    <a target="" class="footer_icon" href=""><img src="/template/home/static/img/public/icon_share3.png" alt=""></a> -->
                        <!--                    <a target="" class="footer_icon" href=""><img src="/template/home/static/img/public/icon_share4.png" alt=""></a> -->
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const { $lang } = useNuxtApp()
const systemInfo = await useSystemState().getSystemInfo()

const classifyList = await useGoodsClassifyState().getClassify()

const menuState = useMenuState()

const menuList = await menuState.getMenuList()

const qqLink = computed(() => {
    if (systemInfo.value?.qq) {
        return `http://wpa.qq.com/msgrd?v=3&uin=${systemInfo.value.qq}&site=qq&menu=yes`
    } else {
        return 'javascript:;'
    }
})
// console.log(dat)
const { data: links } = await useCustomFetch<ISlideListResponse[]>('/api/page/get_links', {
    params: {
        type: 8,
    },
})
</script>

<style lang="scss" scoped>
// @import url('@/assets/style/public.scss');
</style>
