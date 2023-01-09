const get = (url, data) => {
    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token')
        bui.config.ajax = {
            headers: {
                token
            }
        }
    }
    return bui.ajax({
        url,
        data,
        method: 'get'
    })
}

const post = (url, data) => {
    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token')
        bui.config.ajax = {
            headers: {
                token
            }
        }
    }
    return bui.ajax({
        url,
        data,
        method: 'post'
    })
}