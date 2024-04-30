<script setup>
import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input placeholder="Search buckets" v-model="searchContent" >
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>