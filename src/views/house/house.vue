<script>
import {clean, editHouse, editHouseState, finish, select} from "@/api/house";
import {selectPage} from "@/api/order";

export default {
  name: "house_main",
  data() {
    return {
      visible:false,
      form:{

      },
      dialogTableVisible:false,
      infoData:[],
      houseId:'',
      infoForm:{
        total: '',
        page: 1,
        size: 10,
      },
      houseState:[
        {
          label:'空闲',
          value:'0',
        },
        {
          label:'占用',
          value:'1',
        },
        {
          label:'已退房',
          value:'2',
        },
        {
          label:'打扫中',
          value:'3',
        },
      ],
      searchForm: {
        page: 1,
        size: 10,
        houseName: '',
        state: '',
      },
      tableData: [],
      total: ''
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      select(this.searchForm).then(res => {
        if (res.resultCode === 200) {
          this.tableData = res.body.records;
          this.total = res.body.total
        }
      })
    },
    search() {
      this.init();
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
        name:'house_add',
      })
    },
    getPage(id) {
      this.houseId = id;
      this.dialogTableVisible = true;
      const data = {
        id: id,
        page: 1,
        size: 10
      }
      selectPage(data).then(res => {
        this.infoData = res.body.records;
        this.infoForm.total = res.body.total
      })
    },
    sizeChange(val) {
      this.infoForm.size = val;
      this.getPage(this.houseId);
    },
    currentChange(val) {
      this.infoForm.page = val;
      this.getPage(this.houseId);
    },
    intoHouse(id) {
      this.houseId = id;
      this.visible = true;
    },
    sureToHouse() {
       const data = {
         userId: this.form.userId,
         houseId : this.houseId
       }
      editHouse(data).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'入住成功!'
          })
          this.visible = false;
          this.init();
        }
      })
    },
    returnHouse(id) {
      editHouseState({
        houseId:id,
      }).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'退房成功!'
          })
        }
        this.init();
      })
    },
    cleanHouse(id) {
      clean({
        houseId: id
      }).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'成功!'
          })
        }
        this.init();
      })
    },
    finishClean(id) {
      finish({
        houseId: id
      }).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'打扫成功!'
          })
        }
        this.init();
      })
    },
  },
}
</script>

<template>
  <div>
    <div style="float: left;margin-left: 20px;margin-top: 20px">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="房间名称">
          <el-input v-model="searchForm.houseName" placeholder="请输入房间名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间状态">
          <el-select v-model="searchForm.state" placeholder="请选择房间状态" clearable>
            <el-option
                v-for="(item, index) in houseState"
                :key="index"
                :label="item.label"
                :value="item.value"></el-option>
          </el-select>
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
            prop="houseName"
            label="房间名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="houseNumber"
            label="房间编号"
            width="200">
        </el-table-column>
        <el-table-column
            prop="password"
            label="房间密码"
            width="200">
        </el-table-column>
        <el-table-column
            prop="price"
            label="房间价格"
            width="250">
          <template slot-scope="scope">
            {{scope.row.price}} 元/天
          </template>
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序"
            width="50">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="状态"
            width="200">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state === '0'">空闲</el-tag>
            <el-tag v-if="scope.row.state === '1'">占用</el-tag>
            <el-tag type="warning" v-if="scope.row.state === '2'">已退房</el-tag>
            <el-tag type="info" v-if="scope.row.state === '3'">打扫中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="userName"
            label="当前入住人"
            width="100">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="600">
          <template slot-scope="scope">
            <el-button plain @click="getPage(scope.row.id)">预订情况</el-button>
            <el-button type="success" plain v-if="scope.row.state === '0'" @click="intoHouse(scope.row.id)">入住</el-button>
            <el-button type="primary" plain v-if="scope.row.state === '1'" @click="returnHouse(scope.row.id)">退房</el-button>
            <el-button type="warning" plain v-if="scope.row.state === '2'" @click="cleanHouse(scope.row.id)">打扫</el-button>
            <el-button type="info" plain v-if="scope.row.state === '3'" @click="finishClean(scope.row.id)">打扫完成</el-button>
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

    <el-dialog title="详情" :visible.sync="dialogTableVisible" width="65%">
      <el-table :data="infoData">
        <el-table-column property="houseName" label="房间名称" width="150"></el-table-column>
        <el-table-column property="houseNumber" label="房间编号" width="200"></el-table-column>
        <el-table-column property="beginDate" label="入住时间" width="200"></el-table-column>
        <el-table-column property="lastDate" label="退房时间" width="200"></el-table-column>
        <el-table-column property="days" label="共计日"></el-table-column>
        <el-table-column property="totalPrice" label="总金额"></el-table-column>
        <el-table-column property="userId" label="预订人ID" width="200"></el-table-column>
        <el-table-column property="userName" label="预订人"></el-table-column>
        <el-table-column property="state" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state === '1'">进行中</el-tag>
            <el-tag type="primary" v-if="scope.row.state === '0'">完成</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div>
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="infoForm.page"
            :page-sizes="[10, 30, 50]"
            :page-size="infoForm.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="infoForm.total">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="入住" :visible.sync="visible" width="35%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="sureToHouse">入住</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<style scoped>

</style>
