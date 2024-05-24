import request from '@/utils/request'

export function CreateBuckets(param) {
  return request(
    {
      url: '/buckets',
      method: 'post',
      data: param
    }
  )
}

export function ListBuckets() {
  return request(
    {
      url: '/buckets',
      method: 'get'
    }
  )
}

export function DeleteBucket(param) {
  return request({
    url: '/buckets/' + param.bucketName,
    method: 'delete'
  })
}

export function GetBucket(param) {
  return request(
    {
      url: '/buckets/' + param.bucketName,
      method: 'get'
    }
  )
}

export function UpdateBucket(param) {
  return request(
    {
      url: '/buckets/' + param.bucketName,
      method: 'put',
      data: param.data
    }
  )
}