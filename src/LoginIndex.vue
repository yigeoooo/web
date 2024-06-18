<script>
import {userLogin} from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      form:{},
    }
  },
  methods: {
    login() {
      userLogin(this.form).then(res => {
        if (res.resultCode === 200) {
          localStorage.setItem("token", res.body.token)
          localStorage.setItem("userName", res.body.userName)
          localStorage.setItem("userId", res.body.userId)
          this.$router.push({
            name:'content'
          })
        }
      })
    },
  },
  created() {

  },
}
</script>

<template>
  <div id="div">
    <div id="bck">
      <h1>XXX管理系统</h1><br>
      <div style="margin-left: 40px">
        <el-form label-position="left" label-width="80px" v-model="form" style="width: 400px">
          <el-form-item label="用户ID">
            <el-input v-model="form.loginId"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login" plain>登录</el-button>
      </div><br><br>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
#div{
  height: 920px;
}
#bck{
  position: absolute;
  left: 35%;
  top: 20%;
  border: 1px solid black;
  border-radius: 45px;
  width: 480px;
}
</style>
