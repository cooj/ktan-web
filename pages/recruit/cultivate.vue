<template>
    <section>
        <CiSubMenu />
        <div class="width_box mt40px!">
            <h3 class="mb10px text-18px font-bold">
                {{ $lang(data?.title, data?.title_en) }}
            </h3>
            <div class="min-h-300px pb50px" v-html="$lang(data?.content, data?.content_en)" />
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
        type: 'recruit-cultivate',
    },
})
</script>

<style lang="scss" scoped></style>
