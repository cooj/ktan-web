<template>
    <div class="width_box goods-classify relative px30px!">
        <div class="overflow-x-clip">
            <!-- :slides-per-view="5" -->
            <Swiper class="" :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
                :slides-per-view="5" :space-between="30" :navigation="navigation">
                <SwiperSlide class="type_list" :class="setClassifyName(0)" @click="linkGoodsList({ query: {} })">
                    <NuxtLink class="type_name">
                        {{ $lang('首页', 'Home') }}
                    </NuxtLink>
                </SwiperSlide>
                <SwiperSlide v-for="(item, idx) in classifyList" :key="idx" class="type_list"
                    :class="setClassifyName(item.id)">
                    <NuxtLink class="type_name line-clamp-1"
                        @click="linkGoodsList({ query: { cid: item.id, page: 1 }, relate: false })">
                        {{ $lang(item.title, item.title_en) }}
                    </NuxtLink>
                    <template v-if="item.children?.length">
                        <figure class="type_icon">
                            <i class="i-ep-caret-bottom main-color block text-24px" />
                        </figure>
                        <ul class="type_subclass">
                            <li v-for="sub in item.children" :key="sub.id">
                                <NuxtLink class="cursor-pointer"
                                    @click="linkGoodsList({ query: { cid: sub.id, page: 1 }, relate: false })">
                                    {{ $lang(sub.title, sub.title_en) }}
                                </NuxtLink>
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
import { defineComponent } from 'vue'

const emits = defineEmits<{
    // <eventName>: <expected arguments>
    change: []
}>()

const navigation = {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
}

const classifyList = await useGoodsClassifyState().getClassify()

const cid = useRouteQuery('cid', '') // 当前分类id

const setClassifyName = (id: number) => {
    if (cid.value) {
        const list = getParentNode(classifyList.value, Number(cid.value), 'id')
        // console.log('list :>> ', list)
        return list[0].id === id ? 'type_active' : ''
    } else {
        return id === 0 ? 'type_active' : ''
    }
}

/**
 * 商品页面参数
 */
declare interface GoodsListParams {
    query: GoodsListParamsQuery // 参数
    relate?: boolean // 是否携带浏览器地址上的参数
    url?: boolean // 返回地址的形式
}

declare interface GoodsListParamsQuery {
    page?: string | number // 关键字
    cid?: string | number // 商品分类id   类别
    // bid?: string | number // 商品品牌id
}

/**
 * 进入商品页面方法
 */
const linkGoodsList = async (params: GoodsListParams) => {
    const url = '/product'
    const route = useRoute()
    const query = route.query as GoodsListParamsQuery

    const data = params.query
    if (params.relate) { // 获取
        // console.log('Number.isNaN(Number(query.cid)) :>> ', Number.isNaN(Number(query.cid)))
        // keyword不存在params对象里面时,并且路由里面存在keyword字段时
        if (!('keyword' in params.query) && 'keyword' in query) data.page = query.page

        // c不存在params对象里面时,并且路由里面存在数字类型cid时
        if (!('cid' in params.query) && !Number.isNaN(Number(query.cid))) {
            data.cid = Number(query.cid)
        }

        // c不存在params对象里面时,并且路由里面存在数字类型cid时
        // if (!('bid' in params.query) && 'bid' in query) data.bid = query.bid
    }

    // 返回地址的形式, /goods/list?cid=1
    if (params.url) {
        const list = Object.keys(data).map(i => `${i}=${encodeURIComponent(data[i as keyof GoodsListParamsQuery] || '')}`)
        return list.length > 0 ? `${url}?${list.join('&')}` : url
    } else {
        await navigateTo({
            path: url,
            query: data as any,
            // replace: true,
        })
        // initData()
        emits('change')
        return ''
    }

    // return navigateTo({
    //   path: '/goods/list',
    //   query: {
    //     page: 1,
    //     sort: 'asc',
    //   },
    // })
}
</script>

<style lang="scss" scoped></style>
