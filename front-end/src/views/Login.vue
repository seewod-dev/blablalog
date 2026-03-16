<template>
  <el-row class="container">

    <el-col :span="15" class="picturePart">
      <el-carousel height="100vh">
        <el-carousel-item v-for="item in pictureList" :key="item" :style="{background: item.color}">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
    </el-col>

    <el-col :span="9" class="loginPart">
      <div class="frame">
        <img class="logo" src="../assets/logo2.webp">
        <LoginVerCode></LoginVerCode>
        <p class="form_tip">
          未注册过的手机号，我们将自动帮您注册账号<br/>
          登录或完成注册代表您同意 <a href="">用户协议</a> 和 <a href="">隐私政策</a>
        </p>
      </div>
      <Footer style="position: absolute; bottom: 0px;"></Footer>
    </el-col>
    
  </el-row>
</template>

<script setup>
import LoginVerCode from '../components/login/LoginVerCode.vue'
import Footer from '../components/Footer.vue'
import {HOST_minio} from '../api/api'

const pictureList = [
  {url: `${HOST_minio}/assets/showPicture/0.webp`, color: '#f3f3f3'},
  {url: `${HOST_minio}/assets/showPicture/1.webp`, color: '#dfdde1'},
  {url: `${HOST_minio}/assets/showPicture/2.webp`, color: '#e4e1e5'},
  {url: `${HOST_minio}/assets/showPicture/3.webp`, color: '#ebe9eb'},
  {url: `${HOST_minio}/assets/showPicture/4.webp`, color: '#efefed'},
  {url: `${HOST_minio}/assets/showPicture/5.webp`, color: '#efefed'},
  {url: `${HOST_minio}/assets/showPicture/6.webp`, color: '#edebec'},
  {url: `${HOST_minio}/assets/showPicture/7.webp`, color: '#f1f1f1'},
  {url: `${HOST_minio}/assets/showPicture/8.webp`, color: '#eae9e5'},
  {url: `${HOST_minio}/assets/showPicture/9.webp`, color: '#efefee'},
]
</script>

<style scoped lang="less">
.container{
  height: 100%;
}
.picturePart{
  & :deep(.el-carousel__item){
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center; 

    & > img{
      width: 75%;
    }

  }
  & :deep(.el-carousel__indicators--horizontal){
    bottom: 5rem;
  }
}

.loginPart{
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  position: relative;

  .frame{
    margin:0px auto;
    padding:3rem;
    width:18rem;
    height: 25rem;
    border-radius: 0.5rem;
    position:relative;

    .logo{
      width:10rem;
      margin:0px auto;
      padding:0rem 0px 2rem;
      display:block;
    }
    .form_tip{
      position:absolute;
      padding:1.5rem 0px;
      bottom:1.5rem;
      width:calc(100% - 6rem);

      border-top: 1px solid rgb(231, 231, 231);
      font-size:12px; 
      line-height: 1rem;
      font-weight: lighter;
      font-family: "楷体";
      text-align: center;
    }
  }

}
</style>