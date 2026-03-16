const { ObjectId } = require("mongodb")
const database  = require("../config/db.config");
const myDiaryTemplate = database.collection('myDiaryTemplate');

const myDiaryTemplatelDao = {
    add:async ({userId, content, lastModified}) =>{
        //对用户信息中该 收藏夹的长度 +1
        return myDiaryTemplate.insertOne({
            userId: new ObjectId(userId),
            content,
            lastModified
        })
    },
    update:async ({myDiaryTemplateId, content, lastModified}) =>{
        const query = {_id: new ObjectId(myDiaryTemplateId)};
        const update = { $set: { content, lastModified }};
        const options = {};
        console.log(query, update, options)
        return myDiaryTemplate.updateOne(query, update, options);
    },
    find:async ({userId}) => {
        return myDiaryTemplate.findOne({userId: new ObjectId(userId)})
    },
}

module.exports = myDiaryTemplatelDao