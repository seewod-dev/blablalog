const { ObjectId } = require("mongodb")
const database  = require("../config/db.config");
const { add } = require("../service/userService");
const diaryTemplate = database.collection('diaryTemplate');

const users = database.collection('users');

const diaryTemplatelDao = {
    // add:async ({projectId,userId,favorite}) => {
    //     //对用户信息中该 收藏夹的长度 +1
    //     return diaryTemplate.insertOne({
    //         projectId: new ObjectId(projectId),
    //         userId: new ObjectId(userId),
    //         favorite,
    //     })
    // },
    findOne:async () => {
        return diaryTemplate.findOne()
    },
    find:async () => {
        let result = await diaryTemplate.find()
        return result.toArray()
    },
    // find:async ({diaryTemId, }) => {
    //     //鲁棒性 查询单个，查询列表

    //     let pipeline 
    //     if(projectId){
    //         projectId = new ObjectId(projectId)
    //         pipeline = [{
    //             $match:{ userId:new ObjectId(userId), projectId }
    //         },{
    //            $lookup:{
    //                 from: "projects",
    //                 localField: "projectId",
    //                 foreignField: "_id",
    //                 as: "project_mapping"
    //            },
    //         },{
    //             $set: {
    //                 project_mapping: { $first: "$project_mapping" },
    //             },
    //         },
    //         {
    //             $set: {
    //                 // projectId: "$project_mapping._id",
    //                 name: "$project_mapping.name",
    //                 coverImg: "$project_mapping.coverImg",
    //                 tags: "$project_mapping.tags",
    //                 permission: "$project_mapping.permission",
    //             },
    //         },{
    //             $unset: ["userId","project_mapping"]
    //         }]
    //     }else{
    //         pipeline = [{
    //             $match:{ userId:new ObjectId(userId) }
    //         },{
    //            $lookup:{
    //                 from: "projects",
    //                 localField: "projectId",
    //                 foreignField: "_id",
    //                 as: "project_mapping"
    //            },
    //         },{
    //             $set: {
    //                 project_mapping: { $first: "$project_mapping" },
    //             },
    //         },
    //         {
    //             $set: {
    //                 // projectId: "$project_mapping._id",
    //                 name: "$project_mapping.name",
    //                 coverImg: "$project_mapping.coverImg",
    //                 tags: "$project_mapping.tags",
    //                 permission: "$project_mapping.permission",
    //             },
    //         },{
    //             $unset: ["userId","project_mapping"]
    //         }]
    //     }

    //     let cc = await diaryTemplate.aggregate(pipeline)
    //     return cc.toArray()
    // },
}

module.exports = diaryTemplatelDao