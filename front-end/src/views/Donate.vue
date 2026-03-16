<template>
  <el-container>
    <div class="container">
      <header>
        <span class="headerTitle">
          <i class="iconfontcolor-xiaohuohua c_xiaohuohua-donate10 headerIcon"></i>
          为作者充电 加油！
        </span>

        <img :src="store.userInfo.avatar" class="avactor">
      </header>

      <main>
        <div class="letterWrapper">
          <p class="letterText1">亲爱的用户：</p>
          <p class="letterText">HELLO! HELLO! 我是本站的作者——董元辰。非常感激您能来到这个页面，对"在线白板"进行赞助。</p>
          <p class="letterText">本站始于我的大学时期，我在市面上难以找到一款心仪的知识点整理工具。简单的思维导图网站，只能记录有限的结构图，而我更期待的是一款实现知识图谱(更加详细，更加多元化)的网站。为此，我设计并开发了这个网站。</p>
          <p class="letterText">期待你的声音，一起让这个白板网站变得无可替代！</p>
          <p class="letterText">董元辰</p>
          <p class="letterText">2025.1.30</p>
        </div>
        <div class="rewardWrapper">
          <div class="rewardTitle">为作者充电</div>
          <div class="rewardContent">
            <!-- 卡片 -->
            <ul class="rewardList">
              <el-card v-for="(item,index) in rewardList" :key="index" style="width: 480px" shadow="hover">
                <div class="rewardCard-tag">{{ item.price }}</div>
                <img class="rewardCard-img" :src="item.img"/>
                <span class="rewardCard-name">{{ item.name }}</span>
              </el-card>
            </ul>

            <div style="text-align: center;">—— 感 谢 各 位 的 支 持 ——</div>

            <!-- 分页模块 -->
            <ul class="rewardRecordList">
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>
              <li class="rewardRecordItem">
                <span class="avactarGroup">
                  <img :src="store.userInfo.avatar"  class="avactor">
                  旺财
                </span>
                <span>投喂: {{  }}啊手动阀手动阀</span>
                <span>留言: {{  }}啊手动阀手动阀撒</span>
              </li>

            </ul>
            <div style="display:flex;justify-content: center;">
              <el-pagination size="small" layout="prev, pager, next" :total="50" />
            </div>
          </div>
        </div>
        <div class="promotionWrapper">
          <div class="promotionTitle">帮忙分享</div>
          <div class="promotionContent">
            <span>消 息 分 享</span>
            <img src="../../images/messagePic.jpg">
            <el-button @click="copyPromotionMessage">复 制 消 息</el-button>
          </div>
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
import { reactive } from 'vue';
import { ElMessage } from 'element-plus'

const store = useStore();

const router = useRouter();

const rewardList = reactive([
  {
    name: "泡面基金",
    price: "￥5",
    img: "./images/potNoodles.jpg",
  },
  {
    name: "一杯咖啡",
    price: "￥10",
    img: "./images/coffee.jpg",
  },
  {
    name: "一份小甜点",
    price: "￥20",
    img: "./images/cake.jpg",
  },
  {
    name: "汉堡午餐",
    price: "￥50",
    img: "./images/burger.jpg",
  },
  {
    name: "全家桶",
    price: "￥100",
    img: "./images/familyMeals.jpg",
  },
  {
    name: "任意红包",
    price: "自定义",
    img: "./images/redPacket.jpg",
  },
])

function copyPromotionMessage() {
  navigator.clipboard.writeText("阿斯顿发顺丰").then(
    function () {
      /* clipboard successfully set */
      ElMessage({
        message: '已复制到剪切板',
        grouping: true,
        type: 'success',
      })
    },
    function () {
      /* clipboard write failed */
    },
  );
}
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
}
.avactor{
  width:2rem;
  height:2rem;
  border-radius:1.5rem;
}
.avactarGroup{
  display:flex;
  align-items: center;
  & > *{
   margin-right: 0.5rem;
  }
}

main{
  min-height: calc(100vh - 4rem - 2rem - 70px);
  padding-top: 2rem;
  .letterWrapper{
    margin: 0 auto;
    // background:#fff;
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
      background:#eee;
      box-shadow: 0px 0px 5px rgb(0 0 0 / 0.07);
      width: 250px;
      border-radius:0.5rem;
    }
  }
  .rewardWrapper{
    margin: 2rem auto 0px;
    .rewardTitle{
      margin: 1rem auto 0;
      // width: 150px;
      text-align: center;
      font-weight:bold;
      font-size: 1.5rem;
      color: #898989;
    }
    .rewardContent{
      margin: 2rem auto 0px;
      padding: 3rem;
      width: 1000px;
      background:#fff;
      border-radius: 1rem;

      .rewardList{
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .el-card{
          margin: 0px 0px 2rem;
          flex: 0 0 250px;
          width: 250px;
          height: 150px;
          position: relative;
          transition: top 0.5s ease-in-out;
          border-radius: 0.5rem;
          top: 0rem;
          &:hover{
            top: -0.5rem;
            border: 1px solid #785181;
            // filter: invert(1) brightness(1.1);
          }

          &:deep(.el-card__body){
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0px;

            .rewardCard-tag{
              position: absolute;
              top:0px;
              right:0px;
              border-radius: 0px 0.25rem 0px 0.25rem;
              line-height: 2rem;
              text-align: center;
              width: 4rem;
              height: 2rem;
              background: #894516;
              color:#fff;
              font-weight: bold;

            }
            .rewardCard-img{
              width: 80px;
            }
            .rewardCard-name{
              font-weight: bold;
            }
          }
        }
      }

      .rewardRecordList{
        padding: 2rem;
        font-family: 楷体;

        .rewardRecordItem{
          padding: 0.25rem 0px;
          display:flex;
          align-items: center;
          & > * {
            margin: 0px 5rem 0px 0px; 
          }
        }
      }
    }
  }
  .promotionWrapper{
    margin: 10rem auto 5rem;
    .promotionTitle{
      margin: 3rem auto 0px;
      text-align: center;
      font-weight:bold;
      font-size: 1.5rem;
      color: #898989;
    }
    .promotionContent{
      margin: 2rem auto 0px;
      padding: 2.5rem 0px;
      width: 300px;
      height: 400px;
      background:#fff;
      border-radius: 1rem;
      display:flex;
      flex-direction: column;
      align-items: center;

      span{
        font-weight: bold;
        font-size: 1rem;
      }
      img{
        margin: 2rem 0px;
        width: 250px;
      }
      .el-button{
        width: 150px;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        background: blue;
        color: #fff;
        font-weight: bold;
        border-radius: 2rem;
      }
    }
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