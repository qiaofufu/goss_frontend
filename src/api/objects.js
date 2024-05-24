import request from '@/utils/request'

export function FetchObjectList(param) {
  return request(
    {
      url: '/objects/' + param.bucket,
      method: 'get'
    }
  )
}

export function UploadObject(param) {
  return request(
    {
      url: '/objects/' + param.bucketName,
      method: 'put',
      data: param.data,
      headers: {
        'TINY_OSS_CONTENT_HASH': param.hash,
        'Content-Type': 'multipart/form-data'
      },
      timeout: 0
    }
  )
}

export function DownloadObject(param) {
  return request(
    {
      url: '/objects/' + param.bucketName + '/' + param.objectName,
      method: 'get',
      params: {
        'version': param.version
      },
      responseType: 'blob',
      timeout: 0
    }
  )
}

export function DeleteObject(param) {
  return request({
    url: '/objects/' + param.bucketName + '/' + param.objectName,
    method: 'delete'
  })
}