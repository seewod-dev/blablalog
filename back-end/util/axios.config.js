const axios = require('axios');
const { getToken_hefeng } = require('./token_hefeng');

//axios instance
const axios_hefeng = axios.create();

// Configure hefeng axios instance settings
axios_hefeng.interceptors.request.use(async function(config) {
    let token_hefeng = await getToken_hefeng();
    config.headers.Authorization = `Bearer ${token_hefeng}`;
    return config;
}, function(error) {
    return Promise.reject(error);
});

module.exports = { axios_hefeng };


