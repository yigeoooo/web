import request from '@/utils/request'

export function page(data) {
    return request({
        url:'/role-master/page',
        method:'GET',
        params:data
    })
}

export function insert(data) {
    return request({
        url:'/role-master/add',
        method:'POST',
        data:data
    })
}

export function remove(roleId) {
    return request({
        url:`/role-master/delete/${roleId}`,
        method:'DELETE',
    })
}

export function getRoleOptions(departmentId) {
    return request({
        url:`/role-master/option/${departmentId}`,
        method:'GET',
    })
}
