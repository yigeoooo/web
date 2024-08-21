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

export function editHouse(data) {
    return request({
        url:'/house-master/edit',
        method:'PATCH',
        data:data
    })
}

export function editHouseState(data) {
    return request({
        url:'/house-master/editState',
        method:'GET',
        params:data
    })
}

export function clean(data) {
    return request({
        url:'/house-master/clean',
        method:'GET',
        params:data
    })
}

export function finish(data) {
    return request({
        url:'/house-master/finish',
        method:'GET',
        params:data
    })
}
