<template>
    <section>
        <CiSubMenu />

        <!-- 留言框 -->
        <div class="width_box join_top">
            <p class="join_explain">
                鹰测技术欢迎您留言，可以拨打客服热线<span> 400-6261-158</span>,
                会有专门的客服为您解答相关疑问。您也可以填写下面的留言表。如有任何问题或询问，请发电子邮件给我们，或使用我们的联系方式。我们很乐意回答您的问题。
            </p>
            <form id="form" onsubmit="return false" method="post" class="join_module">
                <div class="join_box">
                    <ul class="join_ul">
                        <li class="join_list">
                            <input name="customName" type="text" placeholder="您的姓名">
                            <div><img src="assets/image/icon_join1.png" alt=""></div>
                        </li>
                        <li class="join_list">
                            <input name="mobile" type="text" placeholder="您的电话">
                            <div><img src="assets/image/icon_join2.png" alt=""></div>
                        </li>
                        <li class="join_list">
                            <input name="email" type="email" placeholder="您的邮箱">
                            <div><img src="assets/image/icon_join3.png" alt=""></div>
                        </li>
                        <li class="join_list">
                            <input name="address" class="address" type="text" placeholder="所在地区">
                            <!--                        <div class="city_btn"><img src="/template/home/static/img/img/icon_join4.png" alt=""></div> -->
                            <!--                        <object class="join_city"> -->
                            <!--                            <div class="city_module"> -->
                            <!--                                <select name="province" class="province" onchange="onProvinceChange()"> -->
                            <!--                                </select> -->
                            <!--                                <select name="city" class="city" onchange="onCityChange()"> -->
                            <!--                                </select> -->
                            <!--                                <select name="district" class="district"> -->
                            <!--                                </select> -->
                            <!--                                <div class="city_submit"><button type="button">确定</button></div> -->
                            <!--                            </div> -->
                            <!--                        </object> -->
                        </li>
                    </ul>
                    <div class="join_img">
                        <!-- <img src="assets/image/join_img.png" alt=""> -->
                    </div>
                </div>
                <textarea name="note" class="join_remark" placeholder="备注" />
                <div class="join_base">
                    <div class="join_list">
                        <input name="verifyCode" type="text" placeholder="验证码">
                        <div><a href="javascript:changeVerifyCode()"><img id="verifyCodeImg" src="" alt=""></a></div>
                    </div>
                    <a href="javascript:submit()" class="join_submit">提交申请</a>
                </div>
            </form>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import { defineComponent } from 'vue'

definePageMeta({
    layout: 'home',
})
const systemInfo = await useSystemState().getSystemInfo()

onMounted(() => {
    initMap('map_box', systemInfo.value?.company, systemInfo.value?.address)
})
</script>

<style lang="scss" scoped>
@import url('@/assets/css/message.css');
</style>
