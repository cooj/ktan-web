// 获取系统信息
export const useSystemState = () => {
    const system = useState<ISystemInfoResponse | undefined>('system')

    const getSystemInfo = async (update?: boolean) => {
        if (system.value) return system
        const { data, error } = await useCustomFetch<ISystemInfoResponse>('/api/page/get_system')

        // 接口发生错误时
        if (error.value) return system
        // await wait(800)
        if (data.value) {
            system.value = data.value
        } else {
            ElMessage.error('网络错误')
        }
        return system
    }

    return {
        system,
        getSystemInfo,
    }
}

export const useMenuState = () => {
    const route = useRoute()
    const menuList = useState<IMenuListResponse[]>('menu', () => [])

    const getMenuList = async (update?: boolean) => {
        if (menuList.value.length) return menuList
        const { data, error } = await useCustomFetch<IMenuListResponse[]>('/api/page/get_menu', {
            method: 'post',
            body: {
                status: 1,
            },
        })

        // 接口发生错误时
        if (error.value) return menuList
        // await wait(800)
        if (data.value) {
            menuList.value = data.value
        } else {
            ElMessage.error('网络错误')
        }
        return menuList
    }

    // 当前页菜单内容
    const activeMenu = computed<IMenuListResponse | undefined>(() => {
        // [id].vue 的问价，不能直接拿route.path来进行比较
        const path = route.matched[0].path.split('/:')[0]

        let url = ''

        const strArr = path.split('/')
        if (path === '/' || path === '/en') {
            url = '/'
        } else if (path.startsWith('/en')) {
            if (strArr[2]) url = `/${strArr[2]}`
        } else {
            if (strArr[1]) url = `/${strArr[1]}`
        }

        // console.log(url) // 输出结果

        return menuList.value.find(item => item.href === url || `/en${item.href}` === url)

        // return menuList.value.find(item => item.href === url)
    })

    return {
        activeMenu,
        menuList,
        getMenuList,
    }
}
