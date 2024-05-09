<script setup>
import { convertByteSize } from '../utils/dataconvert.js'
import { Paperclip } from '@element-plus/icons-vue'

const data = [
  {
    isChoice: false,
    name: "test",
    updated_at: 1651232311313,
    size: 1595926262
  },
]

const convertTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toString()
}



</script>
<template>
  <div>
    <el-card>
      <div class="toolbar">
        <div class="toolbar-left">
lfet
        </div>
        <div class="toolbar-right">
          <el-button-group class="btn-group">
            <el-button class="btn">Rewind</el-button>
            <el-button class="btn">Refresh</el-button>
            <el-button class="btn">Upload</el-button>
          </el-button-group>
        </div>
      </div>
      <el-table :data="data">
        <el-table-column label="" width="60" >
          <el-checkbox/>
        </el-table-column >
        <el-table-column label="name" width="180">
          <template #default="scope">
            <el-icon style="margin-right: 5px"><Document /></el-icon>
            <span>{{scope.row.name}}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="last modify" width="400">
          <template #default="scope">
            {{convertTime(scope.row.updated_at)}}
          </template>
        </el-table-column>
        <el-table-column label="size" >
          <template #default="scope">
            {{convertByteSize(scope.row.size)}}
          </template>
        </el-table-column>
      </el-table>
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
</style>