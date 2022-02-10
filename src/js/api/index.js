if (localStorage.getItem('token')) {
    let token = localStorage.getItem('token')
    bui.config.ajax = { headers: {
        token
    }}
}

const get = (url, data) => {
    return bui.ajax({
        url,
        data,
        method:'get'
    })
}

const post = (url, data) => {
    return bui.ajax({
        url,
        data,
        method:'post'
    })
}