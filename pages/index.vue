<template>
    <div class="min-h300px">
        <Suspense>
            <ClientOnly>
                <HomeMain />
            </ClientOnly>
            <template #fallback>
                <div class="min-h500px">
                    <span animate-pulse>Loading...</span>
                </div>
            </template>
        </Suspense>
        <!-- <InputEntry />
    <div class="a">
      {{ name }}
      <span>-123456</span>
    </div> -->
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'home',
})

console.warn('cooj')
console.warn('ccso')
console.warn('ccxe')
console.warn('ccvw')
console.warn('asmo')
</script>

<style lang="scss" scoped></style>
