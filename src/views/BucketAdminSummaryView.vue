<script setup>
</script>
<template>
  <el-col :span="24">
    <el-row>
      <h2>
        Summary
      </h2>
    </el-row>
    <el-divider/>
    <el-row>
      <el-col :span="16">
        <el-form label-position="left" label-width="150px">
          <el-form-item label="Access Policy">
            <el-select placeholder="Select Access Policy">
              <el-option label="Public" value="public"></el-option>
              <el-option label="Private" value="private"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Encryption">
              <el-select placeholder="Select Encryption">
                <el-option label="Disabled" value="disabled"></el-option>
                <el-option label="AES-256" value="aes-256"></el-option>
                <el-option label="AES-128" value="aes-128"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="Object Locking">
              <el-select placeholder="Select Object Locking" disabled>
                <el-option label="Disabled" value="disabled"></el-option>
                <el-option label="Enabled" value="enabled"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="Quota">
              <el-input placeholder="Quota"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">Save</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="right">
        <el-icon size="62px"><Odometer /></el-icon>
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