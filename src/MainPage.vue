<script>
import {getPer} from "@/api/menu";

export default {
  name: "MainPage",
  data() {
    return {
      menuList:[],
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getPer(localStorage.getItem("userId")).then(res => {
        if (res.resultCode === 200) {
          this.menuList = res.body
        }
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({
        name:key
      })
    },
    loginOut() {
      this.$router.push({
        path:'/'
      })
      localStorage.clear();
    }
  },
}
</script>

<template>
  <div>
    <div style="display: flex;justify-content: center">
      <el-menu v-for="(item,index) in menuList" :key="index" :default-active="$route.path" mode="horizontal" @select="handleSelect">
        <component class="menu-item"
                   :is="(item.children && item.children.length>0) ? 'el-submenu':'el-menu-item'" :index="item.router">
          <template slot="title">
            <span>{{item.menuName}}</span>
          </template>
          <template v-if="item.children&&item.children.length>0">
            <el-menu-item class="menu-item" v-for="(v,i) in item.children" :key="i" :index="v.router">
              <span slot="title">{{v.menuName}}</span>
            </el-menu-item>
          </template>
        </component>
      </el-menu>
    </div>
    <div style="float: right;margin-right: 20px;margin-bottom: 50px">
      <el-button type="primary" plain @click="loginOut">退出登录</el-button>
    </div>
    <br>
    <el-divider></el-divider>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.content{
  width: 100%;
  height: 850px;
  border: #e1e6e6 solid 2px;
  border-radius: 20px;
}
</style>
