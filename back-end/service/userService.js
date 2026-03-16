const { ObjectId } = require("mongodb")
const database  = require("../config/db.config")
const users = database.collection('user');
const {HOST_minio} = require("../api/api")

const UserService = {
    loginVCode:async({email})=>{
        //应该是执行完await， 再return
        return await users.findOne({email})
    },
    find:async({_id})=>{
        //应该是执行完await， 再return
        //主要是因为JWT声称时候，id 的new onject...什么的会直接转换为 id的字符串，所以所有后续id都要加new xx,不过即使 对于new xxx的再次new xxx，也不会对其造成破坏，它内部机制会处理，只对象化一次
        return await users.findOne({_id: new ObjectId(_id)})
    },
    loginPassword:async({email,password})=>{
        return await users.findOne({email,password})
    },
    add:async ({email}) => {
        return users.insertOne({
            email,
            avatar: `${HOST_minio}/blablalog/avactar/defaultAvatar.webp`
        })
    },
    update:async(id, newInfo) => {
        //不允许更改邮箱
        return users.updateOne(
            {_id: new ObjectId(id)},
            {$set:newInfo},
        )
    },
}
module.exports = UserService