<script setup>
const handleRowClick = (row) => {
  console.log(row)
}
const data = [
  {
    name: "bucket1",
    objects: 10,
    size: 1323266,
    access: "R/W"
  },
  {
    name: "bucket2",
    objects: 20,
    size: 1323266,
    access: "R"
  },
  {
    name: "bucket3",
    objects: 30,
    size: 1323266,
    access: "W"
  }
]
</script>

<template>
  <div>
    <el-col>
      <el-row>
        toolbar
      </el-row>
      <el-row>
        <div class="table-box">
          <el-table :data="data" width="80%" height="600px" @row-click="handleRowClick">
            <el-table-column prop="name" label="Bucket Name"></el-table-column>
            <el-table-column prop="objects" label="Objects"></el-table-column>
            <el-table-column prop="size" label="Size"></el-table-column>
            <el-table-column prop="access" label="Access"></el-table-column>
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