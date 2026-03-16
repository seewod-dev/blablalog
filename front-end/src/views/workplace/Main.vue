<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <div class="logoFrame">
          <img class="logo" src="../../assets/logo2.webp">
        </div>

        <el-button  type='danger' @click="createDiary_()" style="margin-left:auto;"><i class="iconfont-note icon-note_diary2 createB"></i>写日记</el-button>
        <!-- <img class="createB" src="../../assets/icons/1.png" @click="isOpenDialog_newProject = true"/> -->
        <div class="icons">
          <!-- <el-badge is-dot>
            <img class="headerIcon" src="../../assets/icons/2.png"/>
          </el-badge> -->
          <!-- <el-badge is-dot :hidden="hasNewNotice">
            <el-tooltip
              content="通知"
              placement="bottom"
              :show-arrow="false"
              :offset="5"
              :hide-after="50"
            >
              <i class="iconfontcolor-xiaohuohua c_xiaohuohua-notice headerIcon" @click="isOpenDialog_notice = true"></i>
            </el-tooltip>
          </el-badge> -->
                      <!-- <img class="headerIcon" src="../../assets/icons/3.png" @click="$message('功能开发中')"/> -->
                                     <!-- <i class="iconfontcolor-xiaohuohua c_xiaohuohua-donate10 headerIcon" @click="router.push('/donate')"></i> -->
          <!-- <el-badge is-dot :hidden="hasNewNotice">
            <el-tooltip
              content="为作者充电"
              placement="bottom"
              :show-arrow="false"
              :offset="5"
              :hide-after="50"
            >
              <RouterLink to="/donate" target="_blank">
                <i class="iconfontcolor-xiaohuohua c_xiaohuohua-donate10 headerIcon"></i>
              </RouterLink>
            </el-tooltip>
          </el-badge> -->
          <el-badge is-dot :hidden="hasNewMessage">
            <el-tooltip
              content="建议"
              placement="bottom"
              :show-arrow="false"
              :offset="5"
              :hide-after="50"
            >
              <RouterLink to="/view/feedback" target="_blank">
                <i class="iconfontcolor-xiaohuohua c_xiaohuohua-feedback3 headerIcon"></i>
              </RouterLink>
            <i class="iconfontcolor-xiaohuohua c_xiaohuohua-feedback3 headerIcon" @click="isOpenDialog_feedback = true"></i>
            </el-tooltip>
          </el-badge>
          <!-- <el-badge is-dot :hidden="hasNewTutorial">
            <el-tooltip
              content="教程"
              placement="bottom"
              :show-arrow="false"
              :offset="5"
              :hide-after="50"
            >
              <RouterLink to="/tutorial" target="_blank">
                <i class="iconfontcolor-xiaohuohua c_xiaohuohua-tutorial headerIcon"></i>
              </RouterLink>
            </el-tooltip>
          </el-badge> -->
        </div>

        <img :src="store.userInfo.avatar" class="avactor" @click="changeCollapseRight">
      </el-row>
      <el-row>
        <el-menu
          :default-active="activeIndex"
          class="main-menu"
          mode="horizontal"
          router
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/view/workplace/diary" @click="activeIndex = '/view/workplace/diary'">
            <i class="iconfont-note icon-note_diary2 menuIcon"></i>
            <span>写日记</span>
          </el-menu-item>
          <el-menu-item index="/view/workplace/panel" @click="activeIndex = '/view/workplace/panel'">
            <i class="iconfont-note icon-note_panel menuIcon"></i>
            <span>个人面板</span>
          </el-menu-item>
            <el-menu-item @click="nothing()">
            <i class="iconfont-note icon-note_taskManager2 menuIcon"></i>
            <span>任务管理</span>
          </el-menu-item>
        </el-menu>
      </el-row>
    </el-header>

    <el-main class="main">
      <div class="scrollMask"></div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      
      <ul class="switchList">
        <li><i id="themeToggle" class="iconfontYH iconYH-theme_light"></i></li>
        <li><i id="audioToggle" class="iconfontYH iconYH-music_open"></i></li>
      </ul>

    </el-main>

    <el-dialog
      v-model="isOpenDialog_newProject"
      title="新建白板"
      width="800"
    >
      <el-row class="pDialog">
        <!-- <el-anchor
          :container="form_newProject"
          direction="vertical"
          type="default"
          :offset="30"
        >
          <el-anchor-link href="#projectName" title="信息" />
          <el-anchor-link href="#projectType" title="权限" />
          <el-anchor-link href="#projectDesc" title="描述" />
        </el-anchor> -->

        <el-form ref="form_newProject" :model="newProjectInfo" label-width="auto" class="from_newProjectInfo" @submit.prevent :rules="newProjectInfo_rules">
          <el-form-item label="项目名" prop="name">  
            <el-input v-model="newProjectInfo.name" maxlength="15" show-word-limit/>
          </el-form-item>

          <el-form-item label="标签">
            <el-tag
              v-for="(tag, index) in newProjectInfo.tags"
              :key="tag"
              closable
              type="primary"
              :disable-transitions="false"
              @close="handleClose(index)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              v-model="inputValue"
              style="width:5rem"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-newTag" size="small" @click="showInput"> + 添加 </el-button>
          </el-form-item>

          <!-- <el-form-item id="projectType" label="项目类型">
            <el-radio-group v-model="newProjectInfo.projectType">
              <el-radio value="personal">个人</el-radio>
              <el-radio value="multi">多人</el-radio>
              <el-radio value="communal">社区</el-radio>u【
            </el-radio-group>
          </el-form-item> -->

          <el-form-item label="是否公开">
            <el-radio-group v-model="newProjectInfo.isPublic" :disabled="newProjectInfo.projectType == 'communal'">
              <el-radio value="private" >私有</el-radio>
              <el-radio value="public">公开</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="存储方式">
            <el-radio-group v-model="storage" :disabled="newProjectInfo.projectType != 'personal'">
              <el-radio value="cloud">云空间</el-radio>
              <el-radio value="local">本地空间</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item label="参与者" v-if="newProjectInfo.projectType != 'personal'">
          </el-form-item> -->

          <el-form-item  label="描述">
            <el-input
              v-model="newProjectInfo.desc"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="项目描述"
            />
          </el-form-item>

          <el-form-item>
            <el-row style="width:100%;justify-content: flex-end;">
              <el-button @click="isOpenDialog_newProject = false">取消</el-button>
              <el-button type="primary" @click="createNewProject">创建</el-button>
            </el-row>
          </el-form-item>

        </el-form>
      </el-row>
<!-- 改成表单的，原因：对话框与表单有样式padding，提交按钮应该和表单其他行有相同的padding样式 -->
<!-- <template #footer> 
        <div class="dialog-footer">
          <el-button @click="centerisOpenDialog_newProject = false">取消</el-button>
          <el-button type="primary" @click="createNewProject()">创建</el-button>
        </div>
      </template> -->
    </el-dialog>
    <el-dialog
      v-model="isOpenDialog_feedback"
      title="我有一个好Idea"
      width="800"
    >
      <el-row class="pDialog">
        <!-- <el-anchor
          :container="form_newProject"
          direction="vertical"
          type="default"
          :offset="30"
        >
          <el-anchor-link href="#projectName" title="信息" />
          <el-anchor-link href="#projectType" title="权限" />
          <el-anchor-link href="#projectDesc" title="描述" />
        </el-anchor> -->

        <el-form ref="form_newProject" :model="newProjectInfo" label-width="auto" class="from_newProjectInfo" @submit.prevent :rules="newProjectInfo_rules">
          请输入产品功能问题及改进建议
          <el-form-item>
            <el-input
              v-model="newProjectInfo.desc"
              type="textarea"
              placeholder="请输入您的意见/建议(500字以内)"
            />
          </el-form-item>
          <el-form-item label="项目名" prop="name">  
            <el-input v-model="newProjectInfo.name" maxlength="15" show-word-limit/>
          </el-form-item>
          <el-form-item label="标签">
            <el-tag
              v-for="(tag, index) in newProjectInfo.tags"
              :key="tag"
              closable
              type="primary"
              :disable-transitions="false"
              @close="handleClose(index)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              v-model="inputValue"
              style="width:5rem"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-newTag" size="small" @click="showInput"> + 添加 </el-button>
          </el-form-item>

          <!-- <el-form-item id="projectType" label="项目类型">
            <el-radio-group v-model="newProjectInfo.projectType">
              <el-radio value="personal">个人</el-radio>
              <el-radio value="multi">多人</el-radio>
              <el-radio value="communal">社区</el-radio>u【
            </el-radio-group>
          </el-form-item> -->

          <el-form-item label="是否公开">
            <el-radio-group v-model="newProjectInfo.isPublic" :disabled="newProjectInfo.projectType == 'communal'">
              <el-radio value="private" >私有</el-radio>
              <el-radio value="public">公开</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="存储方式">
            <el-radio-group v-model="storage" :disabled="newProjectInfo.projectType != 'personal'">
              <el-radio value="cloud">云空间</el-radio>
              <el-radio value="local">本地空间</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item label="参与者" v-if="newProjectInfo.projectType != 'personal'">
          </el-form-item> -->

          <el-form-item>
            <el-row style="width:100%;justify-content: flex-end;">
              <el-button @click="isOpenDialog_newProject = false">取消</el-button>
              <el-button type="primary" @click="createNewProject">创建</el-button>
            </el-row>
          </el-form-item>

        </el-form>
      </el-row>
<!-- 改成表单的，原因：对话框与表单有样式padding，提交按钮应该和表单其他行有相同的padding样式 -->
<!-- <template #footer> 
        <div class="dialog-footer">
          <el-button @click="centerisOpenDialog_newProject = false">取消</el-button>
          <el-button type="primary" @click="createNewProject()">创建</el-button>
        </div>
      </template> -->
    </el-dialog>
    <el-dialog
      v-model="isOpenDialog_notice"
      title="通知列表"
      width="1000"
    >
      <el-row class="dialogBody_notice" v-if="noticeList.length != 0">
        <el-segmented
          v-model="noticeIndex"
          :options="noticeList_formatting"
          direction="vertical"
          :size="300"
        >
        </el-segmented>
        <div class="dialogContent_notice">
          <h2 style="text-align: center;">{{ noticeList[noticeIndex].title }}</h2>
          <p style="margin: 1rem 0px" >{{ noticeList[noticeIndex].description }}</p>
          <RouterLink :to="noticeList[noticeIndex].link" target="_blank">
            <span style="float: right; color: #245dff">前往查看 GO</span> 
          </RouterLink>
        </div>
      </el-row>
      <el-row class="dialogBody_notice2" v-else>没有任何通知！</el-row>
    </el-dialog>

  </el-container>
</template>
 
<script setup>
import { ref,reactive,watch,computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {useStore} from '../../util/useStore'
import { createDiary} from "@/api/api";
import { ElMessage, ElMessageBox } from 'element-plus'

// import {ProjectsService} from '../../indexedDBServices/xiaohuohuaDB/ProjectsService'
// import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'

// import { DEFAULT_STYLE } from '@seewod/mycanvas'
// import { 
//   preOption
// } from '../../../constants.js'
import { onMounted } from 'vue'

const router = useRouter();
const store = useStore();
// 左右菜单相关
const activeIndex = ref("/view/workplace/diary")

const hasNewNotice = ref(true)
const hasNewMessage = ref(true)
const hasNewTutorial = ref(true)


const isCollapseLeft = ref(true);
const isCollapseRight = ref(true);
const changeCollapseLeft =()=> {
  if(isCollapseLeft.value){
    isCollapseLeft.value = false
    isCollapseRight.value = true
  }else{
    isCollapseLeft.value = true
  }
}
const changeCollapseRight =()=> {
  if(isCollapseRight.value){
    isCollapseRight.value = false
    isCollapseLeft.value = true
  }else{
    isCollapseRight.value = true
  }
}
const isOpenDialog_feedback = ref(false)
const form_feedback = ref()
const feedback = reactive({
  text: '',
  images: [],
})
//新建项目相关
const isOpenDialog_newProject = ref(false)
const form_newProject = ref()

const storage = ref('local')
const newProjectInfo = reactive({
  name: '',
  tags: [],
  projectType: 'personal',
  isPublic: 'private', //公享仓库，私有仓库
  participator: [store.userInfo._id], //[]  数组personal length为1
  desc:''
})
const newProjectInfo_rules = reactive({
  name: [
    { required: true, message: '项目名不能为空', trigger: 'blur' },
  ],
})

let multi_participator = [store.userInfo._id] //缓存一下
let communal_participator = [store.userInfo._id] //缓存一下

watch(()=> newProjectInfo.projectType,() => {
  if(newProjectInfo.projectType == 'personal'){
    newProjectInfo.participator = [store.userInfo._id]
  }else if(newProjectInfo.projectType == 'multi'){
    newProjectInfo.participator = multi_participator
    storage.value = 'cloud'
  }else if(newProjectInfo.projectType == 'communal'){
    newProjectInfo.participator = communal_participator
    newProjectInfo.isPublic = 'public'
    storage.value = 'cloud'
  }
})

function reset_newProjectInfo(){
    newProjectInfo.name = '',
    newProjectInfo.tags = [],
    newProjectInfo.isPublic = 'private', //公享仓库，私有仓库
    newProjectInfo.projectType = 'personal',
    newProjectInfo.participator = '', //[]  数组personal length为1
    newProjectInfo.desc = ''
  
  storage.value = 'local',
  multi_participator = [store.userInfo._id] //缓存一下
  communal_participator = [store.userInfo._id] //缓存一下
}
async function createNewProject(){
  //表单验证
  try {
    let isValid = await form_newProject.value.validate()

    console.log(isValid)
    if (isValid) {
  //-----------------

    let currentStorage = storage.value //由于router.push 是事件任务，避免reset后storage重置
    let data = {
      ...newProjectInfo,
      data: {
        theme: {
          // preOption,
          defaultStyle: DEFAULT_STYLE
        },
        elements:[]
      }
    }
    let result_id = null
    //2.判断是 本地存储 还是 云存储 - 项目存储到不同的 数据库中
    if(storage.value == 'local'){
      //存储到本地 数据库中
      // result_id =  await ProjectsService.add(JSON.parse(JSON.stringify(data)))
    }else if(storage.value == 'cloud'){
      //存储到服务器 数据库中
      let res = await axios.post('/main/createProject', data)
      console.log("项目创建成功")
      result_id = res.data.data.projectId
    }
    //重置表单
    reset_newProjectInfo()
    router.push({
      name:'editor',
      query:{
        _id: result_id,
        storage: currentStorage
      }
    })

  //---------
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  } catch(e) {

  }
}

const isOpenDialog_notice = ref(false)
const noticeList = ref([
  {
    noticeId: "0",
    title: "3.0.2版本上线，欢迎查看新功能！",
    description: "sadfasdfas",
    link: "xxxxxx"
  },
  {
    noticeId: "1",
    title: "3.0.2版本上线，欢迎查看新功能！",
    description: "7879845213",
    link: "xxxxxx"
  },
  {
    noticeId: "2",
    title: "3.0.2版本上线，欢迎查看新功能！",
    description: "回复更好的体验的工厂那边发的干扰",
    link: "xxxxxx"
  },
])


const noticeList_formatting = computed(() => {
  return noticeList.value.map((item,index)=>{
    return {
      value: index,
      description: item.description,
      label: item.title,
      link: item.link,
    }
  })
})
const noticeIndex = ref(0)


//新建项目 标签属性 相关
const inputVisible = ref(false)
const inputValue = ref('')
const showInput = () =>{
  inputVisible.value = true
}
const handleInputConfirm = () =>{
  newProjectInfo.tags.push(inputValue.value)
  inputValue.value = ''
  inputVisible.value = false
}
const handleClose = (index) =>{
  newProjectInfo.tags.splice(index,1)
}
//用户 相关
const logout =() =>{
  store.reset()
  localStorage.removeItem("infoStore")
  localStorage.removeItem("token")
  router.push("/workplace/login")
}


function createDiary_(){
  // createDiary().then((res)=>{
    activeIndex.value = '/view/workplace/diary'
    router.replace({ path: '/view/workplace/diary' })
  // })
}
function nothing(){
  ElMessage("我们正在开发中，感谢您的期待！")
}
//
onMounted(()=>{
  //获取通知列表
  // axios.get("/main/getNotices").then(res => {
  //   noticeList.value = res.data.data
  //   console.log(res.data)
  // });
  //websocket 连接最新通知——暂略
})
</script>

<style lang="less">
body{
  --line-color: #dcdcdc; //划分行
}
.el-tag.is-closable {
    padding-right: 10px;
}
.el-tag{
    margin:2px 2px 2px 0px;
}
.el-dialog{
  padding: 0px !important;
  overflow: hidden;

  --el-font-size-large: 14px;
}
.el-dialog__header.show-close{
  padding: 10px 10px 5px 10px;
  font-size: 12px;
  // --el-dialog-font-line-height: 12px;
  border-bottom:1px solid #ebeef5;
}
.el-dialog__body{
  // padding:0px 10px;
}
// .el-form-item{
//   margin-bottom: 12px !important; 
// }
// .el-divider--horizontal{
//   margin: 12px 0px 24px;
// }

.switchList{
    display:flex;
    flex-direction: column;
    position:absolute;
    bottom:16rem;
    right:1rem;
}
.switchList li{
    position:relative;
    top:0px;
    width:2rem;
    height:2rem;
    margin:5px 0px;
    /* background:#ffff;
    border-radius: 5px; */
    transition: all ease 0.4s;

    text-align: center;
    line-height: 2rem;

    /* box-shadow:
        2px 2px 12px rgba(255, 255, 255, .2),
        inset 2px 2px 6px rgba(0, 0, 0, .2); */
}

.switchList li i{
    /* display:inline-block;
    width: 100%;
    height: 100%; */
    color:#000;
    font-size: 1.8rem;
    transition: all 0.25s;
    border-radius: 50%;
}
.switchList li i:hover{
    /* box-shadow: 0px 0px 10px #fff; */
}
</style>

<style scoped lang="less">
.el-container{
    width: 100%;
    height: 100%;

    overflow: hidden; //防止外边距合并
    background:#f6f6f6;

    // & > *{
    //   height:100%;
    // }

        //其他要用到的变量
    --coverImgWidth: 210px;
    --coverImgHeight: 140px;

    ::-webkit-scrollbar {
        width:5px;
    }
    ::-webkit-scrollbar-thumb{
        // background: #0003;
        background: #000;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
        border-radius: 10px;
    }

}




.header {
  height: 100px;

  border-bottom: 1px solid var(--line-color);
  padding-bottom:0.5rem;

  position: relative;
  color: var(--el-text-color-primary);

  & > .el-row{
    display:flex;
    align-items: center;
    height:50px;

    & > *{
      margin: 0px 0.5rem;
    }
  }
  .logoFrame{
    margin: 0.5rem 0px 1rem;
    padding: 0.5rem 0px;
    display:flex;
    justify-content: center;
    align-items: center;
    // border-bottom: 1px solid rgba(0 0 0 / 0.1);
    img{
      margin: 0px 0.5rem;
      height: 1.8rem;
    }
    span{
      font-family: 楷体;
      font-size: 1.2rem;
      font-weight: bold;
    }

  }
  .main-menu{
    position:absolute;
    padding:5px 0px 0px 0px;
    width: 100%;
    height:100%;
    border-right: none;

    font-size: 2rem;


    --el-menu-icon-width: 1rem; //图标宽度 仅限于.main-menu，下同
    --el-menu-base-level-padding: 0.75rem;
  }
  // .main-menu.el-menu--collapse {
  //     width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)* 2);
  // }
  // .main-menu:not(.el-menu--collapse) {
  //   width: 5rem;
  //   // min-height: 400px;
  //   .menu-icon{
  //     margin-right: 0.5rem;
  //   }
  // }
  // .main-menu-left{
  // // border-radius: 10px;
  //   left:0px;
  //   box-shadow: 1px 0px 0px var(--line-color);
  // }
  // .main-menu-right{
  //   right:0px;
  //   box-shadow: -1px 0px 0px var(--line-color);
  // }




  .menu-button{
    padding: 3px 2px;
    font-size:1.2rem;
    opacity:0.6;
    height: calc(1.2rem + 6px);
  }
  .logo{
    height:2.3rem;
  }
  .search{
    margin-left:auto;
  }

  .icons{
    margin: 0px 0.25rem 0px 0.5rem;
    .headerIcon{
      margin: 0px 0.25rem;
      width:1.3rem;
      height:1.3rem;
      font-size: 1.8rem;
      transition: all 0.5s;
      border-radius: 0.5rem;
      // background:#894523;
      &:hover{
        position:relative;
        top: -0.1rem;
        // filter: invert(1) brightness(1.1);
        background: #efefef;
      }
    }

  }
  .createB{
    font-size: 1rem;
    margin-right: 0.5rem;
    width:1.2rem;
    height:1.2rem;
    // width: 2rem;
    // height: 2rem;
    // filter: drop-shadow(0px 0px 0.1rem #ff4f43);
    // transition: all 0.5s;

    // &:hover{
    //   filter: drop-shadow(1px 1px 0.4rem #ff4f43);
    // }
  }
  .avactor{
    width:2rem;
    height:2rem;
    border-radius:1.5rem;
    // border: 1px solid rgb(0 0 0 / 0.1);
    border: 0.25rem solid transparent;
    
    transition: border 0.5s;
    &:hover{
      border: 0.25rem solid #dedede;
    }
  }
}
.main {
  display:flex;
  padding: 0;
  position:relative;

  .main-center{
    margin:0px 2.5rem;
    width:100%;
    background:#ffffff;
  }
}

.el-divider--horizontal {
    width:calc(100% - 1rem);
    margin:0.5rem 0.5rem 0px;
    opacity:0.75;
}

.pDialog{
  width: calc(100% - 40px);
  height:380px;
  margin: 20px 20px 20px 20px;
  // padding: 0px 10px 10px 10px;

}

.from_newProjectInfo::-webkit-scrollbar {
  display: none;
}
.from_newProjectInfo{
  padding: 0% 10%;
  width:80%;
  height:100%;
  overflow:scroll;
  // float:right;
  position:absolute;
  right:0px;
  top:0px;
  // padding:1rem;
  
}

.dialogBody_notice{
  margin: 0px;
  width: 1000px;
  height:500px;

  .el-segmented{
    --el-segmented-bg-color: rgb(250 250 250);
    --el-segmented-item-selected-bg-color: #47a2ff;
    padding:0px;
  }
  &:deep(.el-segmented__group){
    width:250px;
    display:block;
    overflow-y: auto;
  }
  &:deep(.el-segmented__item){
    padding: 10px 15px;
  }
  .dialogContent_notice{
    padding: 2rem;
    width: calc(750px - 4rem);
    overflow-y:auto;
  }
}
.dialogBody_notice2{
  display:flex;
  justify-content: center;
  align-content: center;

  width: 1000px;
  height:500px;
}




.el-menu-item{
  margin-right: 1.5rem;
  padding:0px;
  font-size: 1rem;

    //   & > *{
    //   height: 100%;
    //   display:flex;
    //   align-items: center;
    // }
}
.menuIcon{
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
// .menuIcon::before{
//   height:100%;
//   font-size: 1.2rem;
//   margin-right: 0.5rem;
//         display:flex;
//         justify-content: center;
//       align-items: center;

// }
.el-menu--horizontal>.el-menu-item {
    border-bottom: 4px solid transparent;
    display:flex;
    align-items: center;
}
.el-menu--horizontal.el-menu {
  background: transparent;
  border-bottom: none;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 4px solid var(--el-menu-active-color);
  border-radius: 2px;
  // color: 
  color: var(--el-menu-text-color) !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color: transparent;
     color: var(--el-menu-text-color) !important;
}




.scrollMask{
  position: absolute;
  top: 0px;
  width: 100%;
  height: 25px;
  z-index: 9999; /* 提高层级 */
  // background: linear-gradient(to bottom, #f6f6f6, transparent); 关键功能
}



</style>