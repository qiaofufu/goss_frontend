<script setup>
import SearchInput from '@/components/SearchInput.vue'
import BucketCard from '@/components/BucketCard.vue'
import router from '@/router/index.js'
import { useBucketsStore } from '@/stores/buckets.js'
import { onMounted } from 'vue'

const handleCreateBucket = () => {
  router.push('/add-bucket')
}
const bucketsStore = useBucketsStore()

onMounted(() => {
  bucketsStore.fetchBucketList()
})

</script>

<template>
  <main>
    <div class="tool-container">
      <SearchInput class="bucket-search" />
      <div>
        <el-button type="primary" @click="handleCreateBucket">Create Bucket</el-button>
      </div>
    </div>
    <BucketCard :data="data" :key="data.name" v-for="data in bucketsStore.bucketList" />
  </main>
</template>

<style scoped>
.bucket-search {
}

.tool-container {
  display: flex;
  justify-content: space-between;
}
</style>