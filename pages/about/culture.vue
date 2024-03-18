<template>
    <section>
        <CiSubMenu />
        <article class="width_box mt30px!">
            <div class="pb50px" v-html="$lang(data?.content, data?.content_en)" />
            <!-- 列表 -->
            <!-- <div class="lb_list">
                    <h2 class="lb_title">
                        鹰测优势
                    </h2>
                    <ul class="lb_ul">
                        <li>鹰测技术核心研发团队由符美安总工程师带领, 拥有近二十年研发经验, 并能根据客户需求研发定制;</li>
                        <li>国内较早研发钳形接地电阻测试仪, 高压钳形电流表, 非接触相序表, 电能质量分析仪等, 其专利技术被同行企业广泛应用;</li>
                        <li>发明性应用双层柔性线圈测量高压大电流，将柔性线圈内置于高压钩表内，量程达到20000A, 可测线径Φ168*245mm;</li>
                    </ul>
                </div>
                <div class="lb_list">
                    <h2 class="lb_title">
                        企业口号
                    </h2>
                    <ul class="lb_ul">
                        <li>精准检测有鹰测</li>
                    </ul>
                </div>
                <div class="lb_list">
                    <h2 class="lb_title">
                        服务、市场拓展和未来展望
                    </h2>
                    <ul class="lb_ul">
                        <li>鹰测技术稳步发展, 公司服务的市场遍布全球, 主要市场有美国, 巴西, 哥伦比亚, 智利, 英国, 法国, 泰国, 菲律宾以及国内共计上千家优质客户;</li>
                        <li>鹰测技术不断拓展市场, 通过定期参加世界各地行业展会, 了解客户需求和市场动向, 更好的建立鹰测全球化品牌网络;</li>
                    </ul>
                </div> -->
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
        type: 'culture',
    },
})
</script>

<style lang="scss" scoped></style>
