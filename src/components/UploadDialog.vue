<script setup>
// const route = useRoute()
import { UploadObject } from '@/api/objects.js'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const route = useRoute()
const file = ref(null)
const hash = ref('')
const beforeUpload = async (files) => {
  file.value = files[0]
  hash.value = await calculateFileHash(file)
}

const upload = () => {
  const formData = new FormData()
  console.log(file.value)
  formData.append('file', file, file.value.name)
  UploadObject({
    bucketName: route.params.bucketName,
    data: formData,
    hash: hash
  }).then(res => {
    console.log(res)
    ElMessage.success('Upload success')
  }).catch(e => {
    console.log(e)
    ElMessage.error('Upload failed', e)
  })
}

async function calculateFileHash(fileContent) {
  // 执行文件哈希计算的逻辑
  // 这里使用你之前提供的方法来计算文件哈希值
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(fileContent)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const uint8Array = new Uint8Array(hashBuffer)
  const base64 = btoa(String.fromCharCode.apply(null, uint8Array))
  return base64.replace(/\+/g, '-').replace(/\//g, '_')
}
</script>

<template>
  <div>
    <h1>Upload Dialog</h1>
    <el-upload :before-upload="beforeUpload">
      <el-button @click="upload">Click to upload</el-button>
    </el-upload>
  </div>
</template>
<style scoped>
</style>