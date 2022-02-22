function banners(params) {
    return get('/api/banner/findAll', params)
}

function getClasses(params) {
    return get('/api/classes/findAll', params)
}

function findByClassesId(params) {
    return get('/api/lesson/findByClassesId', params)
}