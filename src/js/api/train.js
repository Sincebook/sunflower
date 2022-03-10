function signUp(params) {
    return post('/api/trainRecord/add', params)
}

function signInApi(params) {
    return post('/api/trainRecord/intime', params)
}

function signOutApi(params) {
    return post('/api/trainRecord/outtime', params)
}

function findMyTraining(params) {
    return get('/api/train/findByCompanyId', params)
}