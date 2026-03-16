<template>
  <div class="wrapper">
    <div class='content'>
      <div style="padding: 1rem 0px 0px">个人信息</div>
      <el-divider />
      <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          
          :on-change="handleChange">
          <img :src="avatarURL" class="avatar" />
          <i class="iconfont-xiaohuohua xiaohuohua-icon-edit edit-icon"></i>
      </el-upload>

      <el-form :model="userForm" label-width="80px" class="form_userInfo">

        <el-form-item label="用户名">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input :placeholder="store.userInfo.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit()">修改</el-button>
          <el-button type="primary" @click="cancel()">撤销</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer></Footer>    
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import {useStore} from '../../../util/useStore'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const store = useStore();
//上传到后台的信息
const userForm = reactive({
  name:store.userInfo.name,
  password: "",
  avatar:null,
})
//暂存当前avatar的地址
const avatarURL = ref(store.userInfo.avatar)
console.log(store.userInfo.avatar)
const handleChange = (uploadFile)=>{
  // uploadFile 是element-plus 设计的一个对象 raw 才是原生API提供的
  avatarURL.value = URL.createObjectURL(uploadFile.raw)
  userForm.avatar = uploadFile.raw
}

const submit = () => {
  axios.post("/user/updateInfo",userForm,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  }).then((res)=>{
    if(res.data.code === "SUCCESS_MODIFY"){
      store.changeUserInfo(res.data.data);
      ElMessage.success("修改成功")
    }
  })
}

const cancel = () => {
  userForm.name = store.userInfo.name
  userForm.password = ""
  userForm.avatar = null
  avatarURL.value = store.userInfo.avatar
}
</script>

<style scoped>
.wrapper{
  width:100%;
  height:100%;
  position: relative;
}
.content{
  margin:0px auto;
  position:relative;
  max-width: 40rem;
  min-height: calc(100% - 3rem); 
}

.form_userInfo{
  /* display:flex; */
  width:500px;
}


.avatar{
  width:5rem;
  height: 5rem;
  border-radius: 50%;
}
.avatar-uploader{
  position:absolute;
  right:0px;
  width:5rem;
  height:5rem;
  border-radius: 50%;
  border:1px solid #797979;
}
.edit-icon{
  font-size: 1rem;
  position:absolute;
  left:0rem;
  bottom:0rem;
  padding:2px;
  border-radius: 2px;
  /* border:1px solid #000000; */
  background:#ffffff;
  color:#666666;
}
</style>