import { createRouter, defineEventHandler, useBase } from 'h3'
import { uploadFile } from '~/server/controller/common'

const router = createRouter()

/**
 * 文件上传
 */
router.use('/upload', defineEventHandler(async (event) => {
    return uploadFile(event)
}))

/**
 * 接口测试
 */
router.use('/test', defineEventHandler(async (event) => {
    return 123
}))

export default useBase('/api/common', router.handler)
