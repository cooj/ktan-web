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
    const allList = useState<IMenuListResponse[]>('allMenu', () => [])
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
            allList.value = data.value
            menuList.value = filterTreeList(data.value, 1, 'status', 'children')
        } else {
            ElMessage.error('网络错误')
        }
        return menuList
    }

    // 一级菜单内容
    const activeMenu = computed<IMenuListResponse | undefined>(() => {
        // [id].vue 的文件，不能直接拿route.path来进行比较
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

        return allList.value.find(item => item.href === url || `/en${item.href}` === url)

        // return menuList.value.find(item => item.href === url)
    })

    // 当前页菜单内容
    const nowMenu = computed<IMenuListResponse | undefined>(() => {
        // [id].vue 的文件，不能直接拿route.path来进行比较
        const path = route.matched[0].path.split('/:')[0]

        return findTreeNodeItem(allList.value, path, 'href', 'children')
    })

    return {
        nowMenu,
        activeMenu,
        allList,
        menuList,
        getMenuList,
    }
}
