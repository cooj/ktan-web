<template>
    <el-config-provider :locale="locale">
        <VitePwaManifest />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import '~/assets/scss/default.scss'
import '~/assets/css/header.css'
import { baiduUrl } from './config/constant'

// import '@unocss/reset/tailwind.css'
// import '~/assets/scss/app.scss'

// const locale = ref(zhCn)
const systemInfo = await useSystemState().getSystemInfo()

const { locale: lo } = useI18n()

const locale = computed(() => {
    return lo.value === 'en' ? en : zhCn
})

const runtimeConfig = useRuntimeConfig()
const HOST = runtimeConfig.public.upload.host

useHead({
    title: systemInfo.value?.title,
    meta: [
        { name: 'description', content: systemInfo.value?.description },
        { name: 'keywords', content: systemInfo.value?.keyword },
    ],
    link: [
        { rel: 'icon', href: systemInfo.value?.icon },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Organization',
                'name': systemInfo.value?.company,
                'url': HOST,
                'logo': systemInfo.value?.logo,
            }),
        },
        { innerHTML: 'var _hmt = _hmt || [];' },
        {
            type: 'text/javascript',
            src: baiduUrl,
            // async: true,
            // defer: true,
            // crossorigin: 'anonymous',
            // referrerpolicy: 'no-referrer-when-downgrade',
        },
    ],
    // bodyAttrs: {
    //     class: 'test',
    // },
    // script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})
</script>

<style lang="scss">
html,
body,
#__nuxt {
    // height: 100vh;
    margin: 0;
    padding: 0;
    // background: $bgColor;
}

html.dark {
    background: #333;
    color: white;
}
</style>
