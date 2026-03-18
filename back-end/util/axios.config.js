const axios = require('axios');
const { getToken_hefeng } = require('./token_hefeng');

const axios_hefeng = axios.create();

axios_hefeng.interceptors.request.use(async function(config) {
    let token_hefeng = await getToken_hefeng();
    if(token_hefeng){
        config.headers.Authorization = `Bearer ${token_hefeng}`;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

module.exports = { axios_hefeng };


