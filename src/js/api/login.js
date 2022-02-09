import {get, post} from './index'
export function getAllJOb(params) {
    return $axios.get('/api/job/findAll', params)
  }