<script>
import {editRole} from "@/api/role";

export default {
  name: "Role_update",
  data() {
    return {
      editForm:{

      },
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name:'role',
      })
    },
    edit() {
      editRole(this.editForm).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'修改成功！'
          })
          this.$router.push({
            name:'role'
          });
        }
      })
    },
  },
  created() {
    this.editForm = this.$route.query.row;
  },
}
</script>

<template>
  <div>
    <div style="margin-top: 20px;margin-left: 20px">
      <el-page-header @back="goBack" content="修改角色">
      </el-page-header>
    </div>

    <div style="width: 400px;margin-left: 10%;margin-top: 5%">
      <el-form label-position="left" label-width="80px" :model="editForm">
        <el-form-item label="角色名称">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="部门排序" style="float: left">
          <el-input-number :min="0" v-model="editForm.sort"></el-input-number>
        </el-form-item>
        <br><br><br><br>
        <div>
          <el-button type="primary" plain @click="edit">修改部门</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
