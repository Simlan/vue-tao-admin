import axios from '@/utils/request';

export function getApiListApi(params) {
  return axios.post({
    url: '/api/getApiList',
    data: params
  }).then((res) => {
    return res
  })
}