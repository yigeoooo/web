<script>
import {addHouse} from "@/api/house";

export default {
  name: "house_add",
  data() {
    return{
      insertForm:{},
    }
  },
  methods:{
    goBack() {
      this.$router.push({
        name:'house'
      })
    },
    add() {
      addHouse(this.insertForm).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'创建房间成功！',
          })
          this.$router.push({
            name:'house'
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
      <el-page-header @back="goBack" content="新增房间">
      </el-page-header>
    </div>
    <div style="width: 400px;margin-left: 10%;margin-top: 5%">
      <el-form label-position="left" label-width="80px" :model="insertForm">
        <el-form-item label="房间名称">
          <el-input v-model="insertForm.houseName" placeholder="请输入房间名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间编号">
          <el-input v-model="insertForm.houseNumber" placeholder="请输入房间编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="默认密码">
          <el-input v-model="insertForm.password" placeholder="请输入房间默认密码" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间价格">
          <el-input v-model="insertForm.price" placeholder="请输入房间价格" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间排序" style="float: left" >
          <el-input-number :min="0" v-model="insertForm.sort"></el-input-number>
        </el-form-item>
        <el-form-item  style="float: left" >
          <el-button type="primary" plain @click="add">新增房间</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
