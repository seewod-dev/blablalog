<template>
  <el-empty image="./images/developing.gif" :image-size="600" description="页面正在开发中！">
  </el-empty>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
</script>

<style scoped>
.el-empty{
  height:100%;
  background:#eceef6;
}
</style>
