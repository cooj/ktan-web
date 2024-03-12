/**
 * 根据当前一级id(或字段)查找上级所有的节点内容
 * @param classifyList 嵌套数组
 * @param val 需要查找的值
 * @param key 查找值对应的键值，默认为id
 * @param children 子类的键值，默认children
 * @returns any[]
 */
export function getParentNode<T = any>(classifyList: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T[] {
    const temp: any[] = []
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            // 找到值对应的那一项，追加进去
            if (item[key] === val) temp.push(item)
            if (item[children]) {
                const data1 = item[children].find((item1: any) => {
                    return item1[key] === id
                })
                if (data1) {
                    temp.unshift(item) // 数组前面追加进去
                    forFn(classifyList, item[key])
                    break
                } else {
                    forFn(item[children], id)
                }
            }
        }
    }
    forFn(classifyList, val)
    return temp
}
