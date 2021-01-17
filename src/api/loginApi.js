import axios from '@/utils/request';

export function loginApi(params) {
  return axios.post({
    url: '/base/login',
    data: params
  }).then((res) => {
    return res
  })
}

export function getCaptchaApi(params) {
  return axios.post({
    url: '/base/captcha',
    data: params
  }).then((res) => {
    return res
  })
}