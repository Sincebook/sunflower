import {get, post} from './index'
export function getAllJOb(params) {
    return get('/api/job/findAll', params)
  }