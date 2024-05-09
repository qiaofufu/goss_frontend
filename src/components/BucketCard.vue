<script setup>

import {computed} from "vue";
import {useRouter} from "vue-router";
import { convertByteSize } from '@/utils/dataconvert.js'

const props = defineProps({
  data: {
    name: String,
    enableVersioning: Boolean,
    enableLocking: Boolean,
    enableQuota: Boolean,
    quotaSize: Number,
    rwPolicy: Number,
    createdAt: Number,
    size: Number,
    objects: Number
  }
})

const router = useRouter();

const handleManage = () => {
  console.log("handleManage")
  router.push({name: 'bucketManage', params: {bucketName: props.data.name}})
}

const Usage = computed(() => {
  let size = Number(props.data.size);
  return convertByteSize(size)
})

const Access = computed(() => {
  let rwPolicy = props.data.rwPolicy;
  console.log(rwPolicy)
  if (rwPolicy === 1) return 'R';
  if (rwPolicy === 2) return 'W';
  if (rwPolicy === 3) return 'R/W';
});

const CreatedAt = computed(() => {
  let date = new Date(Number(props.data.createdAt));
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
})

</script>

<template>
<div>
  <el-card class="box-card">
    <template #header>
      <el-row class="box-header">
        <el-col class="box-header-info-container" :span="12">
          <el-row>
            <span class="bucket-name">{{props.data.name}}</span>
          </el-row>
          <el-row style="display: flex; justify-content: space-between">
            <el-col :span="12"><span class="label">Created:</span><span class="label-text">{{CreatedAt}}</span></el-col>
            <el-col :span="12"><span class="label">Access:</span><span class="label-text">{{Access}}</span></el-col>
          </el-row>
        </el-col>
        <el-col class="box-header-btn-group-container" :span="12">
          <el-button><span class="btn-label" @click="handleManage">Manage</span><el-icon><Setting /></el-icon></el-button>
          <el-button type="primary" ><span class="btn-label" >Browse</span><el-icon><Right /></el-icon></el-button>
        </el-col>
      </el-row>
    </template>
    <div class="box-body">
      <div class="box-body-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="min-icon" fill="currentcolor" viewBox="0 0 256 256" width="40"><g><path d="M244.1,8.4c-3.9-5.3-10.1-8.5-16.7-8.5H21.6C15,0,8.8,3.1,4.9,8.4C0.8,14-0.9,21,0.3,27.9
						c5.1,29.6,15.8,91.9,24.3,141.7v0.1C29,195,32.8,217.1,35,229.9c1.4,10.8,10.4,18.9,21.3,19.3h136.5
						c10.9-0.4,19.9-8.5,21.3-19.3l10.3-60.1l0.1-0.4L238.4,88v-0.2l10.3-59.9C249.9,21,248.3,14,244.1,8.4 M206.1,177h-163
						l-3.2-18.6h169.3L206.1,177z M220,95.3H28.9l-3.2-18.6h197.4L220,95.3z"></path></g></svg>
      </div>
      <div class="box-body-item" >
        <div class="label-box"><el-icon size="18px"><Odometer /></el-icon><span class="label-text">Usage</span></div>
        <div class="label">{{Usage}}</div>
      </div>
      <div class="box-body-item">
        <div class="label-box"><el-icon size="18px"><Files /></el-icon><span class="label-text">Objects</span></div>
        <div class="label">{{ props.data.objects }}</div>
      </div>
    </div>
  </el-card>
</div>
</template>

<style scoped>
.box-header-info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.box-header {
  display: flex;
  justify-content: space-between;
}
.box-header-btn-group-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-label {
  margin-right: 5px;
}
.box-body {
  display: flex;
  align-items: center;
}
.box-body-item {
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
}
.box-card {
  margin: 10px 0;
}
.bucket-name {
  font-weight: bold;
  font-size: 24px;
}

.label {
  font-weight: bold;
}
.label-box {
  display: flex;
  align-items: center;
}
.label-text {
  margin-left: 5px;
  font-weight: bold;
}
</style>