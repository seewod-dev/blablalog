<template>
  <el-container>
    <div class="container">
      <header>
        <span class="headerTitle">
          <i class="iconfontcolor-xiaohuohua c_xiaohuohua-cooperation headerIcon"></i>
          合作
        </span>

        <img :src="store.userInfo.avatar" class="avactor">
      </header>

      <main>
        <div class="letterWrapper">
          <h2>携手合作，融合优势，共享机遇</h2>
          <p class="letterText">我们拥有先进的技术，诚邀各位商务伙伴。一起整合资源，对接市场，让技术迅速转化为经济效益，实现共创双赢。如果您有以下领域的合作意向，欢迎致电联系！</p>
          <p class="letterText1">白板业务拓展：</p>
          <p class="letterText">目前"在线白板"主要的业务是: 一个免费的自由白板创作平台 与 知识分享 社区。但所涉及到的相关技术并不仅仅局限于该网站、该领域。通过对这些技术的拓展开发，我们完全有能力面向更多市场。例如: 数字化教育、培训、设计策划、企业管理、AI等。如果您是相关领域的从业者，拥有相关的需求；又或者是具备相关资源能力，有意开拓相关市场；非常期待您的联系！</p>
          <p class="letterText1">技术服务：</p>
          <p class="letterText">
            基于目前的软件产品开发经验与能力，我们可以为您提供以下的技术支持服务，包括但不限于：
            <ul>
              <li>• 软件技术咨询服务</li>
              <li>• 定制化网站/小程序 的开发</li>
              <li>• 后台管理系统 的开发</li>
              <li>• 对现有网站 进行升级维护</li>
            </ul>
          </p>
          <p class="letterText">如果您有以上需求，欢迎致电咨询。</p>
          <p class="letterText1">优秀岗位邀请：</p>
          <p class="letterText">
            我是一名 全栈开发 工程师，一直在寻找能充分发挥技术影响力的舞台，如果贵公司有好的产品与业务蓝图，正在寻找优秀工程技术人员，非常期待您的邀请！ 
          </p>
          <p class="letterText">🧑‍🔧可担任岗位:  前端开发、后端开发、全栈开发</p>
          <p class="letterText">😋偏好领域:  AI、互联网、物联网</p>
          <p class="letterTextCenter">
            联系方式  📧邮箱：<a href="mailto:dongyuanchen3344@outlook.com">dongyuanchen3344@outlook.com</a>  <i class="iconfontcolor-xiaohuohua c_xiaohuohua-weixin"></i>微信：13233206026 📞电话: <a href="tel:13233206026">13233206026</a>
          </p>
          <p class="letterText">董元辰</p>
          <p class="letterText">2025.2.1</p>
        </div>
      </main>

      <footer>
        <span>QQ社区: 885413137</span>
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
      font-weight: bold;
      text-indent: 2rem;
    }
    .letterText{
      line-height: 2rem;
      text-indent: 2rem;
      li{
        text-indent: 4rem;
      }
    }
    .letterTextCenter{
      margin-top: 2rem;
      line-height: 2rem;
      text-indent: 2rem;
      text-align: center;

      i{
        font-size: 1.2rem;
      }
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