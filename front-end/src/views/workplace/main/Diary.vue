<template>
  <div class="container">
    <div class="main-content">
      <div class="main">
        <div class="leftPart">
          <div class="calHeatmap_bar">
            <el-date-picker
              v-model="calSelected"
              :type=calUnit
              size="small"
              :clearable="false"
              style="width: 100px"
            />

            <el-select
              v-model="calUnit"
              placeholder="Select"
              size="small"
              style="width: 50px"
            >
              <el-option
                v-for="item in unitList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </div>
          <div id="calHeatmap"></div>
        </div>

        <div  class="rightPart">
          <div class="panel_wrapper">
            <div class="createPartPart" v-if="isOpen_createPanel">
              <el-button class="createBtn" @click="createDiary_()">创建日记</el-button>
            </div>
            <MyVditor
              v-if="!isOpen_createPanel"
              :content="diarySelected.content"
              title="日记"
              background="#ffffff"
              padding="3rem"
              borderRadius="0.5rem"
              @finishEdit="finishEditDiary"
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
    <ul class="switchList">
      <li>
        <el-tooltip
          effect="dark"
          content="介绍"
          placement="left"
        >
                <li><i id="themeToggle" class="iconfont-note icon-note_puzzle2" @click="isOpenDialog_template = true"></i></li>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip
          effect="dark"
          content="面板参考模板"
          placement="left"
        >
          <a href="https://www.emojipic.cn/" target="_blank"><i id="themeToggle" class="iconfont-note icon-note_emoji"></i></a>
        </el-tooltip>
      </li>
    </ul>

    <el-dialog
      v-model="isOpenDialog_template"
      title="Tips"
      width="500"
      :before-close="handleClose"
      modal-class = "dialog_custom"
    >
      <el-row class="main_dialog" :gutter="0">
        <el-col :offset="2" :span="14" class="leftPart_dialog">
          
          <MyVditor
            ref="paper1"
            class="vditorMyTemplate"
            :class="{vditorMyTemplate_offset:!isShowVditor_template}"
            :content="mydiaryTemplate.content"
            title="日记"
            background="#ffffff"
            padding="3rem"
            borderRadius="0.5rem"
            @finishEdit="finishEdit_MyDiaryTemplate"
          />
          <MyVditor
            ref="paper2"
            class="vditorTemplate"
            :class="{vditorTemplate_offset: !isShowVditor_template}"
            :content="templateSelected.content"
            :title="templateSelected.name"
            background="#ffffff"
            padding="3rem"
            borderRadius="0.5rem"
            readonly="true"
          />
        </el-col>
        <el-col :offset="1" :span="6" class="rightPart_dialog">
          <div class="title">我的</div>
          <el-card class="templateBox" @click="changeVditor({type: 'private'})" shadow="hover">模 板</el-card>
          <div class="title"  style="margin-top: 2rem">参考</div>
          <div class="referList">
            <el-card v-for="(item,index) in diaryTemplateList" :key="index" class="templateBox" @click="changeVditor({type: 'public',index})" shadow="hover"> {{ item.name }} </el-card>
          </div>

          <pre class="templateDesc" style="margin-top: 2rem">
指南：
您可以通过以下行为编辑【我的】模板，来生成自己的日记模板：
<del>1. 选择并【参考】提供的模板覆盖【我的】模板</del>
2. 选择【参考】中特定部分，并复制到【我的】模板
3. 自定义写入

注意：
1. 日期栏会根据您的定位自动生成，无需编辑
          </pre>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
  
<script setup>
import { computed, ref, reactive,onMounted,toRaw,watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useStore} from '../../../util/useStore'
import { ElMessage } from 'element-plus'

import CalHeatmap from 'cal-heatmap';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import 'cal-heatmap/cal-heatmap.css';

import Footer from '../../../components/Footer.vue'
import MyVditor from "@/components/MyVditor.vue";

import { getDiary, getMyDiaryList, getMyDiaryTemplate, updateMyDiaryTemplate, getDiaryTemplateList,createDiary, updateDiary} from "@/api/api";
import {parseDate} from '../../../util/util'
//日历相关
const calSelected = ref(new Date().toLocaleDateString()) //日期选择
const calUnit = ref('month') //日期选择单位

const cal = new CalHeatmap();
cal.on('click', (event, timestamp, value) => {
  console.log(event)
  //判断该日期是否有日记
  let time_selected = new Date(timestamp).toLocaleDateString();
  let selectedDiary = myDiaryList.value.find(item => item.date == time_selected)
  if(selectedDiary){
    if(isOpen_createPanel.value){
      isOpen_createPanel.value = false
    }
    diarySelected.value = selectedDiary
    highlightCell(event)
  }else{
    if( timestamp < parseDate(date_today).getTime()){
    //处于过去
      ElMessage(`${time_selected} 当天并没有记载任何事情！`)
    }else if(timestamp == parseDate(date_today).getTime()){
      //日期处于今天,
      isOpen_createPanel.value = true
      highlightCell(event)
    }else{
      //处于未来
      ElMessage('Sorry, 不推荐在未来时间创建一个日记')
    }
  }
});
function calPaint(domain, start){
  console.log(myDiaryList.value)
  cal.paint({
    itemSelector: '#calHeatmap',
    verticalOrientation: true,
    data: { source: myDiaryList.value, x: item => parseDate(item.date), y: 'wordCount' },
    range: 1,
    domain: {
      type: domain,
      padding: [5, 5, 5, 5],
      label: { text: "", position: 'top' },
    },
    subDomain: { type: 'xDay', radius: 2, width: 20, height: 20, gutter: 2,label: 'D' },
    date:{ start, highlight: [parseDate(date_today)],},
    scale: {
      color: {
        type: 'threshold',
        range: ['#14432a', '#166b34', '#37a446', '#4dd05a'],
        domain: [10, 20, 30],
      },
    },
  },[
  [CalendarLabel, {
    position: 'top',
    key: 'top',
    text: () => ['日', '一', '二', '三', '四', '五', '六'],
    width: 20,
    textAlign: 'middle',
    padding: [5, 5, 5, 5],
  }]]).then(() => {
    // addClickHighlight();    
  })
}
function highlightCell(event){
    const cell = event.target;
    // 移除已有高亮
    document.querySelectorAll(".highlight").forEach(el => {
      el.classList.remove("highlight");
    });
    // 为当前点击项添加高亮
    // if (cell.classList.contains(".ch-subdomain-bg")) {
      cell.classList.add("highlight");
    // }
}

watch(calSelected, (value) =>{
  cal.jumpTo(parseDate(value),true)
})
watch(calUnit, (value) =>{
  calPaint(value, parseDate(calSelected.value))
})
const unitList = ref([
  {name: '年', value: 'year'},
  {name: '月', value: 'month'},
])

//日记相关
const myDiaryList = ref([])

let date_today = new Date().toLocaleDateString()
const isOpen_createPanel = ref(true)
const diarySelected =ref({
})
function createDiary_(){
  createDiary().then((res)=>{
    diarySelected.value = res.data.data
    myDiaryList.value.push(diarySelected.value)
    calPaint(calUnit.value, parseDate(date_today))
    isOpen_createPanel.value = false
  })
}
function finishEditDiary(payload){
  let data = {
    diaryId: diarySelected.value._id,
    newContent: payload.content,
  }
  updateDiary(data).then(res => {
    console.log('更新完成')
  })
}

//日记模板相关
const isOpenDialog_template = ref(false)

const diaryTemplateList = ref([])
const mydiaryTemplate = ref({
  // mydiaryTemplateId: null,
  // userId: null,
  // content: null,
  // lastModified: null,
})
const templateSelected = ref({})

const isShowVditor_template = ref(false)
function changeVditor(option){
  if(option.type == 'private'){
    isShowVditor_template.value = false
  }else{
    isShowVditor_template.value = true
    templateSelected.value = diaryTemplateList.value[option.index]
  }
}
function finishEdit_MyDiaryTemplate(payload){
  console.log(mydiaryTemplate.value)
  let data = {
    myDiaryTemplateId: mydiaryTemplate.value.myDiaryTemplateId,
    newContent: payload.content,
  }

  updateMyDiaryTemplate(data).then(res => {
    console.log('更新完成')
  })
}


onMounted(() => {
  //根据个人日记管理表 检查今日是否有 日记已经记录
  getMyDiaryList().then(res => {
    myDiaryList.value = res.data.data.list

    //控制 rightPart展示
    let todayDiary = myDiaryList.value.find(item => item.date == date_today)
    isOpen_createPanel.value = Boolean(!todayDiary)
    diarySelected.value = todayDiary

    //控制 leftPart展示
    calPaint('month', parseDate(date_today))
  })

  // const activeUser = users.find(user => user.active === true);
  // let hasDiary_today = diaryList.
  // if(hasDiary_today){
  //   getDiaryContent({id}).then(res => {
  //     diaryContent = res.data.data
  //   })
  // }

  //加载我的模板
  getMyDiaryTemplate().then(res => {
    mydiaryTemplate.value = res.data.data
        console.log(mydiaryTemplate.value)
  })
  //加载日记模板列表
  getDiaryTemplateList().then(res => {
    diaryTemplateList.value = res.data.data.list
    console.log(diaryTemplateList.value)
  })
})
</script>

<style scoped lang="less">
//固定高度 容器
.container{
  width:100%;
  height:100%;

  overflow: auto; //相比于scroll，不会再100%时候就变化为scroll，必须超出
  position: relative;
}
.main-content{
  height:100%;
  overflow:auto;

  .main{
    padding-top: 3rem;
    margin:0px !important;
    min-height: calc(100% - 50px);

    display:flex;
    justify-content: center;
    flex-wrap: nowrap;
  }
}

.leftPart{
  // background:#897512;
  margin-right: 50px;
  min-width: 200px;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  //公共属性
  // .calHeatmap_wrapper{
  //   width: 162px;
    // background:#123456;

    .calHeatmap_bar{
      width: 162px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #calHeatmap{
      margin-top: 0.5rem;
      max-height: 560px;
      overflow: auto;

      &::-webkit-scrollbar-thumb{
        background: #dedede;
      }

    }
  // }

}
.rightPart{
  width: 60%;
    min-width: 800px;
  // margin-bottom: 2rem;
  // border: 1px solid #000;
  border-radius: 0.5rem;
  overflow: hidden;

  .panel_bar{
    padding: 0.5rem 0px;
    border-bottom: 1px solid #dedede;
    font-size: 12px;
    letter-spacing: 2px;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .createPartPart{
    width: 100%;
    height: 600px;
    background:#efefef;
    border-radius: 0.5rem;
    
    display:flex;
    justify-content: center;
    align-items: center;
    .createBtn{

    }

  }
}

.switchList{
    top:2rem;
}


//dialog 部分
.main_dialog{
  padding: 2rem 0px 4rem;
  margin:0px !important;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.leftPart_dialog{
  display:block;
  padding-right: 5rem;
  // background:#482675;
  // position: relative;
  white-space: nowrap;
  
  // display: flex;
  // flex-direction: column;

  // &::after {
  //   content: "";
  //   display: block;
  //   height: 50px; /* 底部间距 */

  //   background: #222;
    
  // }

  .vditorMyTemplate, .vditorTemplate{
    display:inline-block;
    vertical-align: top;
    // width: calc(100% - 5rem);
    width:100%;
    box-shadow: 1px 1px 10px rgba(0 0 0 / 0.02);
    transition: 
      // transform 0.5s,
      left 0.5s,
      top 0.5s,
      opacity 0.5s;
    position: relative;
  }
  .vditorMyTemplate{
    // transform: translate(-0.25rem,-0.25rem);
    // opacity:0.5
  }
  .vditorMyTemplate_offset{
    // transform: translate(0rem,0rem);
    left: 0rem;
    top:0rem;
    opacity: 1
  }
  .vditorTemplate{
    pointer-events:all;
    // transform: translate(calc(0rem - 100%),0rem);
    left: -100%;
    top:0rem;
  }
  .vditorTemplate_offset{
    pointer-events: none;
    // visibility: hidden;
    // transform: translate(calc(2rem - 100%),2rem);
    left: calc(2rem - 100%);
    top:2rem;
    opacity: 0;
  }
}
.rightPart_dialog{
  // background:#ff2675;
  margin-left: 2rem;
  color: #000;

  .title{
    margin: 0px 0px 1rem 2px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .referList{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 140px 140px 140px;

    // display: flex;
    // justify-content: flex-start;
    // flex-wrap: wrap;
  }

  .templateBox{
    margin-bottom: 10px;
    width: 140px;
    height: 70px;
    border-radius: 0.5rem;
    background: #fff;

    font-size: 1rem;
    // font-weight: lighter;
    letter-spacing: 1px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // &:deep(.el-card__body){
      
    // }
  }

  .templateDesc{
    font-family: "微软雅黑";
    font-size: 1rem;
    line-height: 1.5rem;
    max-width: 100%;        /* 防止溢出父容器 */
    display: inline-block;  /* 使 fit-content 生效 */
  }
}
</style>