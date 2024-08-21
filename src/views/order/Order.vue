<script>
import {select} from "@/api/house";
import {left} from "core-js/internals/array-reduce";
import {addOrder} from "@/api/order";

export default {
  name: "OrderPage",
  data() {
    return {
      dialogVisible: false,
      visible:false,
      tableData: [],
      total: '',
      searchForm: {
        page: 1,
        size: 10,
        houseName: '',
        state: '',
      },
      info: {

      },
      date: new Date(),
      beginTime:'',
      endTime:'',
      form:{
        days:'',
        price:'',
      },
    }
  },
  created() {
    this.init();
  },
  methods: {
    left,
    init() {
      select(this.searchForm).then(res => {
        if (res.resultCode === 200) {
          this.tableData = res.body.records;
          this.total = res.body.total
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
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    openDia(row) {
      this.info = row;
      this.dialogVisible = true;
    },
    dateChange() {
      if (this.date == null) {
        this.visible = false;
        return;
      }
      const date1 = new Date(this.date[1]);
      const date2 = new Date(this.date[0]);
      const differenceInTime = date2.getTime() - date1.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.form.days = Math.abs(differenceInDays);
      this.form.price = this.form.days * this.info.price;
      this.visible = true;
      console.log(this.form.days);
      console.log(this.form.price);
    },
    orderHouse() {
      this.dialogVisible = false;
      const data = {
        beginDate : this.date[0],
        lastDate : this.date[1],
        houseId : this.info.id,
        days: this.form.days,
        totalPrice : this.form.price,
      };
      addOrder(data).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type:'success',
            message:'房间预定成功！'
          })
        }
      })
    },
  },
}
</script>

<template>
  <div>
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
            prop="price"
            label="房间价格"
            width="250">
          <template slot-scope="scope">
            {{scope.row.price}} 元/天
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="600">
          <template slot-scope="scope">
            <el-button plain type="success" @click="openDia(scope.row)">预订</el-button>
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
        title="房间预定"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose">
      <div style="float: left">
        <span>{{info.houseName}}</span>
      </div>
      <div style="float: right">
        <span>{{info.houseNumber}}</span>
      </div>
      <el-divider></el-divider>
      <el-form :model="form" label-position="left" label-width="100">
        <el-form-item label="选择日期">
          <el-date-picker
              style="float: left"
              @change="dateChange()"
              value-format="yyyy-MM-dd"
              clearable
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="共计天数" v-show="visible">
          <div style="float: left">
            <span>{{this.form.days}}天</span>
          </div>
        </el-form-item>
        <el-form-item label="共计金额" v-show="visible">
          <div style="float: left">
            <span>{{this.form.price}}元</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="orderHouse()">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<style scoped>

</style>
