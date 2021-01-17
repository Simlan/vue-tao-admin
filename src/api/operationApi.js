import axios from '@/utils/request';

export function getOperationApi(params) {
  return axios.get({
    url: '/sysOperationRecord/getSysOperationRecordList',
    data: params
  }).then((res) => {
    return res
  })
}