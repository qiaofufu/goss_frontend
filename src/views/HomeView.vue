<script setup>
import router from '@/router/index.js'
import {ref} from "vue";

const menuItems = [
  {
    index: '1',
    title: 'Index',
    icon: 'House'
  },
  {
    index: '2',
    title: 'Bucket',
    icon: 'MessageBox'
  },
  {
    index: '3',
    title: 'Access',
    icon: 'View'
  },
  {
    index: '4',
    title: 'Object Browser',
    icon: 'Grid'
  }
]

const activeTitle = ref('Index')

function handleSelect(index) {
  switch (index) {
    case '1':
      router.push('/')
        activeTitle.value = 'Index'
      break
    case '2':
      router.push('/bucket')
        activeTitle.value = 'Bucket'
      break
    case '3':
      router.push('/access')
        activeTitle.value = 'Access'
      break
    case '4':
      router.push("/browser")
        activeTitle.value = 'Object Browser'
  }
}
</script>

<template>
  <main>
    <el-container>
      <el-aside width="200px" class="menu-container">
        <h2 class="menu-icon">Tiny OSS</h2>
        <el-divider/>
        <el-menu
          default-active="1"
          class="menu"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item v-for="item in menuItems" :index="item.index"> <component class="icon" :is="item.icon"/>{{item.title}}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <h1 class="header-label">
              {{ activeTitle }}
            </h1>
          </div>
        </el-header>
        <el-divider style="margin-bottom: 0"/>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </main>
</template>
<style scoped>
.menu-container {
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #2c3e50;
}
.menu-icon {
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
  color: rgb(255, 255, 255);
}
.menu {
  overflow-y: auto;
  height: calc(100vh - 200px);
  background-color: inherit;
  padding: 0;
  margin: 0;
  width: 100%;
}
.header {
  padding: 20px 0;
}
.header-label {
  font-size: 32px;
  font-weight: bold;
}
.icon {
  width: 26px;
  height: 26px;
  margin-right: 10px;
}
</style>
