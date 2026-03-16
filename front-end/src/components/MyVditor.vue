<template>
  <div class="panel_wrapper" ref="panel_wrapper">
    <div class="panel_bar" v-show="!isEditing">
      <span>{{ props.title }}</span>
      <span v-if="!props.readonly"><i class="iconfont-note icon-note_edit1" @click="startEdit()"></i></span>
    </div>
    <div class="theVditor vditor-reset" ref="vditorContainer"></div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted, watch } from 'vue'

import Vditor from "vditor";
import "vditor/dist/index.css"; // 引入样式

const props = defineProps({
    title: String,
    content:{
      type: String,
      default: ''
    },
    placeholder:{
      type: String,
      default: '默认标题'
    },
    //样式
    borderRadius:{
      type: String,
      default: '0px'
    },
    padding:{
      type: String,
      default: 'none'
    },
    border:{
      type: String,
      default: 'none'
    },
    background:{
      type: String,
      default: '#f6f6f6'
    },
    minHeight:{
      type: Number,
      default: 600
    },
    readonly:{
      type: Boolean,
      default: false
    }
})
const emit = defineEmits(['startEdit', 'interruptEdit', 'finishEdit', 'cancelEdit'])

//组件内一些状态 开始、中断、取消、完成 编辑只能在内部了
let isMounted = false
const isEditing = ref(false) //正在编辑？

//组件内一些事物
const vditorContainer = ref(null)
const panel_wrapper = ref(null)
let vditor = null

const toolbarDisplay =  computed(() => {
  console.log('isEditing 更改 computed'+ isEditing.value)
  return isEditing.value ? 'block' : 'none';
})
const paddingBottom =  computed(() => {
  return isEditing.value ? '41px' : '0px';
})
watch(isEditing, (newValue) => {
  console.log("isEditing 更改 watch"+ isEditing.value)
  
  if(newValue){
    //切换为编辑模式
    console.log('开始编辑')
    vditor.enable()
    vditorContainer.value.querySelector('.vditor-toolbar [data-type="preview"]').click()
  }else{
    //切换为预览模式
    console.log('开始预览')

    const editor = document.querySelector('.vditor');
    if (editor?.classList.contains('vditor--fullscreen')) {
      vditorContainer.value.querySelector('.vditor-toolbar [data-type="fullscreen"]').click();
    }
    vditor.disabled()
    vditorContainer.value.querySelector('.vditor-toolbar [data-type="preview"]').click()
  }
})
watch(() => props.content, (newContent) => {
  if (isMounted) {
    // console.log("props.content"+ isEditing.value)
    if(isEditing.value){
      //编辑模式
      emit('interruptEdit', { content: vditor.getValue()}) //发出中断前文本
      newContent ? vditor.setValue(newContent) : vditor.setValue('')
      isEditing.value = false
    }else{
      //预览模式
      vditorContainer.value.querySelector('.vditor-toolbar [data-type="preview"]').click(); //切换为编辑模式
      newContent ? vditor.setValue(newContent) : vditor.setValue('')
      vditorContainer.value.querySelector('.vditor-toolbar [data-type="preview"]').click(); //切换为预览模式
    }
    // setTimeout(() => {
    //   // 此处认为渲染已完成（适用于一般情况）
    //   console.log("setValue 设置完成，渲染应该已结束");
    // }, 0);
  }
})

// function startChange_baseData(){
//     emit('submit', { email, password })
// }
function startEdit(){
  emit('startEdit', { content: vditor.getValue()})
  isEditing.value = true
}
function finishEdit(){
  emit('finishEdit', { content: vditor.getValue()})
  isEditing.value = false
}
function cancelEdit(){
  vditor.setValue(props.content)
  emit('cancelEdit', { content: props.content})
  isEditing.value = false
}

onMounted(() => {
  // 初始化 Vditor
  vditor = new Vditor(vditorContainer.value, {
    minHeight: props.minHeight - 41,
    mode: "ir", // 模式：wysiwyg（所见即所得）、ir（即时渲染）、sv（分屏）
    lang: "zh_CN", // 明确使用英文语言包
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "|",
      "line",
      "quote",
      "list",
      "ordered-list",
      "check",
      "code",
      "inline-code",
      // "|",
      "upload",
      "link",
      "table",
      "record",
      // "edit-mode",
      // "both",
      "|",
      "undo",
      "redo",
      "fullscreen",
      // "outline",
      // "code-theme",
      // "content-theme",
      "export",
      // "devtools",
      // "info",
      // "help",
      {
        name: '取消编辑按钮',
        tipPosition: 's',
        tip: '取消编辑',
        className: 'vditorIcon_cancel',
        icon: '<svg t="1748680306062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1530" width="200" height="200"><path d="M240.59937043 142.01605697L512 413.3469174l271.40062957-271.40062957 98.58331346 98.72285044L610.6530826 512l271.40062957 271.40062957-98.72285044 98.58331346L512 610.6530826l-271.40062957 271.40062957-98.58331346-98.72285044L413.3469174 512l-271.40062957-271.40062957 98.72285044-98.58331346z" fill="#d81e06" p-id="1531"></path></svg>',
        click () {cancelEdit()},
      },
      {
        hotkey: '⌘S',
        name: '完成编辑按钮',
        tipPosition: 's',
        tip: '完成编辑',
        className: 'vditorIcon_finish',
        icon: '<svg t="1748680261315" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1079" width="200" height="200"><path d="M322.33623704 875.33416296c-10.07312592-4.36906667-19.29671111-11.16539259-26.57848889-19.90352593L24.63288889 530.1778963c-7.5245037-8.98085925-6.31087408-22.45214815 2.66998519-29.97665186 7.5245037-6.31087408 18.32580741-6.5536 26.2144-0.84954074l97.21173334 71.36142222L349.52154075 716.59140741l605.23709629-569.92047408c8.61677037-8.00995555 22.08805925-7.64586667 30.09801481 0.84954075 7.40314075 7.88859259 7.76722963 19.90352592 0.84954074 28.1562074L420.51887408 854.94518518c-18.20444445 21.84533333-46.48201482 32.64663703-74.63822223 28.27757037-8.49540741-1.21362963-16.384-3.88361482-23.54441481-7.88859259z" fill="#04ce11" p-id="1080"></path></svg>',
        click () {finishEdit()},
      },
      "preview",
      "br",
  ],
    cache: {enable:false},
    preview: {actions: []},
    placeholder: props.placeholder,
    // 其他配置...
    after: () => {
      isMounted = true
      vditor.setValue(props.content?props.content:""); // 设置初始内容
      vditor.disabled()
      vditorContainer.value.querySelector('.vditor-toolbar [data-type="preview"]').click();
    }
  });
})
</script>

<style scoped lang="less">
.panel_wrapper{
  min-width: 800px;
  background: v-bind('props.background');
  border: v-bind('props.border');
  border-radius: v-bind('props.borderRadius');
  overflow: hidden;
  padding-bottom: v-bind(paddingBottom);

  .vditorIcon_finish,.vditorIcon_cancel{
    float: right;
  }
  .panel_bar{
    height: 40px;
    line-height: 40px;
    // padding-bottom: 0.5rem;
    padding-left: v-bind('props.padding');
    padding-right: v-bind('props.padding');

    border-bottom: 1px solid #dedede;
    font-size: 14px;
    // font-weight: lighter;
    letter-spacing: 2px;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .theVditor{
    overflow: hidden;
    border:none;

    &:deep(.vditor-toolbar){
      padding: 0px 40px !important;

      padding-left: v-bind('props.padding')  !important;
      padding-right: v-bind('props.padding')  !important;

      --toolbar-height: 40px;
      background: v-bind('props.background');
      caret-color: transparent;
      display: v-bind(toolbarDisplay);
    }

    &:deep(.vditor-reset){
      padding: 0.5rem 0rem !important;
      padding-bottom: v-bind('props.padding') !important;
      padding-left: v-bind('props.padding') !important;
      padding-right: v-bind('props.padding') !important;
      background: v-bind('props.background');
      overflow: hidden;
      max-width: none !important;
    }
    &:deep(.vditor-ir__node::before){
      // & ::before{
        display:none;
      // }
    }

    &:deep(.vditor-hint) {
      background: v-bind('props.background');
    }
    &:deep(.vditor-panel--arrow:before) {
      background: v-bind('props.background');
    }
    &:deep(.vditor-toolbar__item svg){
      width: 12px;
      height: 12px;
    }

    &:deep(.vditor-reset[contenteditable="false"]){
      opacity: 1;
    }
    &:deep(.vditor-preview) {
      background: v-bind('props.background');
      border-left: none;
      cursor: default;
      caret-color: transparent;
    }
    &:deep(.vditor-toolbar [data-type="preview"]){
      visibility: hidden;
    }
  }
  // &:deep(.vditor--fullscreen){
  //   z-index: 9999 !important; /* 确保高于 el-dialog 遮罩层 */
  //   position: fixed !important;
  //   top: 0 !important;
  //   left: 0 !important;
  //   width: 100vw !important;
  //   height: 100vh !important;
  // }
}
</style>