<template>
    <section>
        <CiSubMenu />
        <div class="width_box text-center mt30px!">
            <div class="min-h-300px pb50px">
                <img :src="data?.img || ''" alt="">
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

definePageMeta({
    layout: 'home',
})

const { data } = await useCustomFetch<Prisma.OtherMaxAggregateOutputType>('/api/page/other', {
    params: {
        type: 'organization',
    },
})
</script>

<style lang="scss" scoped></style>
