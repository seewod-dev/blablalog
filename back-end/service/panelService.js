const panelDao  = require("../dao/panelDao")
const panelTemplateDao  = require("../dao/panelTemplateDao")
const {HOST_minio} = require("../api/api")

const panelService = {
    createPanel:async ({userId}) => {
        let result_panelTemplate1 = await panelTemplateDao.findOne() //排名第一的模板 

        let panelData = {
            formData: {
                baseInfo: {
                    photo: `${HOST_minio}/blablalog/photo/defaultPhoto.webp`,
                    name: "第288号旅者",
                    age: "未知",
                    job: "未知"
                },
                compositeIndicator: {
                    physical: 1,
                    mental: 1,
                    intelligence: 1,
                    social: 1,
                    knowledge: 1,
                    luck: 1,
                    ethics: 1,
                    assets: 1,
                },
            },
            customData: (result_panelTemplate1 && result_panelTemplate1.content) ? result_panelTemplate1.content : ''
        }
        let now = new Date().toString()

        return panelDao.add({userId, panelData, lastModified: now})
    },
    updatePanel:async ({userId, newPanelData, type}) => {
        let now = new Date().toString();
        let updateData = null
        switch(type){
            case "formData":
                updateData = {
                    "panelData.formData": newPanelData,
                    lastModified: now
                }
                break;
            case "customData":
                updateData = {
                    "panelData.customData": newPanelData,
                    lastModified: now
                }
                break;
            case "photo":
                updateData = {
                    "panelData.formData.baseInfo.photo": newPanelData,
                    lastModified: now
                }
        }
        return panelDao.update({userId, updateData})
    },
}

module.exports = panelService
