<script setup>


// const route = useRoute()
import {UploadObject} from "@/api/objects.js";
import {useRoute} from "vue-router";
const route = useRoute();
const beforeUpload = (file) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    const fileContent = event.target.result;
    // 计算文件的哈希值
    const hash = await calculateFileHash( fileContent);

    UploadObject({
      bucketName: route.params.bucketName,
      objectName: file.name,
      data: event.target.result,
      size: file.size,
      hash: hash
    })
  };

  reader.onerror = (error) => {
    console.error('Error reading file:', error);
  };

  reader.readAsText(file);

  // 返回一个被拒绝的 Promise 来阻止文件上传
  return Promise.reject();
};

async function calculateFileHash(fileContent) {
  // 执行文件哈希计算的逻辑
  // 这里使用你之前提供的方法来计算文件哈希值
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(fileContent);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const uint8Array = new Uint8Array(hashBuffer);
  const base64 = btoa(String.fromCharCode.apply(null, uint8Array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_');
}
</script>

<template>
  <div>
    <h1>Upload Dialog</h1>
    <el-upload :before-upload="beforeUpload">
      <el-button>Click to upload</el-button>
    </el-upload>
  </div>
</template>

<style scoped>
</style>