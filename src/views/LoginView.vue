<script setup>
import loginBackground from '@/assets/login_background.png'

import { reactive } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const router = useRouter()
const userStore = useUserStore()
const onSubmit = () => {
  let succ = userStore.login({
    username: form.username,
    password: form.password
  })
  if (succ) {
    router.push('/')
  }
}

</script>

<template>
  <el-container class="login-container">
    <img :src="loginBackground" class="background-image" />
    <el-card class="login-view" shadow="hover">
      <template #header>
        <h2>登录</h2>
      </template>
      <el-form :model="form" label-width="auto" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" size="large" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.login-view {
  width: 400px;
  margin: auto auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;

  background-color: rgba(255, 255, 255, 0.9); /* 设置背景颜色和透明度 */
}

.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.login-btn {
  width: 100%;
}
</style>
