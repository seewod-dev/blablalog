const panelService = require("../service/panelService");
const panelDao = require("../dao/panelDao");
const panelTemplateDao = require("../dao/panelTemplateDao");
const JWT = require("../util/JWT")

const PanelController = {
    updateMyPanel:async (req, res)=>{
        let { newPanelData, type } = req.body
        let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1])

        
        await panelService.updatePanel({userId, newPanelData, type})

        res.send({
            code:"SUCCESS_UPDATE-DATA",
            msg: "项目数据更新成功",
        })
    },
    //获取某个项目的数据
    getMyPanel:async (req, res)=>{
        let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1]) //token = req.headers["authorization"].split(" ")[1]
        let result = await panelDao.findOne({userId})

        if(result){
            res.send({
                code:"SUCCESS_GETPROJECT",
                msg: "获取项目成功",
                data: {
                    panelId: result._id,
                    panelData: result.panelData,
                    lastModified: result.lastModified,
                }
            })
        }
    },
    getPanelTemplateList:async (req, res)=>{
        let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1]) //token = req.headers["authorization"].split(" ")[1]
        let list = await panelTemplateDao.find()

        if(list){
            res.send({
                code:"SUCCESS_GETPROJECT",
                msg: "获取项目成功",
                data: {
                    list
                }
            })
        }
    },
}
module.exports = PanelController