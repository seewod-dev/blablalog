const { ObjectId } = require("mongodb")
const database  = require("../config/db.config")
const panel = database.collection('panel');

const panelDao = {
    add: async ({userId, panelData, lastModified}) => {
        return panel.insertOne({
            userId: new ObjectId(userId),
            panelData,
            lastModified,
        })
    },
    update:async ({userId, updateData}) =>{
        const query = {userId: new ObjectId(userId)};
        const update = { $set: updateData};
        const options = {};

        return panel.updateOne(query, update, options);
    },
    findOne:async ({panelId, userId})=>{
        //这个函数具有重载功能（增加鲁棒性）
        if(panelId){
            //使用ID查询
            return panel.findOne({_id: new ObjectId(panelId)})
        }else if(userId){
            //使用用户ID查询
            return panel.findOne({userId: new ObjectId(userId)})
        }
    },
}

module.exports = panelDao