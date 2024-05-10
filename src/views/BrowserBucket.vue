<script setup>
import {convertByteSize, convertTime} from '../utils/dataconvert.js'
import SearchInput from "@/components/SearchInput.vue";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useObjectStore} from "@/stores/objects.js";
import UploadDialog from "@/components/UploadDialog.vue";
import ObjectSidebar from "@/components/ObjectSidebar.vue";

const route = useRoute()
const objectStore = useObjectStore();

onMounted(() => {
  objectStore.cleanObjectList()
  objectStore.fetchObjectList({bucket: route.params.bucketName})

})

const data =ref([])

watch( () => objectStore.objects, (newVal) => {
  newVal.forEach((object) => {
    console.log(object.name)
    const temp = {
      name: object.name,
      created_at: object.created_at,
      size: object.size,
      bucket: route.params.bucketName,
      access: object.access,
      version: object.version,
    }
    data.value.push(temp)
  })
})

const upload = () => {
  dialogVisible.value = true
  console.log("upload", dialogVisible.value)
}

const dialogVisible = ref(false)
let activeObject = ref(null);
const handleActiveObject= (row) => {
  console.log(row)
  activeObject.value =null
  activeObject.value = row
}
</script>
<template>
  <div>
    <el-card>
      <div class="toolbar">
        <div class="toolbar-left">
          <search-input class="bucket-search"/>
        </div>
        <div class="toolbar-right">
          <el-button-group class="btn-group">
            <el-button class="btn">Rewind</el-button>
            <el-button class="btn">Refresh</el-button>
            <el-button class="btn" @click="upload">Upload</el-button>
          </el-button-group>
        </div>
      </div>
      <el-dialog v-model="dialogVisible">
        <upload-dialog/>
      </el-dialog>
      <div class="data-table-row">
        <el-table :data="data" @row-click="handleActiveObject" class="table">
          <el-table-column label="" width="60" >
            <el-checkbox/>
          </el-table-column >
          <el-table-column label="Name" width="240">
            <template #default="scope">
              <el-icon style="margin-right: 5px"><Document /></el-icon>
              <span>{{scope.row.name}}
          </span>
            </template>
          </el-table-column>
          <el-table-column label="Last modify" width="400">
            <template #default="scope">
              {{convertTime(scope.row.created_at)}}
            </template>
          </el-table-column>
          <el-table-column label="Size" >
            <template #default="scope">
              {{convertByteSize(scope.row.size)}}
            </template>
          </el-table-column>
        </el-table>
        <object-sidebar :data="activeObject"/>
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
</style>