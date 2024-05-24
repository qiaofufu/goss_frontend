<script setup>
import { DeleteObject, DownloadObject } from '@/api/objects.js'
import { ref, watch } from 'vue'

const props = defineProps({
  data: {
    name: String,
    bucket: String,
    created_at: String,
    size: Number
  }
})

const handleDownload = async () => {
  try {
    const blob = await DownloadObject({
      bucketName: props.data.bucket,
      objectName: props.data.name,
      version: props.data.version
    })

    // 创建一个指向blob的URL
    const url = window.URL.createObjectURL(blob)

    // 创建一个新的a元素
    const link = document.createElement('a')
    link.href = url

    // 设置下载的文件名
    link.download = props.data.name

    // 模拟点击a元素，启动下载
    link.click()

    // 释放URL对象
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(error)
  }
}
const handleDelete = () => {
}
watch(() => props.data, (newVal) => {
  showComponent.value = true
})
// 定义响应式数据
const showComponent = ref(true)
const toggleComponent = () => {
  showComponent.value = !showComponent.value
}
</script>

<template>
  <div class="side-bar" v-if="showComponent && props.data!==null">
    <el-button type="text" @click="toggleComponent"><el-icon><CloseBold /></el-icon></el-button>
    <h1 class="title">Action</h1>
    <div class="action-box">
      <div>
        <el-button type="success" @click="handleDownload" class="action-btn">Download</el-button>
      </div>
      <div>
        <el-button type="danger" @click="handleDelete" class="action-btn">Delete</el-button>
      </div>
      <div>
        <el-button type="primary" @click="handleShare" class="action-btn">Share</el-button>
      </div>
    </div>
    <h1 class="title">Info</h1>
    <div>
      <p>Name: {{ props.data.name }}</p>
      <p>Created At: {{ props.data.created_at }}</p>
      <p>Size: {{ props.data.size }}</p>
    </div>
  </div>
</template>

<style scoped>
.action-box {
  display: flex;
  flex-direction: column;
  gap: 10px;

}

.side-bar {
  width: 300px;
  z-index: 100;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.action-btn {
  width: 100%;
}
</style>