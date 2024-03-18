<template>
    <div class="width_box goods-classify relative z-10 px30px! <md:px20px!">
        <div class="overflow-x-clip">
            <!-- :slides-per-view="5" -->
            <Swiper class="" :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
                :slides-per-view="5" :space-between="30" :navigation="navigation" :breakpoints="breakpoints">
                <SwiperSlide class="type_list" :class="setClassifyName(0)">
                    <NuxtLinkLocale :to="linkGoodsList({ query: {}, relate: false, url: true })" class="type_name">
                        {{ $lang('首页', 'Home') }}
                    </NuxtLinkLocale>
                </SwiperSlide>
                <SwiperSlide v-for="(item, idx) in classifyList" :key="idx" class="type_list"
                    :class="setClassifyName(item.id)">
                    <NuxtLinkLocale class="type_name line-clamp-1"
                        :to="linkGoodsList({ query: { cid: item.id, page: 1 }, relate: false, url: true })">
                        {{ $lang(item.title, item.title_en) }}
                    </NuxtLinkLocale>
                    <template v-if="item.children?.length">
                        <figure class="type_icon">
                            <i class="i-ep-caret-bottom main-color block text-24px" />
                        </figure>
                        <ul class="type_subclass">
                            <li v-for="sub in item.children" :key="sub.id">
                                <NuxtLinkLocale class="cursor-pointer"
                                    :to="linkGoodsList({ query: { cid: sub.id, page: 1 }, relate: false, url: true })">
                                    {{ $lang(sub.title, sub.title_en) }}
                                </NuxtLinkLocale>
                            </li>
                        </ul>
                    </template>
                </SwiperSlide>
            </Swiper>
        </div>

        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
    </div>
</template>

<script lang="ts" setup>
// import { defineComponent } from 'vue'

// const emits = defineEmits<{
//     // <eventName>: <expected arguments>
//     change: []
// }>()
const breakpoints = ref({
    350: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    750: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    900: {
        slidesPerView: 3,
        spaceBetween: 15,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    1255: {
        slidesPerView: 5,
        spaceBetween: 30,
    },
})

const navigation = {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
}

const classifyList = await useGoodsClassifyState().getClassify()

const setClassifyName = (id: number) => {
    const route = useRoute()
    const query = route.query as GoodsListParamsQuery
    const cid = ref(query.cid) // 当前分类id
    if (cid.value) {
        const list = getParentNode(classifyList.value, Number(cid.value), 'id')
        // console.log('list :>> ', list)
        return list[0].id === id ? 'type_active' : ''
    } else {
        return id === 0 ? 'type_active' : ''
    }
}
</script>

<style lang="scss" scoped>
.goods-classify {
    --swiper-navigation-size: 24px;
    @media screen and (max-width: 768px) {
        --swiper-navigation-size: 18px;
        --swiper-navigation-sides-offset:0px;
    }
    :deep(.swiper) {
        overflow: unset;
    }
}
</style>
