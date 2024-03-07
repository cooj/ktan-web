<template>
    <el-dropdown>
        <span class="co-main-color flex items-center">
            <!-- {{ localeProperties.name }}
            <i class="i-ep-arrow-down" /> -->
            <i class="i-carbon-language text-28px" />
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in (locales as LocaleObject[])" :key="item.code"
                    :class="{ on: localeProperties.code === item.code }" @click="changeLanguage(item.code)">
                    {{ item.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

// import BaseFooter from './components/BaseFooter.vue'
// import BaseHeader from './components/BaseHeader.vue'

// // import BaseMenu from './components/BaseMenu.vue'
// import BaseTop from './components/BaseTop.vue'

// if (process.client) console.log(useI18n())

const { locale, locales, localeProperties, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// const availableLocales = computed(() => {
//     console.log(locales.value)
//     return (locales.value as LocaleObject[]).filter(i => i.code !== locale.value)
// })

//
const changeLanguage = async (code: string) => {
    const n = switchLocalePath(code)
    // console.log(n)
    navigateTo(n)
}
</script>

<style lang="scss" scoped>
.on {
    --el-dropdown-menuItem-hover-fill: var(--el-color-primary-light-9);
    --el-dropdown-menuItem-hover-color: var(--el-color-primary);
}
</style>
