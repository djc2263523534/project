import { request } from "./request";


export function getLogin(params) {
    return request({
        url: '/login',
        params,
    })
}


export function getHomeList() {
    return request({
        url: '/menus'
    })
}

export function getUsersList(params) {
    return request({
        url: '/users',
        params
    })
}

export function getStatus(id, flat) {
    return request(`/users/${id}/state/${flat}`)

}

export function addUserInfo(params) {
    return request({
        url: '/users',
        params,
    })
}