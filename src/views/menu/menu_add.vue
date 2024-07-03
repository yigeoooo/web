<script>
import {addMenu, getParentMenuList} from "@/api/menu";

export default {
  name: "menu_add",
  data() {
    return {
      insertForm: {},
      parentMenuList:[],
      isParentMenu:'1',
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name:'menu'
      })
    },
    getMenuList() {
      getParentMenuList().then(res => {
        if (res.resultCode === 200) {
          this.parentMenuList = res.body;
        }
      })
    },
    add() {
      if (this.isParentMenu === '1') {
        this.insertForm.parentMenuId = '0'
      }
      addMenu(this.insertForm).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'新增菜单成功！'
          })
          this.$router.push({
            name:'menu'
          })
        }
      })
    },
  },
  created() {
    this.getMenuList();
  },
}
</script>

<template>
  <div>
    <div style="margin-top: 20px;margin-left: 20px">
      <el-page-header @back="goBack" content="新增菜单">
      </el-page-header>
    </div>
    <div style="width: 400px;margin-left: 10%;margin-top: 5%">
      <el-form label-position="left" label-width="80px" :model="insertForm">
        <el-form-item label="菜单名称">
          <el-input v-model="insertForm.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="是否父级" style="float: left">
          <el-radio v-model="isParentMenu" label='1' border>是</el-radio>
          <el-radio v-model="isParentMenu" label='0' border>否</el-radio>
        </el-form-item>
        <el-form-item label="父级菜单" style="float: left" v-if="this.isParentMenu === '0'">
          <el-select v-model="insertForm.parentMenuId" placeholder="请选择父级菜单" clearable>
            <el-option
                v-for="(item, index) in parentMenuList"
                :key="index"
                :label="item.menuName"
                :value="item.parentMenuId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路由" style="float: left">
          <el-input v-model="insertForm.router" placeholder="请输入菜单路由"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序" style="float: left" >
          <el-input-number :min="0" v-model="insertForm.sort"></el-input-number>
        </el-form-item>
        <el-form-item  style="float: left" >
          <el-button type="primary" plain @click="add">新增部门</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
