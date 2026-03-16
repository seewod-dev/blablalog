<template>
  <el-form :model="form" ref='formRef' class="form" :rules="rules">
    <el-form-item prop="email">
      <el-input v-model="form.email" size="large" placeholder="请输入邮箱地址" clearable />
    </el-form-item>
    <el-form-item inline-message="true" prop="verCode">
      <el-input v-model="form.verCode" size="large" style="width: calc(100% - 100px)" placeholder="请输入验证码" clearable />
      <el-button link ref="verB" size="large" style="width: 100px" :type="verBType" :disabled="verBDisabled" @click="getMailCode()">{{verBString}}</el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="priButton" size="large" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
    <el-form-item style="position: relative; top:-1rem">
      <el-checkbox v-model="form.autoLogin" label="30天免登录" size="large" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive,ref } from 'vue'
import { useRouter} from 'vue-router'
import axios from 'axios'
import {useStore} from '../../util/useStore'
import { ElMessage } from 'element-plus'

const router = useRouter();
const store = useStore();
const formRef = ref(null)
const form = reactive({
  email: '',
  verCode: '',
  autoLogin: false,
})
let loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'no' },
    { type: 'email', message: '邮箱格式错误', trigger: 'no' },
  ],
  verCode: [
    { required: true, message: '请输入验证码', trigger: 'no' },
    { min: 3, max: 5, message: '验证码错误', trigger: 'no' },
  ],
}
let sendverCodeRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'no' },
    { type: 'email', message: '邮箱格式错误', trigger: 'no' },
  ],
}
const rules = ref(loginRules)

const verBString = ref('获取验证码') //verB按钮的 DOM引用
const verBType = ref('primary')
const verBDisabled = ref(false)


const getMailCode = () => {
  rules.value = sendverCodeRules
  formRef.value.validate((valid) => {
    console.log(valid);
    if(valid){
      //发送
      axios.post('/login/getMailCode',{
          email: form.email
      }).then(res =>{
          // console.log(res.data)
      })

    //计时重置按钮
      let count = 60;
      verBType.value = 'info'
      verBDisabled.value = true
      verBString.value = `重新发送(${count})`
      let reVerTimer = setInterval(()=>{
          if(count > 1){
              count -= 1
              verBString.value = `重新发送(${count})`
          }else{
              verBString.value = '获取验证码'
              verBDisabled.value = false
              verBType.value = 'primary'
              clearTimeout(reVerTimer)
          }
      }, 1000)
    }
  });
}
const onSubmit = () => {
  rules.value = loginRules
  formRef.value.validate((valid) => {
    console.log(valid);
    if(valid){
      //提交表单
      axios.post('/login/verCodeLogin',form).then(res =>{
        if(res.data.code === "SUCCESS_VERIFY"){
          console.log(res.data.data)
          store.changeUserInfo(res.data.data)  //将应用需要的用户信息保存到全局状态中
          const {authorization} = res.headers
          authorization && localStorage.setItem("token",authorization)
          router.push("/view/workplace/diary")
        }else{
          ElMessage.error('用户名或验证码错误')
        }
      })
    }
  });
}
</script>

<style>
.form .el-input__inner{
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 999px inset;
}
</style>
<style scoped>
.el-form-item {
  margin-bottom: 1rem;
}
.priButton{
    width:100%;
}
</style>