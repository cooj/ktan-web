<template>
    <nav class="sort_module">
        <NuxtLink v-for="(item, index) in activeMenu?.children" :key="item.id" :to="item.href || ''"
            :class="{ sort_active: $route.path === item.href || props.value === index + 1 }">
            {{ $lang(item.title, item.title_en) }}
        </NuxtLink>
    </nav>
</template>

<script lang="ts" setup>
const props = defineProps<{
    type?: 'news'
    value?: number
}>()

const { activeMenu, menuList } = useMenuState()

// onBeforeRouteUpdate(() => {
//     console.log('activeMenu.value :>> ', activeMenu.value)
// })
</script>

<style></style>

<style lang="scss" scoped></style>
