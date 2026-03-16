<template>
  <el-container>
    <el-main>
      <div class="mainContent">
        <img src="../assets/indexPicture.webp">
        <div class="textPart">
          <p class="boldText">你的每一刻,<br>都值得被珍藏——[废话日记]<br>日记网站全新上线！</p>
          <p class="lighterText">废话日记,一个能用的日记网站。为每一个<br>热爱生活、乐于记录的你打造的<br>专属空间</p>
          <el-button class="loginBtn" @click="router.push('/view/workplace/diary')">Go See It</el-button>
        </div>
      </div>
    </el-main>

    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Footer from '../components/Footer.vue'

const router = useRouter()
</script>

<style lang="less" scoped>
.el-container {
    width: 100%;
    height: 100%;
    // overflow: hidden; //防止外边距合并
}
.el-main{
  padding:0px;
  width: 100%;
  // height: calc(100% - 50px);
  
  display: flex;
  justify-content: center;
  align-items: center;

  .mainContent{
    margin-bottom: 50px;
    width: 75rem;
    aspect-ratio: 2 / 1;
    position: relative;
    
    img{
      width: 62.5rem;
    }
    .textPart{
       position: absolute;
       right:0px; 
       bottom: 7rem;
       font-family: '微软雅黑';

       .boldText{
          margin-bottom: 2rem;
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 2px;
          line-height: 1.5rem;
       }
       .lighterText{
        margin-bottom: 2rem;
        font-size: 12px;
        font-weight: lighter;
        letter-spacing: 2px;
        line-height: 16px;
       }
       .loginBtn{
          border-radius: 1.5rem;
          border:none;
          height:2.5rem;
          width: 9rem;
          line-height: 2.5rem;
          background: #424348;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 2px;
        }
    }
  }
  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .mainContent{
      transform: scale(0.825)
    }
  }
}
.el-footer{
  width: 100%;
  height: 50px;
}
</style>

