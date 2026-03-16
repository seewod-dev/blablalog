<template>
  <el-container>
    <div class="container">
      <header>
        <span class="headerTitle">
          <i class="iconfontcolor-xiaohuohua c_xiaohuohua-feedback3 headerIcon"></i>
          建议反馈
        </span>

        <img :src="store.userInfo.avatar" class="avactor">
      </header>

      <main>
        <div class="letterWrapper">
          <h2>✨ 您的理想日记本，由您定义 ✨</h2>
          <p class="letterText1">亲爱的用户：</p>
          <p class="letterText">我们正在打造一款更懂您的日记与个人记录工具，希望倾听您的声音！无论您是：📖 日记爱好者 – 需要更流畅的书写体验？📝 学习/工作笔记达人 – 期待更好的整理功能？🎨 创意记录者 – 想要更自由的表达方式？
欢迎加入社区带来您的想法，您的建议将直接影响产品开发方向！</p>
          <p class="letterText">反馈方式超简单：加入"BlaBlaLog 交流社区"QQ群👇️，或者发送建议至邮箱 <a href="mailto:dongyuanchen3344@outlook.com">dongyuanchen3344@outlook.com</a></p>
          <img class="EQ" src="../../images/EQ.png">
          <p class="letterText">每一个好产品，都始于真实用户的声音！</p>
          <p class="letterText">董元辰</p>
          <p class="letterText">2025.5.20</p>
        </div>
      </main>

      <footer>
        <span>QQ社区: 763198234</span>
        <span>我们正在积极开发中，欢迎加入社区给出您的想法~</span>
      </footer>
    </div>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {useStore} from '../util/useStore'

const store = useStore();

const router = useRouter();
</script>

<style lang="less" scoped>
.el-container{
  height:100%;
  display:block;
  overflow-x: hidden;
  overflow-y:auto;
  background-color:#fff;
}
.container{
  background-color: rgb(250 250 250);
}
header{
  display:flex;
  justify-content: space-around;
  align-items: center;
  width:100%;
  height: 4rem;
  background:#fff;

  .headerTitle{
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    display:flex;
    align-items: center;
    // background:#194675;
    .headerIcon{
      font-size: 2rem;
    }
  }
  .avactor{
    width:2rem;
    height:2rem;
    border-radius:1.5rem;
  }
}
main{
  min-height: calc(100vh - 4rem - 70px);
  display:flex;
  align-items: center;

  .letterWrapper{
    margin: 1rem auto;
    background:#fff;
    border-radius: 1rem;
    padding: 3rem;
    // height: 800px;
    width: 900px;
    // border: 5px solid #eee;
    font-family: 楷体;

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
      background:#fcfcfc;
      box-shadow: 0px 0px 5px rgb(0 0 0 / 0.07);
      width: 250px;
      border-radius:0.5rem;
    }
  }
  a{
    color: blue;
  }
}
footer{
    margin:0px;
    padding:0px;
    width:100%;
    height: 70px;
    display:flex;
    justify-content: center;
    align-items: center;
    background: #222;
    & * {
      margin:0px 50px;
      font-size: 0.8rem;
      color: white;
      letter-spacing: 1px;
    }
}
</style>