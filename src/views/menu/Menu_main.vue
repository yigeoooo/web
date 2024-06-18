<script>
import {givePer, page} from "@/api/menu";
import {getRoleOptions} from "@/api/role";
import {getOptions} from "@/api/department";
export default {
  name: "Menu_main",
  data() {
    return {
      checkAll: false,
      checkedRoles: [],
      roles: [],
      isIndeterminate: true,
      options:[],
      form:{},
      dialogVisible:false,
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
  methods:{
    init() {
      page(this.searchForm).then(res => {
        this.tableData = res.body.records;
        this.total = res.body.total
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
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    show(row) {
      this.option()
      this.dialogVisible = true
      this.form.menuId = row.menuId
    },
    option() {
      getOptions().then(res => {
        if (res.resultCode === 200) {
          this.options = res.body.list;
        }
      })
    },
    getRoles() {
      getRoleOptions(this.form.departmentId).then(res => {
        if (res.resultCode === 200) {
          this.roles = res.body;
        }
      })
    },
    insertPer() {
      this.dialogVisible = false
      this.form.roleList = this.checkedRoles
      givePer(this.form).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'菜单授权成功！'
          })
          this.roles = [];
          this.options = [];
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <div style="float: left;margin-left: 20px;margin-top: 20px">
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
          style="width: 90%;margin-left: 5%"
          default-expand-all
          row-key="menuId"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            fixed
            prop="menuName"
            label="菜单名称"
            width="300">
        </el-table-column>
        <el-table-column
            prop="router"
            label="菜单路由"
            width="280">
          <template slot-scope="scope">
            <span v-if="scope.row.router === '0'">无</span>
            <span v-else>{{scope.row.router}}</span>
          </template>
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
            <el-button icon="el-icon-unlock" @click="show(scope.row)" type="info" size="small" plain>授权</el-button>
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

    <el-dialog
        title="菜单授权"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 400px">
        <el-form-item label="部门">
          <el-select @change="getRoles" v-model="form.departmentId" placeholder="请选择授权部门" style="float: left" clearable>
            <el-option
                v-for="item in options"
                :key="item.departmentId"
                :label="item.departmentName"
                :value="item.departmentId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <div style="margin: 15px 0;float: left"></div>
          <el-checkbox-group v-model="checkedRoles">
            <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="insertPer">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<style scoped>

</style>
