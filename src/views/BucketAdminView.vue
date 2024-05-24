<script setup>
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import { DeleteBucket } from '@/api/buckets.js'

const route = useRoute()
const summary = reactive({
  bucketName: route.params.bucketName,
  access: 'Public',
  versioning: 'Disabled',
  locking: 'Disabled',
  
  quota: '1GB',
  rwAccess: {
    read: true,
    write: true
  },
  createdAt: 1630000000000
})


const menuItems = [
  {
    index: '1',
    title: 'Summary'
  }
]

const handleDeleteBucket = () => {
  try {
    console.log('delete', summary.bucketName)
    DeleteBucket({ bucketName: summary.bucketName })
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>
  <el-container>
    <el-header class="header">
      <div class="header-label-box">
        <svg xmlns="http://www.w3.org/2000/svg" class="min-icon" fill="currentcolor" viewBox="0 0 256 256" width="40">
          <g>
            <path d="M244.1,8.4c-3.9-5.3-10.1-8.5-16.7-8.5H21.6C15,0,8.8,3.1,4.9,8.4C0.8,14-0.9,21,0.3,27.9
						c5.1,29.6,15.8,91.9,24.3,141.7v0.1C29,195,32.8,217.1,35,229.9c1.4,10.8,10.4,18.9,21.3,19.3h136.5
						c10.9-0.4,19.9-8.5,21.3-19.3l10.3-60.1l0.1-0.4L238.4,88v-0.2l10.3-59.9C249.9,21,248.3,14,244.1,8.4 M206.1,177h-163
						l-3.2-18.6h169.3L206.1,177z M220,95.3H28.9l-3.2-18.6h197.4L220,95.3z"></path>
          </g>
        </svg>
        <div>
          <div class="header-label">{{ summary.bucketName }}</div>
          <div class="header-sub-label">Access:<span class="header-sub-label-text">{{ summary.access }}</span></div>
        </div>
      </div>
      <div>
        <el-button type="danger" @click="handleDeleteBucket">Delete Bucket
          <template #icon>
            <el-icon>
              <DeleteFilled />
            </el-icon>
          </template>
        </el-button>
        <el-button type="info">Refresh
          <template #icon>
            <el-icon>
              <RefreshRight />
            </el-icon>
          </template>
        </el-button>
      </div>
    </el-header>
    <el-divider style="margin: 5px" />
    <el-container style="border: 1px solid rgb(234,234,234)">
      <el-aside>
        <el-menu
          default-active="1"
          class="menu"
          @select="handleSelect"
          background-color="rgb(248,248,248)"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item v-for="item in menuItems" :index="item.index" :key="item.index">{{ item.title }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.header-label-box {
  display: flex;
  align-items: center;
}

.header-label {
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  margin-left: 10px;
}

.header-sub-label {
  font-size: 16px;
  line-height: 16px;
  color: #6e6e6f;
  margin-left: 10px;
}

.header-sub-label-text {
  font-weight: bold;
  margin-left: 5px;
}

.menu {
  height: 100%;
  flex: 1;
}
</style>