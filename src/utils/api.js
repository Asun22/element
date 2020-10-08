import request from './request'

// get请求方式
export function gets (url,data) {
    return request.get(url,{
        params:data
    })
}

// post请求方式
export function posts (url,data) {
    return request.post(url,data)
}

// 当前城市请求地址接口
export function ajaxCity(type) {
    return gets(`/v1/cities?type=${type}`)
}

export function ajaxWode(Null) {
    return gets(`/v1/user?user_id=${Null}`)
}
export function ajaxWm(type) {
    return gets(`/v2/index_entry?geohash=${type}`)
}
// export function ajaxSj(type) {
//     return gets(`/shopping/restaurant/1?statistics=${type}`)
// }
// 获取验证码
export function ajaxCode() {
    return posts(`/v1/captchas`)
}


// 登录
export function ajaxLogin(data) {
    return posts(`/v2/login`,data)
}

