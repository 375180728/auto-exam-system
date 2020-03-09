<template>
  <div class="head-container">
    <Breadcrumb :style="{width: '800px'}">
      <BreadcrumbItem v-for="item in this.locationArr" :key="item">{{ item }}</BreadcrumbItem>
    </Breadcrumb>
    <div class="action">
      <Button type="primary" @click="this.openLoginDrawer" v-show="!isLoged">登陆</Button>
      <Button type="primary" @click="this.openRegDrawer" v-show="!isLoged">注册</Button>
      <Button type="primary" @click="this.logout" v-show="isLoged">登出</Button>
      <div class="welcome" v-if="isLoged">
        <span>你好！</span>
        <span>{{ this.userInfo.username || null }} </span>
        <span>{{ this.userInfo.role == 1 ? '同学' : '老师'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'HeadInfos',
  data() {
    return {
      locationArr: [],
    };
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    isLoged() {
      return this.userInfo == null ? false : true
    }
  },
  methods: {
    ...mapMutations([
      'handleLoginDrawer',
      'handleRegDrawer',
      'handleUserInfo'
    ]),
    getLocation() {
      this.locationArr = location.pathname.split('/').splice(1)
      if(this.locationArr[0] == "") {
        this.locationArr = []
      }
      this.locationArr.unshift('Home')
      return this.locationArr
    },
    openLoginDrawer() {
      this.handleLoginDrawer(true)
    },
    openRegDrawer() {
      this.handleRegDrawer(true)
    },
    logout() {
      window.localStorage.removeItem('userInfo')
      this.handleUserInfo(null)
      this.$Message.success('登出成功')
    }
  },
  watch: {
    $route(to, from) {
      this.getLocation()
    }
  },
  created() {
    this.getLocation()
  }
};
</script>

<style lang="less">
.head-container{
  display: flex;
  margin: 16px 0px;
  justify-content: space-between;
  .action{
    overflow: hidden;
    button{
      float: right;
      margin-left: 20px;
      width: 60px;
    }
    .welcome {
      height: 32px;
      line-height: 32px;
      float: right;
    }
  }
}
</style>
