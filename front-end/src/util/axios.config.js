import axios from 'axios'

axios.interceptors.request.use(function(config){
    if(window.location.pathname != "/login"){
        const token = localStorage.getItem("token")
        config.headers.Authorization = `YETS ${token}`
    }
    return config;
},function(error){
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response){
    if(window.location.pathname != "/workplace/login"){
        const {authorization} = response.headers
        authorization && localStorage.setItem("token",authorization)
    }
    return response;
},function(error){
    //过期
    if(error.response.data.code == 'ERROR_TOKEN-EXPIRED'){
        console.log("登陆过期")
        window.history.pushState({}, "", "/view/login")
        window.history.go(0)
    }
    return Promise.reject(error)
});