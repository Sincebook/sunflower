function viewCurrentTask(params) {
    return get('/api/misUsers/findNow', params)
}

function viewHistoricalTasks(params) {
    return get('/api/misUsers/findBefore', params)
}