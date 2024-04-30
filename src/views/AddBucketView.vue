<script setup>
import {reactive} from "vue";
import {useBucketsStore} from "@/stores/buckets.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

const form = reactive({
  name: '',
  quota: {
    size: 0,
    unit: "GB"
  },
  version: {
    enable: false
  },
  locking: false
})
const bucketStore = useBucketsStore()

const handleCreateBucket = () => {
  const size = form.quota.size * Math.pow(1024, ['KB', 'MB', 'GB', 'TB'].indexOf(form.quota.unit))
  bucketStore.createBuckets({
    name: form.name,
    enableQuota: form.quota.size !== 0,
    quotaSize: size,
    enableVersioning: form.version.enable,
    locking: form.locking
  }).then((data) => {
    ElMessage.success(`${data.name} created successfully`)
    router.back()
  }).catch((error) => {
    console.log(error)
  })
}

</script>
<template>
  <main>
    <el-card class="box-card">
      <el-row>
        <el-col :span="14" class="left">
          <el-row>
            <div class="title-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="min-icon" fill="currentcolor" viewBox="0 0 256 256" width="32"><g><path d="M244.1,8.4c-3.9-5.3-10.1-8.5-16.7-8.5H21.6C15,0,8.8,3.1,4.9,8.4C0.8,14-0.9,21,0.3,27.9
						c5.1,29.6,15.8,91.9,24.3,141.7v0.1C29,195,32.8,217.1,35,229.9c1.4,10.8,10.4,18.9,21.3,19.3h136.5
						c10.9-0.4,19.9-8.5,21.3-19.3l10.3-60.1l0.1-0.4L238.4,88v-0.2l10.3-59.9C249.9,21,248.3,14,244.1,8.4 M206.1,177h-163
						l-3.2-18.6h169.3L206.1,177z M220,95.3H28.9l-3.2-18.6h197.4L220,95.3z"></path></g></svg>
              <h2 class="title-text">Create Bucket</h2>
            </div>
          </el-row>
          <el-row>
            <el-col>
              <el-form label-width="200px" label-position="left" size="large">
                <el-form-item label="Bucket Name">
                  <el-input v-model="form.name" placeholder="Bucket Name"></el-input>
                </el-form-item>
                <h2>Features</h2>
                <el-form-item label="Versioning">
                  <el-radio-group v-model="form.version.enable">
                    <el-radio-button :value="false" >Disable</el-radio-button>
                    <el-radio-button :value="true" >Enable</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Quota">
                  <el-input v-model="form.quota.size" type="number" placeholder="Bucket max storage size">
                    <template #suffix>
                      <el-select v-model="form.quota.unit" placeholder="unit" style="width: 80px">
                        <el-option label="KB" value="KB"></el-option>
                        <el-option label="MB" value="MB"></el-option>
                        <el-option label="GB" value="GB"></el-option>
                        <el-option label="TB" value="TB"></el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="Object Lock">
                  <el-radio-group v-model="form.locking">
                    <el-radio-button :value="false">Unlock</el-radio-button>
                    <el-radio-button :value="true">Lock</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="handleCreateBucket">Create Bucket</el-button>
                </el-form-item>
              </el-form>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="10" class="right">
          <el-row>
            <div class="title-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="min-icon" fill="currentcolor" viewBox="0 0 256 256" width="32"><g><path d="M244.1,8.4c-3.9-5.3-10.1-8.5-16.7-8.5H21.6C15,0,8.8,3.1,4.9,8.4C0.8,14-0.9,21,0.3,27.9
						c5.1,29.6,15.8,91.9,24.3,141.7v0.1C29,195,32.8,217.1,35,229.9c1.4,10.8,10.4,18.9,21.3,19.3h136.5
						c10.9-0.4,19.9-8.5,21.3-19.3l10.3-60.1l0.1-0.4L238.4,88v-0.2l10.3-59.9C249.9,21,248.3,14,244.1,8.4 M206.1,177h-163
						l-3.2-18.6h169.3L206.1,177z M220,95.3H28.9l-3.2-18.6h197.4L220,95.3z"></path></g></svg>
              <h2 class="title-text">Buckets</h2>
            </div>
          </el-row>
          <el-row>
            <el-col>
              <div class="tips">
                TinyOSS uses buckets to organize objects. A bucket is similar to a folder or directory in a filesystem, where each bucket can hold an arbitrary number of objects.<br><br>
                <b>Versioning</b>allows to keep multiple versions of the same object under the same key.<br><br>
                <b>Object Locking</b> prevents objects from being deleted. Required to support retention and legal hold. Can only be enabled at bucket creation.<br><br>
                <b>Quota</b> limits the amount of data in the bucket.<br><br>
                <b>Retention</b> imposes rules to prevent object deletion for a period of time. Versioning must be enabled in order to set bucket retention policies.<br><br>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </main>
</template>

<style>
.title-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.title-text {
  font-size: 25px;
  margin-left: 10px;
  font-weight: bold;
}
.left {
  padding: 5px;

}
.right {
  padding: 5px;
  background-color: rgb(251, 250, 250);
}

</style>