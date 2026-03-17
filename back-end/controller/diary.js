const diaryDao = require("../dao/diaryDao");
const diaryTemplateDao = require("../dao/diaryTemplateDao");
const myDiaryTemplateDao = require("../dao/myDiaryTemplateDao");

const JWT = require("../util/JWT")

//service直接写道controller里面，简单后面有需要再改
const DiaryController = {
  createDiary:async (req, res) => {
    let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1]) //token = req.headers["authorization"].split(" ")[1]
    let result_diaryTemplate = await myDiaryTemplateDao.find({userId})
    let defaultTpl = await diaryTemplateDao.findOne()
    let now = new Date()

    let diaryData = {
      userId,
      content: (result_diaryTemplate && result_diaryTemplate.content) ? result_diaryTemplate.content : (defaultTpl && defaultTpl.content ? defaultTpl.content : ''),
      date: now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).replace(/\D+/g, '/'),
      wordCount: Array.from((result_diaryTemplate && result_diaryTemplate.content) ? result_diaryTemplate.content : (defaultTpl && defaultTpl.content ? defaultTpl.content : '')).length,
      lastModified: now.toString(),
    }
console.log(diaryData)
    try {
      let result = await diaryDao.add(diaryData)
      let resultFind = await diaryDao.findOne({diaryId: result.insertedId})
      res.send({
        code:"SUCCESS_CREATE-Diary",
        msg: "日记创建成功",
        data:{
          _id: resultFind._id,
          content: resultFind.content,
          date: resultFind.date,
          wordCount: resultFind.wordCount,
          lastModified: resultFind.lastModified,
        }
      })
    }catch(e){
      res.send({
        code:"ERROR_CREATEPROJECT",
        msg: "创建失败 \n "+e,
      })
    }
  },
  updateDiary:async (req, res)=>{
    //现在没有删除 oldData 文件 --- 后续
    let {diaryId, newContent} = req.body

    let updateData= {
      content: newContent,
      wordCount: Array.from(newContent).length,
      lastModified: new Date().toString(),
    }

    await diaryDao.update({diaryId, updateData})

    res.send({
      code:"SUCCESS_UPDATE-DATA",
      msg: "项目数据更新成功",
    })
  },
  getDiary:async (req, res)=>{
    let { diaryId } = req.query

    let result = await diaryDao.findOne({diaryId})
    if(result){
      res.send({
        code:"SUCCESS_GETPROJECT",
        msg: "获取项目成功",
        data: {
          content: result.content,
        }
      })
    }
  },
  //获取个人日记统计列表
  getMyDiaryList:async (req, res)=>{
    let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1]) //token = req.headers["authorization"].split(" ")[1]

    let list = await diaryDao.find({userId})
    if(list){
      res.send({
        code:"SUCCESS_GETPROJECT",
        msg: "获取项目成功",
        data: {list}
      })
    }
  },
  //个人预设模板相关
  getMyDiaryTemplate: async (req, res)=>{
    let {_id:userId} = JWT.getPayload(req.headers["authorization"].split(" ")[1]) //token = req.headers["authorization"].split(" ")[1]
    let result = await myDiaryTemplateDao.find({userId})

    if(result){
        res.send({
          code:"SUCCESS_GETPROJECT",
          msg: "获取个人日记模板成功",
          data: {
              myDiaryTemplateId: result._id,
              userId: result.userId,
              content: result.content,
              lastModified: result.lastModified,
            }
        })
    }
  },
  updateMyDiaryTemplate: async (req, res)=>{
    let {myDiaryTemplateId, newContent} = req.body
    console.log(myDiaryTemplateId, newContent)
    let now = new Date().toString();
    let result = await myDiaryTemplateDao.update({myDiaryTemplateId, content: newContent, lastModified: now})

    if(result){
        res.send({
          code:"SUCCESS_GETPROJECT",
          msg: "获取个人日记模板成功",
          data: {
          }
        })
    }

  },
  //获取日记模板列表
  getDiaryTemplateList: async (req, res)=>{
    let list = await diaryTemplateDao.find()

    if(list){
        res.send({
          code:"SUCCESS_GETPROJECT",
          msg: "获取个人日记模板成功",
          data: {
            list
          }
        })
    }
  },
}
module.exports = DiaryController
