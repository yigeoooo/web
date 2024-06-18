<script>
import {page, remove} from "@/api/role";

export default {
  name: "Role_main",
  data() {
    return {
      searchForm:{
        page:1,
        size:10
      },
      tableData:[],
      total:''
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      page(this.searchForm).then(res => {
        if (res.resultCode === 200) {
          this.tableData = res.body.records;
          this.total = res.body.total
        }
      })
    },
    search() {
      this.init();
    },
    handleClick(row) {
      console.log(row);
    },
    deleteRole(row) {
      remove(row.roleId).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'删除角色成功！'
          })
          this.init();
        }
      })
    },
    handleSizeChange(val) {
      this.searchForm.size = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.init();
    },
    insert() {
      this.$router.push({
        name:'role_add'
      })
    },
  },
}
</script>

<template>
  <div>
    <div style="float: left;margin-left: 20px;margin-top: 20px">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="search" icon="el-icon-zoom-in">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="float: right;margin-top: 20px">
      <el-button type="primary" plain icon="el-icon-plus" @click="insert">新增</el-button>
    </div>
    <br><br><br>
    <el-divider></el-divider>
    <div>
      <el-table
          height="650"
          :data="tableData"
          border
          style="width: 90%;margin-left: 5%">
        <el-table-column
            fixed
            prop="roleName"
            label="角色名称"
            width="300">
        </el-table-column>
        <el-table-column
            prop="departmentName"
            label="所属部门"
            width="280">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="创建人"
            width="300">
        </el-table-column>
        <el-table-column
            prop="insertTime"
            label="创建时间"
            width="300">
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序"
            width="300">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="300">
          <template slot-scope="scope">
            <el-button icon="el-icon-setting" @click="handleClick(scope.row)" size="small" plain type="primary">修改</el-button>
            <el-button icon="el-icon-delete" @click="deleteRole(scope.row)" type="danger" size="small" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br>
    <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-sizes="[10, 30, 50]"
          :page-size="searchForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>

</style>
