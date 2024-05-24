import request from '@/utils/request'

export function Login(param) {
  return request(
    {
      url: '/user/login',
      method: 'post',
      data: param
    }
  )
}