import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue'
// import Tutorial from '../views/Tutorial.vue'
// import Donate from '../views/Donate.vue'
import Feedback from '../views/Feedback.vue'
// import Cooperation from '../views/Cooperation.vue'
// import Developing from '../views/Developing.vue'
import NotFound from '../views/NotFound.vue'

import Workplace from '../views/Workplace.vue'
import Login from '../views/Login.vue'
import Main from '../views/workplace/Main.vue'
//canvas
// import Editor from '../views/workplace/canvas/Editor.vue'
// import Viewer from '../views/workplace/canvas/Viewer.vue'

import Panel from '../views/workplace/main/Panel.vue'
import Diary from '../views/workplace/main/Diary.vue'
// import MyProject from '../views/workplace/main/MyProject.vue'
// import MySelf from '../views/workplace/main/MySelf.vue'

const routes = [
  {
    path: '/',
    redirect: "/view/index",
  },
  {
    path: '/view/index',
    name: 'index',
    component: Index,
  },
  {
    path: '/view/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/view/workplace/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '', //空路由只作为 framework
        redirect: "/view/workplace/panel",
      },
      {
        path: 'panel',
        component: Panel,
      },
      {
        path: 'diary',
        component: Diary,
      },
    ]
  },
  // {
  //   path: '/tutorial',
  //   name: 'tutorial',
  //   component: Tutorial,
  // },
  // {
  //   path: '/donate',
  //   name: 'donate',
  //   component: Donate,
  // },
  {
    path: '/view/feedback',
    name: 'feedback',
    component: Feedback,
  },
  // {
  //   path: '/cooperation',
  //   name: 'cooperation',
  //   component: Cooperation,
  // },
  // {
  //   path: '/developing',
  //   name: 'developing',
  //   component: Developing,
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: NotFound
  }
]

// const afterRoutes = [
//   {path: '/home',name: 'home',component: Home},
//   {path: '/center',name: 'center',component: Center},

//   {path: '/mainBox/userAdd',name: 'userAdd', component: ()=>import('../views/user-manage/UserAdd.vue')},
//   {path: '/mainBox/userList',name: 'userList',component: ()=>import('../views/user-manage/UserList.vue')},

//   {path: '/mainBox/productAdd',name: 'ProductAdd',component: ()=>import('../views/product-manage/ProductAdd.vue')},
//   {path: '/mainBox/productList',name: 'ProductList',component: ()=>import('../views/product-manage/ProductList.vue')},
//   {path: '/mainBox/productEdit/:id',name: 'productEdit',component: ()=>import('../views/product-manage/ProductEdit.vue')},

//   {path: '/mainBox/newsAdd',name: 'newsAdd',component: ()=>import('../views/news-manage/NewsAdd.vue')},
//   {path: '/mainBox/newsList',name: 'newsList',component: ()=>import('../views/news-manage/NewsList.vue')},
//   {path: '/mainBox/newsEdit/:id',name: 'newsEdit',component: ()=>import('../views/news-manage/NewsEdit.vue')},
// ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from)=>{
  if(to.name == 'login' || to.name == 'index'){
    //什么都没有 默认为导航有效
  }else{
    if(!localStorage.getItem("token")){
      //未认证(登录)，跳转到登录页面
      return {name:'login'};
    }else{
      // console.log("??")
      //什么都没有 默认为导航有效，进行下一个导航守卫
      // if(!store.state.isGetterRouter){
      //   configureRote();
      //   store.commit('changeGetterRouter',true);
  
      //   return to.fullPath;
      //   //返回重新定向 可以是地址、路由对象
      // }else{
        //什么都没有 默认为导航有效，进行下一个导航守卫
      // }
    }
    //
  }
})
// function configureRote(){
//   afterRoutes.forEach((r) =>{
//     router.addRoute('mainBox',r);
//     console.log(router);
//   });
// }

export default router;
