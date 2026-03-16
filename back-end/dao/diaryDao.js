const { ObjectId } = require("mongodb")
const database  = require("../config/db.config")
const diary = database.collection('diary');

const diaryDao = {
    add:async ({userId, date, content, wordCount, lastModified}) => {
        return diary.insertOne({
            userId: new ObjectId(userId),
            date,
            content,
            wordCount,
            lastModified,
        })
    },
    delteOne:async ({diaryId})=>{
        return diary.deleteOne({_id: new ObjectId(diaryId)})
    },
    update:async ({diaryId, updateData}) =>{
        const query = {_id: new ObjectId(diaryId)};
        const update = { $set: updateData};
        const options = {};
        return diary.updateOne(query, update, options);
    },
    findOne:async ({diaryId, date})=>{
        //这个函数具有重载功能（增加鲁棒性）
        if(diaryId){
            //使用ID查询
            return diary.findOne({_id: new ObjectId(diaryId)})
        }else if(date){
            //使用日期查询

        }
    },
    find:async ({userId}) => {
        let result = await diary.find({userId: new ObjectId(userId)})
        return result.toArray()
    },
}
module.exports = diaryDao