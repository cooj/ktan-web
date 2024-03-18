<template>
    <section>
        <CiSubMenu />

        <!-- 留言框 -->
        <div class="width_box join_top">
            <div class="join_explain" v-html="$lang(data?.content, data?.content_en)" />
            <form id="form" onsubmit="return false" method="post" class="join_module">
                <div class="join_box">
                    <ul class="join_ul">
                        <li class="join_list">
                            <input v-model="form.name" name="customName" type="text"
                                :placeholder="$lang('您的名字', 'Name') || ''">
                            <div><img src="assets/image/icon_join1.png" alt=""></div>
                        </li>
                        <li class="join_list">
                            <input v-model="form.phone" name="mobile" type="text"
                                :placeholder="$lang('您的电话', 'Phone') || ''">
                            <div><img src="assets/image/icon_join2.png" alt=""></div>
                        </li>
                        <li class="join_list">
                            <input v-model="form.email" name="email" type="email"
                                :placeholder="$lang('您的邮箱', 'Email') || ''">
                            <div><img src="assets/image/icon_join3.png" alt=""></div>
                        </li>
                        <li class="join_list">
                            <input v-model="form.address" name="address" class="address" type="text"
                                :placeholder="$lang('所在地区', 'Address') || ''">
                            <!-- <div class="city_btn"><img src="/template/home/static/img/img/icon_join4.png" alt=""></div> -->
                        </li>
                    </ul>
                    <div class="join_img">
                        <img :src="data?.img || ''" alt="">
                    </div>
                </div>
                <textarea v-model="form.note" name="note" class="join_remark"
                    :placeholder="$lang('备注', 'Remark') || ''" />
                <div class="join_base">
                    <div class="join_list">
                        <input v-model="form.verifyCode" name="verifyCode" type="text"
                            :placeholder="$lang('验证码', 'Code') || ''">
                        <div class="select-none pl5px text-28px tracking-8px font-[fantasy]" @click="setVerifyCode">
                            <ClientOnly>{{ code }}</ClientOnly>
                            <!-- <a href="javascript:changeVerifyCode()"><img id="verifyCodeImg" src="" alt=""></a> -->
                        </div>
                    </div>
                    <a class="join_submit" @click="onSubmit">{{ $lang('提交申请', 'Submit') }}</a>
                </div>
            </form>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

const { $lang } = useNuxtApp()

definePageMeta({
    layout: 'home',
})
const systemInfo = await useSystemState().getSystemInfo()

const { data } = await useCustomFetch<Prisma.OtherMaxAggregateOutputType>('/api/page/other', {
    params: {
        type: 'message',
    },
})

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }

    return result
}

const disabled = ref(false)
const code = ref(generateRandomString(4))
const form = reactive({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    verifyCode: '',
})

const setVerifyCode = () => {
    code.value = generateRandomString(4)
}

const verifyArr = ref<(keyof typeof form)[]>([])
const verifyForm = (list: { label: keyof typeof form, msg: string }[]) => {
    verifyArr.value = []

    list.forEach((item) => {
        if (!form[item.label]?.trim()) {
            verifyArr.value.push(item.label)
            ElMessage.error(item.msg)
        }
    })
    return verifyArr.value.length === 0
}
const msgCode = $lang('验证码错误', 'Verification code error') || ''
const msgSuccess = $lang('提交成功', 'Submit success') || ''

const verifyList: { label: keyof typeof form, msg: string }[] = [
    {
        label: 'name',
        msg: $lang('请输入姓名', 'Please enter your name') || '',
    },
    {
        label: 'phone',
        msg: $lang('请输入电话', 'Please enter your phone') || '',
    },
    {
        label: 'email',
        msg: $lang('请输入邮箱', 'Please enter your email') || '',
    },
    {
        label: 'address',
        msg: $lang('请输入所在地区', 'Please enter your address') || '',
    },
    {
        label: 'note',
        msg: $lang('请输入备注', 'Please enter your remark') || '',
    },
]

const onSubmit = async () => {
    if (disabled.value) return false

    const isVerify = verifyForm(verifyList)

    if (form.verifyCode?.trim()?.toLowerCase() !== code.value.toLowerCase()) return ElMessage.error(msgCode)
    if (!isVerify) return false
    disabled.value = true
    const { data, error } = await useCustomFetch<{ code: number }>('/api/page/message', {
        params: {
            title: form.name?.trim() ?? '',
            phone: form.phone?.trim() ?? '',
            email: form.email?.trim() ?? '',
            address: form.address?.trim() ?? '',
            content: form.note?.trim() ?? '',
        },
    })
    disabled.value = false
    if (error.value) return false
    if (data.value?.code === 200) {
        ElMessage.success(msgSuccess)
        form.name = ''
        form.phone = ''
        form.email = ''
        form.address = ''
        form.note = ''
        form.verifyCode = ''
        setVerifyCode()
    }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/css/message.css');
</style>
