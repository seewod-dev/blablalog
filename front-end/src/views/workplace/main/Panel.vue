<template>
  <div class="container">
    <div class="main-content">
      <div class="main">
        <div class="leftPart">
          <div class="photoPart">
            <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
                
                :on-change="handleChange">
                <img :src="panelData.formData.baseInfo.photo" class="avatar" />
                <i class="iconfont-xiaohuohua xiaohuohua-icon-edit edit-icon">照片</i>
            </el-upload>

          </div>

          <div class="baseDataPart" v-show="!isEdit_formData">
            <div class="baseData-firstPanel">
              <span class="baseData-name">{{ panelData.formData.baseInfo.name }}</span>
              <i class="iconfont-note icon-note_edit2 baseData-editIcon" @click="startChange_baseData"></i>
            </div>

            <div class="baseData-secondPanel">
              <span>年龄：{{ panelData.formData.baseInfo.age }}</span>
              <span>职业：{{ panelData.formData.baseInfo.job }}</span>
            </div>

            <div class="baseData-bodyPanel">
              <div class="baseDataItem">综合指标（维度）</div>
              <div class="baseDataItem bodyPanel-overview">
                <span>体质：{{ panelData.formData.compositeIndicator.physical }}</span>
                <span>精力：{{ panelData.formData.compositeIndicator.mental }}</span>
                <span>智力：{{ panelData.formData.compositeIndicator.intelligence }}</span>
                <span>社交：{{ panelData.formData.compositeIndicator.social }}</span>
                <span>知识储备：{{ panelData.formData.compositeIndicator.knowledge }}</span>
                <span>幸运：{{ panelData.formData.compositeIndicator.luck }}</span>
                <span>道德：{{ panelData.formData.compositeIndicator.ethics }}</span>
                <span>财产：{{ panelData.formData.compositeIndicator.assets }}</span>
              </div>
            </div>
          </div>

          <el-form :model="form_formData" class='form_formData' size="small" v-if="isEdit_formData">
            <div class="formPart_title">基础信息</div>
            <el-divider />
            <el-form-item label="姓名">
              <el-input v-model="form_formData.baseInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form_formData.baseInfo.age"></el-input>
            </el-form-item>
            <el-form-item label="职业">
              <el-input v-model="form_formData.baseInfo.job"></el-input>
            </el-form-item>
              
            <div class="formPart_title">综合指标（维度）</div>
            <el-divider />
            <el-form-item label="体质">
              <el-input v-model="form_formData.compositeIndicator.physical"></el-input>
            </el-form-item>
            <el-form-item label="精神">
              <el-input v-model="form_formData.compositeIndicator.mental"></el-input>
            </el-form-item>
            <el-form-item label="智力">
              <el-input v-model="form_formData.compositeIndicator.intelligence"></el-input>
            </el-form-item>
            <el-form-item label="社交">
              <el-input v-model="form_formData.compositeIndicator.social"></el-input>
            </el-form-item>
            <el-form-item label="知识储备">
              <el-input v-model="form_formData.compositeIndicator.knowledge"></el-input>
            </el-form-item>
            <el-form-item label="幸运">
              <el-input v-model="form_formData.compositeIndicator.luck"></el-input>
            </el-form-item>
            <el-form-item label="道德">
              <el-input v-model="form_formData.compositeIndicator.ethics"></el-input>
            </el-form-item>
            <el-form-item label="财产">
              <el-input v-model="form_formData.compositeIndicator.assets"></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 1.5rem">
              <el-button type="primary" @click="finishChange_formData()">修改</el-button>
              <el-button type="primary" @click="closeDialog_formData()">撤销</el-button>
            </el-form-item>
          </el-form>

          <ul class="otherDataPart" v-show="!isEdit_formData">
            <li class="baseDataItem"><i class="iconfont-note icon-note_location"></i>{{ otherData.city.name }}</li>
            <li class="baseDataItem"><i :class="'qi-' + otherData.weather.icon"></i>{{ otherData.weather.text }}</li>
          </ul>
        </div>

        <div class="rightPart">
          <MyVditor
            :content="panelData.customData"
            :title="'自定义面板/'+panelData.formData.baseInfo.name"
            background="#f6f6f6"
            padding="1rem"
            borderRadius="0.5rem"
            @finishEdit="finishChange_customData"
            @cancel="cancelChange_customData"
          />
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
          <i id="themeToggle" class="iconfont-note icon-note_intro1" @click="isOpenDialog_intro = true"></i>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip
          effect="dark"
          content="面板参考模板"
          placement="left"
        >
          <i id="themeToggle" class="iconfont-note icon-note_puzzle4" @click="openDialog_template"></i>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip
          effect="dark"
          content="更多emoji"
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
            ref="paper2"
            class="vditorTemplate"
            :class="{vditorTemplate_offset: !isShowVditor_template}"
            :content="templateSelected.content"
            :title="templateSelected.name"
            background="#f6f6f6"
            padding="1rem"
            borderRadius="0.5rem"
            readonly="true"
          />
        </el-col>
        <el-col :offset="1" :span="6" class="rightPart_dialog">
          <div class="title">模板</div>
          <div class="referList">
            <el-card v-for="(item,index) in panelTemplateList" :key="index" class="templateBox" @click="changeVditor(index)" shadow="hover"> {{ item.name }} </el-card>
          </div>

          <pre class="templateDesc" style="margin-top: 2rem">
指南：
您可以选择【模块】中特定部分，并退出/复制到个人面板中！
          </pre>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      v-model="isOpenDialog_intro"
      title="Tips"
      width="500"
      modal-class = "dialog_custom"
    >
      <el-row :gutter="0" style="justify-content: center;align-items: center;height:70%">
        <div class="letterWrapper">
          <p class="letterText1"> 亲爱的旅者：</p>
          <p class="letterText">欢迎使用 ”个人面板“ 功能，这里是您的个人数字指挥中心，也是一站式个人成长与资产管理操作系统，下面我将对这个功能模块进行简单的介绍：</p>
          <p class="letterText">个人管理，基于个人当前状态的理性分析，经常出现在 一个人的日记中，为了更好的展现这个模块，我们尝试将这个功能单独分离出来，来帮助您在一个集中界面中可视化自己的生活、工作、学习和成长等多方面数据。我们将这个功能命名为：个人数字化面板，我们提供了一个简单的综合指标模范，以及一个自定义面板书写框。并且为这个自定义书写提供一些模板。</p>
          <p class="letterText">该功能目前正在尝试中，并不是一个成熟的阶段，目前正在收集个人面板应该包含哪些内容，希望大家多多尝试，并加入社区给出自己的建议。我们的最终目标是一个 可自由添加删减的 多面板界面。</p>
          <!-- <p class="letterText">董元辰</p>
          <p class="letterText">2024.10.3</p> -->
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted} from 'vue'
import axios from 'axios'
import {useStore} from '../../../util/useStore'
import { useRouter, useRoute } from 'vue-router'

import Footer from '../../../components/Footer.vue'
import MyVditor from "@/components/MyVditor.vue";

import { getCityAndWeather,getMyPanel,getPanelTemplateList, updateMyPanel, uploadPhoto } from "@/api/api";
const store = useStore()
const router = useRouter()

const panelData =ref({
  formData:{
    baseInfo: {
      name: "王家辉", 
      age: "23",
      job: "程序员",
      photo: "",
    },
    compositeIndicator: {
      physical: 1,
      mental: 1,
      intelligence: 1,
      social: 1,
      knowledge: 1,
      luck: 1,
      ethics: 1,
      assets: 1,
    },
  },
  customData:"圣诞节和罚款健身房哈吉斯大护法客家话",
})
const otherData = reactive({
  geolocation:{
    // latitude: 0,
    // longitude: 0
  },
  city: {

  },
  weather: {

  },
})


//baseData修改
const isEdit_formData = ref(false)
const form_formData = ref(null)

function startChange_baseData(){
  form_formData.value = panelData.value.formData
  isEdit_formData.value = true
}
function finishChange_formData(){
  updateMyPanel({newPanelData: form_formData.value, type: "formData"}).then(res => {
    panelData.value.formData = form_formData.value
    form_formData.value = null
    isEdit_formData.value = false
  })
}
function closeDialog_formData(){
  form_formData.value = null
  isEdit_formData.value = false
}
function finishChange_customData(payload){
  //获取vditor的内容
  let newCustomData = payload.content
  updateMyPanel({newPanelData: newCustomData, type: "customData"}).then(res => {
    panelData.value.customData = newCustomData
  })
}
function cancelChange_customData(payload){
}
//更换照片
const handleChange = (uploadFile)=>{
  // uploadFile 是element-plus 设计的一个对象 raw 才是原生API提供的
  panelData.value.formData.baseInfo.photo = URL.createObjectURL(uploadFile.raw)
  let data = {
    photo:uploadFile.raw
  }
  uploadPhoto(data).then(res => {
    console.log(res.data.data.photo)
    panelData.value.formData.baseInfo.photo = res.data.data.photo 
  })
}

//介绍相关
const isOpenDialog_intro = ref(false)

//模板列表相关
const isOpenDialog_template = ref(false)
const panelTemplateList = ref([])
const templateSelected = ref({})

function openDialog_template(){
  isOpenDialog_template.value = true
  changeVditor(0)
}
function changeVditor(index){
  templateSelected.value = panelTemplateList.value[index]
}

onMounted(() => {
  //加载个人面板数据
  getMyPanel().then(res => {
    panelData.value = res.data.data.panelData
  })

  //加载 面板模板
  getPanelTemplateList().then(res => {
    panelTemplateList.value = res.data.data.list
  })

  //定位当前地址
  navigator.geolocation.getCurrentPosition((position) => {
    //记录 geoLocation
    otherData.geolocation.latitude = position.coords.latitude.toFixed(2)
    otherData.geolocation.longitude = position.coords.longitude.toFixed(2)

    //查询城市地理位置 与 天气
    getCityAndWeather(otherData.geolocation).then(res =>{
      otherData.city = res.data.data.city
      otherData.weather = res.data.data.weather
    })
  });
})
</script>

<style lang="less">
.dialog_custom{
  position:absolute !important; 
  top:0px !important;
  left: 0px !important;
  height: 100%;

  & .el-overlay-dialog{
    position: relative;
    width:100%;
    height:100%;
  }
  & .el-dialog{
    margin: 0px;
    width:100%;
    height:100%;
    background: #f6f6f6;
  }
  & .el-dialog__header{
    position: absolute;
    width: 100%;
    padding: 0px;
    // display:none;
    border:none;
    // z-index: 2;
    & .el-dialog__title{
      visibility: hidden;
    }
    z-index: 1000; /* 提高层级 */

  }
  & .el-dialog__body{
    padding: 0px;
    height: 100%;
    // z-index: 1;
  }
}
.vditorIcon_finish,.vditorIcon_cancel{
  float: right;
}
</style>

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
  width: 250px;
  margin-right: 50px;
  // background:#897512;
  //公共属性
  .baseDataItem{
    margin-top: 0.75rem;
    font-size: 12px;
    // font-weight: lighter;
  }
  //各个模块
  .photoPart{
    position: relative;
    .baseData-phote {
      width: calc(100% - 10px);
      aspect-ratio: 1 / 1; /* 宽高比 1:1 */
      border-radius: 50%;
      border: 10px solid #dedede;
    }
    .photoTag{
      // border: 2px solid #ddd;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      width: 3rem;
      text-align: center;

      position: absolute;
      right: 5%;
      bottom: 12%;
      background: #f6f6f6;
    }
    .avatar{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .avatar-uploader{
      width: calc(100% - 10px);
      aspect-ratio: 1 / 1; /* 宽高比 1:1 */
      border-radius: 50%;
      border: 10px solid #dedede;

      &:deep(.el-upload){
        width:100%;
        height:100%;
      }

      // width: calc(100% - 10px);
      // aspect-ratio: 1 / 1; /* 宽高比 1:1 */
      // border-radius: 50%;
      // border: 10px solid #dedede;

      // background:#894872;
    }
    .edit-icon{
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      width: 3.5rem;
      text-align: center;
      letter-spacing: 2px;

      position: absolute;
      right: 0px;
      bottom: 12%;
      background: #f6f6f6;
    }
  }

  .baseDataPart{
    .baseData-firstPanel{
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      
      .baseData-name{
        font-weight: bold;
        font-size: 1.2rem;
      }
      .baseData-editIcon{
        font-size: 1.2rem;
      }
    }
    .baseData-secondPanel{
      margin: 0.75rem 0px 1rem;
      display:flex;
      justify-content: space-between;
      font-size: 12px;
    }
    .baseData-bodyPanel{
      margin: 2rem 0px 3rem;
      .bodyPanel-overview{
        margin:0px;
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        & > span{
          margin: 0.75rem 1.5rem 0px 0px;
          flex-grow: 0;
        }
        & > span:nth-child(3n+2){
          flex-grow: 1;
        }

      }
    }
  }

  .form_formData{
    margin-top: 1.5rem;
    .el-divider--horizontal{
      margin: 6px 0px 12px;
    }
    .formPart_title{
      display:flex;
      justify-content: space-between;
      margin-top: 2rem;
      font-size: 12px;
    }
    .el-form-item--small {
      margin-bottom: 0.5rem;
    }

  }

  .otherDataPart{
    margin-top: 2rem;

    & i{
      margin-right: 0.5rem;
      width: 12px;
      font-size:12px;
    }
  }

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
    #vditor{
    border-radius: 0.5rem;
    overflow: hidden;
    border:none;

    &:deep(.vditor-toolbar){
      display: v-bind(toolbarDisplay);
    }

    &:deep(.vditor-reset){
      padding: 0.5rem 0rem !important;
      background-color: #f6f6f6;
      overflow: hidden;
      max-width: none !important;
    }
    &:deep(.vditor-ir__node){
      & > ::before{
        display:none;
      }
    }

    &:deep(.vditor-toolbar) {
      --toolbar-height: 40px;
      padding: 0px 40px !important;
      background-color: #f6f6f6;
           caret-color: transparent;
    }
    &:deep(.vditor-hint) {
      background-color: #f6f6f6;
    }
    &:deep(.vditor-panel--arrow:before) {
      background-color: #f6f6f6;
    }
    &:deep(.vditor-toolbar__item svg){
      width: 12px;
      height: 12px;
    }

    &:deep(.vditor-ir pre.vditor-reset[contenteditable="false"]){
      opacity: 1;
    }
    &:deep(.vditor-preview) {
      background-color: #f6f6f6;
      cursor: default;
      caret-color: transparent;
    }
    &:deep(.vditor-toolbar [data-type="preview"]){
      visibility: hidden;
    }
  }
}

.switchList{
    top:2rem;
}







.calHeatmap_wrapper{
  // margin-bottom: 2rem;
  // border: 1px solid #fff;
  // border-radius: 0.5rem;
  .calHeatmap_bar{
    margin-bottom: 0.5rem;
    font-size: 12px;
    letter-spacing: 2px;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  #calHeatmap{
    border: 1px solid #fff;
    border-radius: 0.5rem;
  }
}


.letterWrapper{
  margin: 1rem auto;
  // background:#fff;
  border-radius: 1rem;
  padding: 3rem;
  // height: 800px;
  width: 900px;
  // border: 5px solid #eee;
  font-family: 楷体;
  font-size: 1.1rem;

  h2 {
    display:block;
    margin: 0rem auto 1rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;

  }
  .letterText1{
    line-height: 2rem;
  }
  .letterText{
    line-height: 2rem;
    text-indent: 2rem;
  }
  .EQ{
    display: block;
    margin: 2rem auto;
    // border:1px solid #efefef;
    background:#eee;
    box-shadow: 0px 0px 5px rgb(0 0 0 / 0.07);
    width: 250px;
    border-radius:0.5rem;
  }
}

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

  .vditorTemplate{
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

  .vditorTemplate_offset{
    // transform: translate(0rem,0rem);
    left: 0rem;
    top:0rem;
    opacity: 1
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