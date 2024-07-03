import request from '@/utils/request'

export function page(data) {
    return request({
        url:'/menu-master/list',
        method:'GET',
        params:data
    })
}

export function givePer(data) {
    return request({
        url:'/menu-permission-content/permission',
        method:'POST',
        data:data
    })
}

export function getPer(userId) {
    return request({
        url:`/menu-permission-content/start/permission/${userId}`,
        method:'GET',
    })
}

export function getParentMenuList() {
    return request({
        url:'/menu-master/parentMenuList',
        method:'GET',
    })
}

export function addMenu(data) {
    return request({
        url:'/menu-master/add',
        method:'Post',
        data:data
    })
}
