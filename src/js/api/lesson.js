function banners(params) {
    return get('/api/banner/findAll', params)
}

function getClasses(params) {
    return get('/api/classes/findAll', params)
}

function findByClassesId(params) {
    return get('/api/lesson/findByClassesId', params)
}
function getClasseLesson(params) {
    return get('/api/lesson/findByIdDetail', params)
}
function addStudyImg(params) {
    return post('/api/studyImg/add', params)
}
function addProgress(params) {
    return post('/api/misUsers/progress', params)
}