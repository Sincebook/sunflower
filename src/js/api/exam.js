function getExam(params) {
    return get('/api/lesTest/findByLessonId', params)
}
function upExam(params) {
    return post('/api/misUsers/test', params)
}
function finishStudy(params) {
    return post('/api/misUsers/study', params)
}