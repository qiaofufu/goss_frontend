<script setup>
import { convertByteSize, convertTime } from '../utils/dataconvert.js'
import SearchInput from '@/components/SearchInput.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useObjectStore } from '@/stores/objects.js'
import ObjectSidebar from '@/components/ObjectSidebar.vue'
import { UploadObject } from '@/api/objects.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const objectStore = useObjectStore()

onMounted(() => {
  objectStore.cleanObjectList()
  objectStore.fetchObjectList({ bucket: route.params.bucketName })

})

const data = ref([])

watch(() => objectStore.objects, (newVal) => {
  newVal.forEach((object) => {
    const temp = {
      name: object.name,
      created_at: object.created_at,
      size: object.size,
      bucket: route.params.bucketName,
      access: object.access,
      version: object.version
    }
    data.value.push(temp)
  })
})

const visibleUploadDialog = () => {
  dialogVisible.value = true
}

const dialogVisible = ref(false)
let activeObject = ref(null)
const handleActiveObject = (row) => {
  activeObject.value = null
  activeObject.value = row
}
const hash = ref('')
const beforeUpload = async (file) => {
  console.log(file)
  return new Promise((resolve, reject) => {
    const fd = new FileReader()
    fd.onloadend = async (e) => {
      hash.value = await calculateFileHash(e.target.result)
      resolve()
    }
    fd.onerror = reject
    fd.readAsArrayBuffer(file)
  })
}
const upload = (e) => {
  console.log(e.file)
  const formData = new FormData()
  formData.append('file', e.file, e.file.name)
  UploadObject({
    bucketName: route.params.bucketName,
    data: formData,
    hash: hash.value
  }).then(res => {
    console.log(res)
    ElMessage.success('Upload success')
  }).catch(e => {
    console.log(e)
    ElMessage.error('Upload failed', e)
  })
}


async function calculateFileHash(fileContent) {
  try {
    // 直接将 ArrayBuffer 转换为 Uint8Array
    const uint8Array = new Uint8Array(fileContent);

    // 使用 crypto.subtle.digest 计算哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', uint8Array);

    // 将哈希值转换为 base64 编码
    const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(hashBuffer)));

    // 替换 base64 编码中的 '+' 和 '/'
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
  } catch (err) {
    console.error("Error calculating hash:", err);
    throw err;
  }
}

</script>
<template>
  <div>
    <el-card class="box">
      <div class="toolbar">
        <div class="toolbar-left">
          <search-input class="bucket-search" />
        </div>
        <div class="toolbar-right">
          <el-button-group class="btn-group">
            <el-button class="btn">Rewind</el-button>
            <el-button class="btn">Refresh</el-button>
            <el-button class="btn" @click="visibleUploadDialog">Upload</el-button>
          </el-button-group>
        </div>
      </div>
      <el-dialog v-model="dialogVisible">
        <div>
          <h1>Upload Dialog</h1>
          <el-upload
            action=""
            :http-request="upload"
            :before-upload="beforeUpload">
            <el-button>Click to upload</el-button>
          </el-upload>
        </div>
      </el-dialog>
      <div class="data-table-row">
        <el-table :data="data" @row-click="handleActiveObject" class="table">
          <el-table-column label="" width="60">
            <el-checkbox />
          </el-table-column>
          <el-table-column label="Name" width="240">
            <template #default="scope">
              <el-icon style="margin-right: 5px">
                <Document />
              </el-icon>
              <span>{{ scope.row.name }}
          </span>
            </template>
          </el-table-column>
          <el-table-column label="Last modify" width="400">
            <template #default="scope">
              {{ convertTime(scope.row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column label="Size">
            <template #default="scope">
              {{ convertByteSize(scope.row.size) }}
            </template>
          </el-table-column>
        </el-table>
        <object-sidebar :data="activeObject" />
      </div>

    </el-card>
  </div>
</template>
<style>
.toolbar {
  display: flex;
  justify-content: space-between;
}

.toolbar-left {

}

.toolbar-right {

}

.btn-group {

}

.btn {
  margin-left: 20px;
}

.data-table-row {
  display: flex;
}

.table {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.box {
  min-height: 600px;
}
</style>