import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import './styles/reset.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import './styles/newTheme.css'
import './styles/iconfont_mycanvas.css'
import './styles/iconfont_xiaohuohua.css'
import './styles/iconfont_note.css'
import './styles/iconfont_yinghuo.css'
import './styles/iconfont_hefeng.css'

import ElementTiptapPlugin from 'element-tiptap';
// import element-tiptap 样式
import 'element-tiptap/lib/style.css';

import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/util/axios.config' //设置全局axios拦截

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(ElementPlus)
app.use(ElementTiptapPlugin);
app.use(router)
app.use(pinia)
app.mount('#app')
