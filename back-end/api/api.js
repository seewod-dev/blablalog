const { axios_hefeng } = require('../util/axios.config');

const HOST_minio = 'http://yinghuonet.com:9000';
const HOST_hefeng = 'https://nr78kxqp3w.re.qweatherapi.com';

const pictureURL = {
  defaultAvactar: `${HOST_minio}/blablalog/avactar/defaultAvactar.jpg`,
}
const API = {
  // 天气查询的接口
  getCity: `${HOST_hefeng}/geo/v2/city/lookup`,
  getWeather: `${HOST_hefeng}/v7/weather/now`,
};

const getCity = (data = {}) => axios_hefeng({
  url: `${API.getCity}?location=${data.location}`,
  method: 'get',
});

const getWeather = (data = {}) => axios_hefeng({
  url: `${API.getWeather}?location=${data.location}`,
  method: 'get',
});

module.exports = {
  //主机地址
  HOST_minio,
  // HOST,
  HOST_hefeng,
  //接口地址
  API,
  //请求方法
  getCity,
  getWeather
};