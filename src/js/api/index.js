export const get = (url, data) => {
    return bui.ajax({
        url,
        data,
        method:'get'
    })
}
export const post = (url, data) => {
    let formData = new FormData()
    for (let key in data) {
      formData.append(key, data[key])
    }
    return bui.ajax({
        url,
        data: formData,
        method:'post'
    })
}