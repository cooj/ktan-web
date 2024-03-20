<template>
    <main class="main-box">
        <LayoutHomeHeader />
        <LayoutHomeBanner />
        <slot />
        <LayoutHomeFooter />
        <el-backtop :right="25" :bottom="30" />
    </main>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
// .main-box{
//     width:100%;
//     min-width: 1200px;
// }
</style>
