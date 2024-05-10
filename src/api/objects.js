import request from '@/utils/request'

export function FetchObjectList(param) {
    return request(
        {
            url: '/objects/' + param.bucket,
            method: 'get',
        }
    )
}

export function UploadObject(param) {
    console.log(param.hash)
    return request(
        {
            url: '/objects/' + param.bucketName + '/' + param.objectName,
            method: 'put',
            data: param.data,
            headers: {
                'TINY_OSS_CONTENT_SIZE': param.size,
                'TINY_OSS_CONTENT_HASH': param.hash,
            },
            transformRequest: [(data) => data],
            timeout: 0,
        }
    )
}

export function DownloadObject(param) {
    return request(
        {
            url: '/objects/' + param.bucketName + '/' + param.objectName,
            method: 'get',
            params: {
                'version': param.version,
            },
            responseType: 'blob',
            timeout: 0,
        }
    )
}