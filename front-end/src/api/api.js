import axios from 'axios'
import cfg from '@/config'

//协议与域名
/* 【前后端部署在同一服务器时】协议域名会自动绑定，这里专门列出是为了适应 【前后端分离部署的项目】、以及有众多【跨端服务的项目】*/
export const HOST = cfg.apiBase || '';
export const HOST_minio = (cfg.minioBase || 'http://yinghuonet.com:9000') + '/blablalog';
// export const UPLOAD_API = `${HOST}/system/file/upload?fileType=SYSTEM`;
export const API = {
  //天气查询的接口
  getCityAndWeather: `${HOST}/api/hefeng/getCityAndWeather`,
  //日记接口
  createDiary: `${HOST}/api/diary/createDiary`,
  updateDiary: `${HOST}/api/diary/updateDiary`,
  getMyDiaryList: `${HOST}/api/diary/getMyDiaryList`,
  getDiary: `${HOST}/api/diary/getDiary`,
  //我的日记模板
  getMyDiaryTemplate: `${HOST}/api/diary/getMyDiaryTemplate`,
  updateMyDiaryTemplate: `${HOST}/api/diary/updateMyDiaryTemplate`,
  //日记模板
  getDiaryTemplateList: `${HOST}/api/diary/getDiaryTemplateList`,
  //面板接口
  getMyPanel: `${HOST}/api/panel/getMyPanel`,
  updateMyPanel: `${HOST}/api/panel/updateMyPanel`,
  uploadPhoto: `${HOST}/api/panel/uploadPhoto`,
  //面板模板
  getPanelTemplateList: `${HOST}/api/panel/getPanelTemplateList`,
};

//获取面板模板列表
export const getPanelTemplateList = () => {
  return axios({
    url: API.getPanelTemplateList,
    method: 'get',
  })
};

//上传照片
export const uploadPhoto = (data={}) => {
  return axios({
    url: API.uploadPhoto,
    method: 'patch',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

//更新我的面板数据
/*
@param {content，type}
*/
export const updateMyPanel = (data = {}) => {
  return axios({
  url: API.updateMyPanel,
  method: 'post',
  data,
})};

//获取我的面板数据
export const getMyPanel = () => {
  return axios({
  url: API.getMyPanel,
  method: 'get',
})};

//获取日记模板列表
export const getDiaryTemplateList = () => {
  return axios({
    url: API.getDiaryTemplateList,
    method: 'get',
})};

export const updateMyDiaryTemplate = (data = {}) => {
  return axios({
    url: API.updateMyDiaryTemplate,
    method: 'patch',
    data
})};

export const getMyDiaryTemplate = () => {
  return axios({
    url: API.getMyDiaryTemplate,
    method: 'get',
})};

//获取城市位置、天气
export const getDiary = (data = {}) => {
  return axios({
    url: `${API.getDiary}?diaryId=${data.diaryId}`,
    method: 'get',
})};

//获取城市位置、天气
export const getMyDiaryList = () => {
  return axios({
      url: API.getMyDiaryList,
      method: 'get',
})};

//更新某一个日记
export const updateDiary = (data = {}) => {
  return axios({
    url: API.updateDiary,
    method: 'post',
    data,
})};

//获取城市位置、天气
export const createDiary = () => {
  return axios({
    url: API.createDiary,
    method: 'post',
})};

//获取城市位置、天气
export const getCityAndWeather = (data = {}) => {
  return axios({
  url: `${API.getCityAndWeather}?geolocation=${data.longitude},${data.latitude}`,
  method: 'get',
})};
