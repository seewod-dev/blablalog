const { ObjectId } = require("mongodb")
const database  = require("../config/db.config")
const panelTemplate = database.collection('panelTemplate')

// const users = database.collection('users');

const panelTemplateDao = {
    add:async ({content}) => {
        return panelTemplate.insertOne({
            content
        })
    },
    del:async ({panelTemplateId, _ids, projectId, userId, favorite})=>{
        //根据单个ID进行单个删除
        if(panelTemplateId){
            return panelTemplate.deleteOne({
                _id: new ObjectId(panelTemplateId),
            })
        }
        //根据多个ID进行单个删除
        // if(_ids){
        //     _ids = _ids.map((_id) => new ObjectId(_id));
        //     return panelTemplate.deleteMany({
        //         _id: { $in: _ids } // 删除 age 字段值在 [25, 35] 中的文档
        //     })
        // }

        // if(projectId && favorite){
        //     console.log("ping")
        //     console.log(projectId,favorite,userId)
        //     //根据 项目名,收藏夹，用户 进行单个删除 —— view界面取消收藏某个界面
        //     return panelTemplate.deleteOne({
        //         projectId: new ObjectId(projectId),
        //         favorite,
        //         userId: new ObjectId(userId) 
        //     })
        // }
        // if(projectId && !favorite){
        //     //根据 项目名 进行多个删除 —— 删除项目，取消所有与该项目相关的收藏
        //     return panelTemplate.deleteMany({
        //         projectId: new ObjectId(projectId),
        //     })
        // }
        // if(!projectId && favorite){
        //     //根据 用户和收藏夹名称 进行多个删除 —— 删除收藏夹
        //     return panelTemplate.deleteMany({
        //         favorite,
        //         userId: new ObjectId(userId)  
        //     })
        // }
        // console.log("pong")
    },
    findOne:async () => {
        return await panelTemplate.findOne()
    },
    find:async () => {
        let result = await panelTemplate.find()
        return result.toArray()
    },
}

module.exports = panelTemplateDao