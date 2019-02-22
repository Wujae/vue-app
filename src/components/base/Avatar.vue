<template>
  <div class="avatar">
    <el-button @click="changeAvatar" class="avatar-circle" type="warning" circle><img class="avatar-img" :src="imageUrl" /></el-button>
    <div class="user-info">
      <div class="name">{{name}}</div>
      <div class="loginName">{{loginName}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'avatar',
  data () {
    return {
      flag: false,
      name: '唐车管理员',
      loginName: 'Admin'
    }
  },
  computed: {
    imageUrl () {
      return this.flag ? './static/images/platinum.PNG' : './static/images/nice.jpg'
    }
  },
  methods: {
    changeAvatar () {
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>
  .avatar {
    width: 200px;
    position: relative;
    left: 0;
    text-align: left;
    padding-left: 12px;

  }

  .avatar-circle {
    height: 40px;
    width: 40px;
    position: relative;
    top: -30px;
  }

  .avatar-img {
    height: 38px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
  }

  .user-info {
    padding-top: 10px;
    overflow: hidden;
    height: 60px;
    width: 100px;
    display: inline-block;
  }

  .name {
    height: 20px;
    width: 100px;
    font-size: 16px;
    line-height: 20px;
  }

  .loginName {
    height: 20px;
    width: 70px;
    font-size: 12px;
    line-height: 20px;
  }
</style>
