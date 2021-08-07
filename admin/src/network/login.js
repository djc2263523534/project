import { request } from "./request";


export function getLogin(params) {
    return request({
        url: '/login',
        params,
    })
}


export function getHomeList() {
    return request({
        url: 'menus'
    })
}