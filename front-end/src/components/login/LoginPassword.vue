<template>
  <el-form :model="form" ref='formRef' class="form" :rules="loginRules">
    <el-form-item prop="email">
      <el-input v-model="form.email" size="large" placeholder="请输入邮箱地址" clearable />
    </el-form-item>
    <el-form-item inline-message="true"  prop="password">
      <el-input v-model="form.password" size="large" type="password" placeholder="请输入密码" clearable />
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
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import {useStore} from '../../util/useStore'
import { ElMessage } from 'element-plus'

const router = useRouter();
const store = useStore();
const formRef = ref(null)
const form = reactive({
  email: '',
  password: '',
  autoLogin: false,
})
let loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'no' },
    { type: 'email', message: '邮箱格式错误', trigger: 'no' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'no' },
    { min: 8, max: 16, message: '密码错误', trigger: 'no' },
  ],
}
const onSubmit = () => {
    formRef.value.validate((valid) => {
    console.log(valid);
    if(valid){
      //提交表单
      axios.post('/login/passwordLogin',form).then(res =>{
        if(res.data.code === "SUCCESS_VERIFY"){
          store.changeUserInfo(res.data.data)  //将应用需要的用户信息保存到全局状态中
          const {authorization} = res.headers
          authorization && localStorage.setItem("token",authorization)
          router.push("/workPlace/main/panel")
        }else{
          ElMessage.error('用户名或密码错误')
        }
      })
    }
  });
}
</script>





<style scoped>
.el-form-item {
  margin-bottom: 1rem;
}
.priButton{
    width:100%;
}
</style>