import request from '@/utils/request'

export function addOrder(data) {
    return request({
        url:'/orderMaster/insert',
        method:'Post',
        data:data
    })
}
