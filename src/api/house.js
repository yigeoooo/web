import request from '@/utils/request'

export function addHouse(data) {
    return request({
        url:'/house-master/insert',
        method:'POST',
        data:data
    })
}

export function select(data) {
    return request({
        url:'/house-master/page',
        method:'GET',
        params:data
    })
}
