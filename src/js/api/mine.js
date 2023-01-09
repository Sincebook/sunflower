function displayOwnInfo(params) {
    return get('/api/users/findme', params)
}
function findMyCert(params) {
    return get('/api/studyFinish/findMine', params)
}