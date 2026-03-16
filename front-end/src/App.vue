<template>
  <router-view/>
</template>

<style lang="less">
//自适应设计 暂时还没搞
@media screen and (width: 1920px) {
  html{
    font-size:16px;
  }
}
// @media screen and (min-width: 1200px) and (max-width: 1500px) {
//   html{
//     font-size:12px;
//   }
// }
//特殊节日 哀悼样式 //不行会对内部颜色调整的出现问题
// body{
//   filter: grayscale(1);
// }
#app {
  /*
    注意: #app就已经限制 网站的实际高度只有100vh
    其余页面的父元素都是#app，通过'#app'的<router-view>实现的路由，所以内部所有的 需要高度大于100vh的页面，都要在其.container或其他元素内进行overflow：auto/scroll
  */
  width: 100%;
  min-width: 1200px;
  height: 100vh;

  overflow:hidden; //清除 内部(workplace) 外边距合成到app 塌陷（内部是100% - 2*margin px,margin合成到外面，造成内部就是100% - margin-bottom px了）
}
</style>