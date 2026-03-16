const diaryTemplateDao  = require("../dao/diaryTemplateDao")
const myDiaryTemplateDao  = require("../dao/myDiaryTemplateDao")

const myDiaryTemplateService = {
    createMyDiaryTemplate:async ({userId}) => {
        let diaryTemplate1 = await diaryTemplateDao.findOne() //排名第一的模板 

        let content_myDiaryTemplate = diaryTemplate1.content
        let now = new Date().toString()

        return myDiaryTemplateDao.add({userId, content: content_myDiaryTemplate, lastModified: now})
    },
}

module.exports = myDiaryTemplateService