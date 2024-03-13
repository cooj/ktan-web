// 获取系统信息
export const useSystemState = () => {
    const system = useState<ISystemInfoResponse | undefined>('system')

    const getSystemInfo = async (update?: boolean) => {
        if (system.value) return system
        const { data, error } = await useCustomFetch<ISystemInfoResponse>('/api/page/get_system')
        // console.log(data.value?.code)
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

        // if (path.startsWith('/en')) {
        //     const secondSlashIndex = path.indexOf('/', 4) // 从第5个字符开始查找第二个斜杠的位置
        //     if (secondSlashIndex !== -1) {
        //         url = path.substring(0, secondSlashIndex) // 返回/en开头到第二个斜杠之间的内容（不包括第二个斜杠）
        //     } else {
        //         url = path // 如果没有第二个斜杠，则返回整个字符串
        //     }
        // } else {
        //     const firstSlashIndex = path.indexOf('/', 1) // 从第二个字符开始查找第一个斜杠的位置
        //     if (firstSlashIndex !== -1) {
        //         url = path.substring(0, firstSlashIndex) // 返回第一个斜杠之前的内容（不包括斜杠）
        //     } else {
        //         url = path // 如果没有斜杠，则返回整个字符串
        //     }
        // }

        // if (path.startsWith('/en')) {
        //     const secondSlashIndex = path.indexOf('/', 4) // 从第5个字符开始查找第二个斜杠的位置
        //     if (secondSlashIndex !== -1) {
        //         url = path.substring(secondSlashIndex) // 返回第二个斜杠及后面的内容
        //     } else {
        //         url = '' // 如果没有第二个斜杠，则返回空字符串
        //     }
        // } else {
        //     const firstSlashIndex = path.indexOf('/') // 查找第一个斜杠的位置
        //     if (firstSlashIndex !== -1) {
        //         url = path.substring(firstSlashIndex) // 返回第一个斜杠及后面的内容
        //     } else {
        //         url = '' // 如果没有斜杠，则返回空字符串
        //     }
        // }

        const strArr = path.split('/')
        if (path === '/' || path === '/en') {
            url = '/'
        } else if (path.startsWith('/en')) {
            // console.log(strArr)
            if (strArr[2]) url = `/${strArr[2]}`
        } else {
            if (strArr[1]) url = `/${strArr[1]}`
        }

        console.log(url) // 输出结果

        // console.log(path)
        return menuList.value.find(item => item.href === url || `/en${item.href}` === url)

        // return menuList.value.find(item => item.href === url)
    })

    return {
        activeMenu,
        menuList,
        getMenuList,
    }
}
