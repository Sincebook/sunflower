function banners(params) {
    return get('/api/banner/findAll', params)
}
function getClasses(params) {
    return get('/api/classes/findAll', params)
}
function getClasseLesson(params) {
    return get('/api/lesson/findByIdDetail', params)
}