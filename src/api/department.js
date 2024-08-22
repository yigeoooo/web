import request from '@/utils/request'

export function insert(data) {
    return request({
        url:'/department-master/add',
        method:'POST',
        data:data
    })
}

export function page(data) {
    return request({
        url:'/department-master/page',
        method:'GET',
        params:data
    })
}

export function remove(departmentId) {
    return request({
        url:`/department-master/delete/${departmentId}`,
        method:'DELETE',
    })
}

export function getOptions() {
    return request({
        url:`/department-master/options`,
        method:'GET',
    })
}

export function editDepartment(data) {
    return request({
        url:`/department-master/edit`,
        method:'PATCH',
        data:data
    })
}
