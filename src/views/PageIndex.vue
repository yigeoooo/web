<script>
export default {
  name: "PageIndex",
  data() {
    return {
     userName:localStorage.getItem("userName"),
    }
  },
  mounted() {

  },
}
</script>

<template>
  <div>
    <div style="margin-top: 10%">
      <h1>
        您好，{{userName}}！欢迎登陆XXX系统！
      </h1>
    </div>
  </div>
</template>

<style scoped>

</style>
