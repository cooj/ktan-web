<template>
    <section>
        <!-- 分类 -->
        <CiSubMenu />
        <article class="width_box explain_module">
            <div class="pb50px">
                <div class="lh-32px">
                    <strong>{{ $lang(data?.title, data?.title_en) }}</strong>
                    <br>
                    <strong>{{ $lang(data?.subtitle, data?.subtitle_en) }}</strong>
                </div>
                <div v-html="$lang(data?.content, data?.content_en)" />
            </div>
        </article>
    </section>
</template>

<script lang="ts" setup>
import type { Prisma } from '@prisma/client'

definePageMeta({
    layout: 'home',
})

const { data } = await useCustomFetch<Prisma.OtherMaxAggregateOutputType>('/api/page/other', {
    params: {
        type: 'service-mend',
    },
})
</script>

<style lang="scss" scoped>
.explain_module{
    margin-top: 25px;
}
</style>
