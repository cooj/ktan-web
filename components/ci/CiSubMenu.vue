<template>
    <nav class="sort_module">
        <ClientOnly>
            <NuxtLinkLocale v-for="(item, index) in activeMenu?.children?.filter(i => i.status)" :key="item.id"
                :to="item.href || ''" :class="{ sort_active: setActiveClassName(item.href || '', index) }">
                {{ $lang(item.title, item.title_en) }}
            </NuxtLinkLocale>
        </ClientOnly>
    </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
    type?: 'news'
    value?: number
}>()

const { activeMenu, menuList } = useMenuState()

const route = useRoute()
const setActiveClassName = (url: string, index: number) => {
    if (route.path.startsWith('/en')) {
        return route.path === `/en${url}`
    } else {
        return route.path === url || props.value === index + 1
    }
}
</script>

<style></style>

<style lang="scss" scoped></style>
