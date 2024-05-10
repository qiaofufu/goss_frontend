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
            method: 'get',
        }
    )
}