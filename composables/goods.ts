// 获取商品分类
export const useGoodsClassifyState = () => {
    // const route = useRoute()
    const classify = useState<IClassifyListResponse[]>('classify', () => [])

    const getClassify = async (update?: boolean) => {
        if (!update && classify.value.length) return classify
        const { data, error } = await useCustomFetch<{ code: number, data: { list: IClassifyListResponse[] } }>('/api/page/classify', {
            method: 'post',
            body: {
                // isP
                // type: 1,
            },
        })

        // 接口发生错误时
        if (error.value) return classify
        // await wait(800)
        if (data.value?.code === 200) {
            classify.value = data.value.data.list
        } else {
            ElMessage.error('网络错误')
        }
        return classify
    }

    return {
        classify,
        getClassify,
    }
}
