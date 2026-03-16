<template>
  <el-empty image='/images/developing.png' description=" ">
    <el-button type="primary" @click="router.go(-1)">返回</el-button>
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