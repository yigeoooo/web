<script>
import {insert} from "@/api/role";

export default {
  name: "Role_add",
  data() {
    return {
      insertForm:{},
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name:'role'
      })
    },
    add() {
      insert(this.insertForm).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'新增角色成功！'
          })
          this.insertForm = {}
          this.$router.push({
            name:'role'
          })
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <div style="margin-top: 20px;margin-left: 20px">
      <el-page-header @back="goBack" content="新增角色">
      </el-page-header>
    </div>
    <div style="width: 400px;margin-left: 10%;margin-top: 5%">
      <el-form label-position="left" label-width="80px" :model="insertForm">
        <el-form-item label="角色名称">
          <el-input v-model="insertForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色排序" style="float: left">
          <el-input-number :min="0" v-model="insertForm.sort"></el-input-number>
        </el-form-item>
        <br><br><br><br>
        <div>
          <el-button type="primary" plain @click="add">新增角色</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
