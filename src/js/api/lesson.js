loader.import("../../js/api/index.js");
function banners(params) {
    return get('/api/banner/findAll', params)
}
function getClasses(params) {
    return get('/api/classes/findAll', params)
}