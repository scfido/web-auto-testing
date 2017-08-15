let fetch = require('isomorphic-fetch')
let encodeUrl = require('encodeurl')

/*
用法：




*/

const webApi = {

    //检查Http请求返回的 Status。如果是401则要求用户登录。
    checkHttpStatus: (response) => {

        let error = new Error(response.statusText)

        if (response.status >= 200 && response.status < 300) {
            return response
        }
        else if (response.status == 400) {              //无效的请求，提交数据模型验证失败。
            error.type = "validation"              //提交数据模型验证失败。
        }
        else if (response.status == 401) {
            error.type = "unauthorized"    //需要用户登录。
        }
        else if (response.status == 403) {
            error.type = "forbidden"      //没有权限。
        }
        else if (response.status == 500) {
            error.type = "server"        //服务器内部错误
        }
        else {
            error.type = "unknown"       //其它错误
        }

        error.response = response

        throw error
    },

    //检查WebApi返回状态。
    checkApiResult: (json) => {
        return json;
    },

    //从服务器获取数据。
    get: (url) => {
        url = encodeUrl(url);
        return fetch(url, {
            method: "GET",
            headers: {
                "Connection": "Keep-Alive"
            }
        })
            .then(response => webApi.checkHttpStatus(response))     //检查Http请求返回的 Status
            .then(response => response.json())                        //转换返回值为json对象
            .then(webApi.checkApiResult)                            //检查API返回状态是否有错误

    },

    //创建新产品
    post: (url, data) => {
        url = encodeUrl(url);
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Connection": "Keep-Alive"
            },
            body: JSON.stringify(data)
        })
            .then(response => webApi.checkHttpStatus(response))          //检查Http请求返回的 Status
            .then(response => response.json())                        //转换返回值为json对象
            .then(webApi.checkApiResult)                            //检查API返回状态是否有错误
    },


    //更新
    put: (url, data) => {
        url = encodeUrl(url);
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Connection": "Keep-Alive"
            },
            body: JSON.stringify(data)
        })
            .then(response => webApi.checkHttpStatus(response))          //检查Http请求返回的 Status
            .then(response => response.json())                        //转换返回值为json对象
            .then(webApi.checkApiResult)                            //检查API返回状态是否有错误
    },

    //删除
    del: (url, data) => {
        url = encodeUrl(url);
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Connection": "Keep-Alive"
            },
            body: JSON.stringify(data)
        })
            .then(response => webApi.checkHttpStatus(response))          //检查Http请求返回的 Status
            .then(response => response.json())                        //转换返回值为json对象
            .then(webApi.checkApiResult)                            //检查API返回状态是否有错误
    }
}

module.exports = webApi