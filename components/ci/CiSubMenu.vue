<template>
    <nav class="sort_module">
        <NuxtLink v-for="item in activeMenu?.children" :key="item.id" :to="item.href || ''"
            :class="{ sort_active: $route.path === item.href }">
            {{ $lang(item.title, item.title_en) }}
        </NuxtLink>
    </nav>
</template>

<script lang="ts" setup>
const { activeMenu, menuList } = useMenuState()
// onBeforeRouteUpdate(() => {
//     console.log('activeMenu.value :>> ', activeMenu.value)
// })
</script>

<style></style>

<style lang="scss" scoped></style>
