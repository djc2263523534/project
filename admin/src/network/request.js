import axios from 'axios'


export function request(config) {

    const instancel = axios.create({
        baseURL: 'http://127.0.0.1:8888/api/private/v1/',
        timeout: 5000
    })

    instancel.interceptors.request.use(config => {

        config.headers.Authorization = sessionStorage.getItem('token')


        return config
    })

    return instancel(config)
}

export function setRequest(config) {

    const instancel = axios.create({
        baseURL: 'http://127.0.0.1:8888/api/private/v1/',
        timeout: 5000
    })

    instancel.interceptors.request.use(config => {

        config.headers.Authorization = sessionStorage.getItem('token')


        return config
    })

    return instancel
}