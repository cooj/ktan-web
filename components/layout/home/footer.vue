<template>
    <footer class="footer">
        <div class="footer_module main-bg-color">
            <div class="width_box footer_box">
                <div class="footer_one flex">
                    <div class="footer_list">
                        <p class="footer_title">
                            联系我们
                        </p>
                        <p class="footer_phone">
                            400-6261-158
                        </p>
                        <p class="footer_phone">
                            020-31529626
                        </p>
                        <p class="footer_site">
                            广州市白云区科园路18号（鹰测大楼）
                        </p>
                        <p style="padding-left: 1.5rem;">
                            www.eaglotest.com.cn
                        </p>
                        <p style="padding-left: 1.5rem;">
                            info@eaglotest.com.cn
                        </p>
                        <p style="padding-left: 1.5rem;">
                            7天-24小时为您服务！
                        </p>
                    </div>
                    <div class="footer_list">
                        <p class="footer_title">
                            产品中心
                        </p>
                        <div class="footer_link">
                            <a target="" class="footer_classify" href="95-zh-Hans.html">高低压核相相序系列</a>
                            <a target="" class="footer_classify" href="105.html">电缆识别路径仪系列</a>
                            <a target="" class="footer_classify" href="80-zh-Hans.html">绝缘电阻测试仪系列</a>
                            <a target="" class="footer_classify" href="155-zh-Hans.html">接地电阻测试仪系列</a>
                            <a target="" class="footer_classify" href="94-zh-Hans.html">智能相位伏安表系列</a>
                            <a target="" class="footer_classify" href="177-zh-Hans.html">电能质量分析仪系列</a>
                            <a target="" class="footer_classify" href="68-zh-Hans.html">高低压变比测试仪</a>
                            <a target="" class="footer_classify" href="87.html">高压电流电压表系列</a>
                            <a target="" class="footer_classify" href="165.html">钳形电流功率表系列</a>
                            <a target="" class="footer_classify" href="179-zh-Hans.html">直阻回路等电位系列</a>
                            <a target="" class="footer_classify" href="58.html">电流传感器系列</a>
                            <a target="" class="footer_classify" href="182-zh-Hans.html">其他专用仪器系列</a>
                            <a target="" class="footer_classify" href="192.html">电池内阻测试仪</a>
                        </div>
                    </div>
                    <div class="footer_list">
                        <p class="footer_title">
                            快速链接
                        </p>
                        <div class="footer_link">
                            <a target="" href="">首页</a>
                            <a target="" href="aboutUs.html">关于我们</a>
                            <a target="" href="center-zh-Hans.html">产品中心</a>
                            <a target="" href="center-zh-Hans1.html">新闻中心</a>
                            <a target="" href="serviceAndSupport.html">服务与支持</a>
                            <a target="" href="recruitment.html">人才招聘</a>
                            <a target="" href="contactUs.html">联系我们</a>
                        </div>
                    </div>
                    <div class="footer_list footer_list1">
                        <div class="footer_code">
                            <div class="code_img">
                                <img src="assets/image/f57aeb08.jpg" alt="">
                            </div>
                            <span>微信客服</span>
                        </div>
                        <div class="footer_code">
                            <div class="code_img">
                                <img src="assets/image/f57aeb08.jpg" alt="">
                            </div>
                            <span>微信公众号</span>
                        </div>
                    </div>
                </div>
                <div class="footer_two flex">
                    <div>
                        <a target="" class="footer_copyright" href="https://www.miit.gov.cn/">广东鹰测技术有限公司©版权所有 </a>
                        <a class="footer_copyright"
                            href="https://beian.miit.gov.cn/#/Integrated/recordQuery">粤ICP备17070473号-2</a>
                    </div>

                    <div class="footer_icBox flex">
                        <a target="" class="footer_icon" href=" //weibo.com/eaglotest?lang=zh-Hans"><img
                                src="assets/image/b876a72a.png" alt="新浪微博"></a>
                        <a target="" class="footer_icon"
                            href="https://www.facebook.com/profile.php?id=100069614070466?lang=zh-Hans"><img
                                src="assets/image/facebook.png" alt="Facebook"></a>
                        <a target="" class="footer_icon" href=""><img src="assets/image/ins.png" alt="ins"></a>
                        <a target="" class="footer_icon" href=""><img src="assets/image/linkdin.png"
                                alt="linkdin"></a>

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
        type: 2,
    },
})
</script>

<style lang="scss" scoped>
// @import url('@/assets/style/public.scss');
</style>
