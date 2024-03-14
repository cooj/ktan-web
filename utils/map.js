export function initMap(id, title, address) {
    if (!address) return

    window.BMap_loadScriptTime = (new Date()).getTime()

    // 创建 <script> 元素并设置其属性
    const script = document.createElement('script')
    script.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=AVmS2wD2ZgzGaU6euB2fwlr9ym3GyWnT&services=&t=20240108120844' // 指定外部 JS 文件路径
    document.head.appendChild(script) // 将 <script> 元素添加到 HTML 头部
    setTimeout(() => {
        const map = new BMap.Map(id)
        // 创建地址解析器实例
        const myGeo = new BMap.Geocoder()
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, (point) => {
            if (point) {
                // console.log(point)
                // map.centerAndZoom(point, 16)
                // map.addOverlay(new BMap.Marker(point))

                // const point = new BMap.Point('113.344897', '23.307565')
                const points = new BMap.Point(point.lng, point.lat)
                map.centerAndZoom(points, 18)

                const content = `<h2 style=\'font-size: 1rem;margin-bottom:.3125rem;\'>${title}</h2><p>${address}</p>` // 设置信息框内容
                const infoWindow = new BMap.InfoWindow(content)
                map.openInfoWindow(infoWindow, map.getCenter())
                const zoom = { type: BMAP_NAVIGATION_CONTROL_LARGE }
                map.addControl(new BMap.NavigationControl(zoom))
                map.enableScrollWheelZoom(true)
            } else {
                alert('您选择地址没有解析到结果!')
            }
        }, '北京市')
    }, 1500)
}
