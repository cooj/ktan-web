<template>
    <section>
        <CiSubMenu />
        <!-- 详情 -->
        <div class="width_box contact_module">
            <div class="contact_left">
                <strong class="contact_name">
                    {{ $lang(systemInfo?.company, systemInfo?.company_en) }}
                </strong>
                <ul class="contact_ul">
                    <li class="contact_list">
                        <figure class="contact_icon">
                            <img class="co-filter-color" src="assets/image/icon_phone1.png" alt="">
                        </figure>
                        <p class="contact_text">
                            {{ $lang('服务热线', 'Service hotline') }} ：{{ systemInfo?.phone }}
                        </p>
                    </li>
                    <li class="contact_list">
                        <figure class="contact_icon">
                            <img class="co-filter-color" src="assets/image/icon_phone1.png" alt="">
                        </figure>
                        <p class="contact_text">
                            {{ $lang('客服热线', 'Customer hotline') }}：{{ systemInfo?.phone2 }}
                        </p>
                    </li>
                    <li class="contact_list">
                        <figure class="contact_icon">
                            <img class="co-filter-color" src="assets/image/icon_email.png" alt="">
                        </figure>
                        <p class="contact_text">
                            {{ $lang('电子邮箱', 'Email') }}：{{ systemInfo?.email }}
                        </p>
                    </li>
                    <li class="contact_list">
                        <figure class="contact_icon">
                            <img class="co-filter-color" src="assets/image/icon_address.png" alt="">
                        </figure>
                        <p class="contact_text">
                            {{ $lang('联系地址', 'Address') }}： {{ $lang(systemInfo?.address, systemInfo?.address_en) }}
                        </p>
                    </li>
                    <!-- <li class="contact_list">
                        <figure class="contact_icon">
                            <img src="assets/image/icon_url.png" alt="">
                        </figure>
                        <p class="contact_text">
                            官方网址：<a target="" href="index.html">test.com.cn</a>
                        </p>
                    </li> -->
                </ul>
            </div>
            <div class="contact_right">
                <div class="contact_img">
                    <CoImage :src="systemInfo?.customCode" class="w100% pb100%" />
                    <!-- <figure><img :src="systemInfo?.customCode" alt=""></figure> -->
                    <p>{{ $lang('扫一扫联系我们', 'Scan and contact us') }}</p>
                </div>
                <div class="contact_img">
                    <!-- <figure><img :src="systemInfo?.qrCode" alt=""></figure> -->
                    <CoImage :src="systemInfo?.qrCode" class="w100% pb100%" />
                    <p>{{ $lang('扫一扫关注公众号', 'Scan to follow the official account') }}</p>
                </div>
            </div>
        </div>

        <!-- 地图 -->
        <map class="width_box map_module">
            <div id="map_box" style="height: 500px;" />
        </map>
    </section>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'home',
})
const systemInfo = await useSystemState().getSystemInfo()

onMounted(() => {
    initMap('map_box', systemInfo.value?.company, systemInfo.value?.address)
})
</script>

<style lang="scss" scoped>
@import url('@/assets/css/contact.css');
</style>
