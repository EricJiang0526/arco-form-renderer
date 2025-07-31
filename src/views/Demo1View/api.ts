import axios from 'axios'
import qs from 'qs'

export default {
  getSjzdxListByBmList(params: Record<string, string[]>) {
    return axios.get('/webGateway/apiCommon/1.0/sjzdwbjk/getSjzdxListByBmList', {
      params,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    })
  },
}
