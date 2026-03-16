<template>
  <el-empty description="访问的页面不存在！">
    <el-button type="primary" @click="router.push('/workPlace/main')">返回 工作台</el-button>
  </el-empty>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
</script>

<style>
.el-empty{
  height:100%;
  background:#fff;
}
</style>
