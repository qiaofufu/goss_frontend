<script setup>
import { useRouter } from 'vue-router'
import { useBucketsStore } from '@/stores/buckets.js'
import { onMounted } from 'vue'
import { convertByteSize, convertRWPermission } from '../utils/dataconvert.js'

const router = useRouter()
const handleRowClick = (row) => {
  console.log(row.name)
  router.push({ name: 'bucketBrowser', params: { bucketName: row.name } })
}

const bucketStore = useBucketsStore()

onMounted(() => {
  const res = bucketStore.fetchBucketList()
  console.log(res)
})

</script>

<template>
  <div>
    <el-col>
      <el-row>
        toolbar
      </el-row>
      <el-row>
        <div class="table-box">
          <el-table :data="bucketStore.buckets" width="80%" height="600px" @row-click="handleRowClick">
            <el-table-column prop="name" label="Bucket Name">
              <template #default="scope">
                <el-icon style="margin-right: 5px">
                  <Files />
                </el-icon>
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="objects" label="Objects"></el-table-column>
            <el-table-column prop="used_bytes" label="Size">
              <template #default="scope">
                <span>{{ convertByteSize(scope.row.used_bytes) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rw_policy" label="Access">
              <template #default="scope">
                <span>{{ convertRWPermission(scope.row.rw_policy) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-row>
    </el-col>
  </div>
</template>
<style scoped>
.table-box {
  margin-top: 20px;
  width: 100%;
  border: solid 1px #ebeef5;
}
</style>