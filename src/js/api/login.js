function login(params) {
    return post('/api/users/login', params)
}
function sendCode(params) {
    return post('/api/users/code', params)
}
function userRegister(params) {
    return post('/api/users/register', params)
}
function changePassword(params) {
    return post('/api/users/password', params)
}
function uploadFace(params) {
    return post('/api/users/face', params)
}
function addRecord(params) {
    return post('/api/record/add', params)
}