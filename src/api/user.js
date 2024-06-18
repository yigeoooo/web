import request from '@/utils/request'

export function userLogin(data) {
    return request({
        url:'/sys/login',
        method:'POST',
        data:data
    })
}

export function getPage(data) {
    return request({
        url:'/system/user/page/page',
        method:'GET',
        params:data
    })
}

