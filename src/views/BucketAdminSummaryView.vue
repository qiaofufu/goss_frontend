<script setup>
import { onMounted, ref } from 'vue'
import { GetBucket, UpdateBucket } from '@/api/buckets.js'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const data = ref({})

const route = useRoute()

onMounted(() => {
  // Fetch data from the server
  GetBucket({ bucketName: route.params.bucketName }).then((res) => {
    data.value = res.bucket
  }).catch(e=>{
    console.error(e)
    ElMessage.error('Failed to fetch bucket data')
  })
})

const handleSave = () => {
  UpdateBucket({ bucketName: route.params.bucketName, data: data.value }).then((res) => {
    ElMessage.success('Update success')
  }).catch(e => {
    console.error(e)
  })
}

</script>
<template>
  <el-col :span="24">
    <el-row>
      <h2>
        Summary
      </h2>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="16">
        <el-form label-position="left" label-width="150px" v-model="data">
          <el-form-item label="Access Policy">
            <el-select placeholder="Select Access Policy" v-model="data.rw_policy">
              <el-option label="Public" :value="1"></el-option>
              <el-option label="Private" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Object Locking">
            <el-select placeholder="Select Object Locking" disabled v-model="data.object_lock_enabled">
              <el-option label="Disabled" :value="false"></el-option>
              <el-option label="Enabled" :value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Quota">
            <el-input placeholder="Quota" v-model="data.quota_bytes"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">Save</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="right">
        <el-icon size="62px">
          <Odometer />
        </el-icon>
        <div style="margin-left: 10px">
          <h3>Reported Usage</h3>
          <p>0.0 KB</p>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>

<style scoped>
.right {
  display: flex;
  justify-content: center;
}
</style>