<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu
          active-name="1-1"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="1-1" to="/">
            <Icon type="ios-home"></Icon>
            <span>首页</span>
          </MenuItem>
          <MenuItem name="1-2" to="/student/course" v-show="isStudent">
						<Icon type="ios-bookmarks"/></Icon>
            <span>我的课程</span>
          </MenuItem>
          <MenuItem name="1-3" to="/teacher/course" v-show="isTeacher">
						<Icon type="ios-bookmarks"/></Icon>
            <span>我的课程</span>
          </MenuItem>
          <MenuItem name="1-4" to="/my" v-show="isStudent || isTeacher">
						<Icon type="ios-body"></Icon>
            <span>个人设置</span>
          </MenuItem>
          <MenuItem name="1-5" to="/articles" v-show="isAdmin">
						<Icon type="ios-book"></Icon>
            <span>文章</span>
          </MenuItem>
          <MenuItem name="1-6" to="/tags" v-show="isAdmin">
						<Icon type="ios-pricetag"></Icon>
            <span>标签</span>
          </MenuItem>
          <MenuItem name="1-7" to="/new" v-show="isAdmin">
						<Icon type="ios-create"></Icon>
            <span>写博客</span>
          </MenuItem>
          <MenuItem name="1-8" to="/tagadmin" v-show="isAdmin">
						<Icon type="ios-pricetags"></Icon>
            <span>标签管理</span>
          </MenuItem>
          <Submenu name="2" v-show="isTeacher">
            <template slot="title">
              <Icon type="ios-folder"/>
              备课区
            </template>
            <MenuItem name="2-1" to="/teacher/testPaper">练习卷模板</MenuItem>
            <MenuItem name="2-2">教案</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <router-view />
      </Layout>
      <LoginForm />
      <RegisterForm />
    </Layout>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      isCollapsed: false,
      isAdmin: false,
      isStudent: false,
      isTeacher: false,
      token: '',
    };
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    menuitemClasses: function() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
    },
  },
  methods: {
    ...mapMutations([
      'handleUserInfo'
    ]),
  },
  watch: {
    userInfo: {
      handler(val) {
        if(!val) {
          this.isAdmin = false
          this.isStudent = false
          this.isTeacher = false
          return
        }
        if(val.role == 0) {
          this.isAdmin = true
          return
        } 
        if(val.role == 1) {
          this.isStudent = true
          return
        }
        if(val.role == 2) {
          this.isTeacher = true
          return
        }
      },
      deep: true
    },
  },
  created() {
    if(!window.localStorage.getItem('userInfo')) {
      return
    }
    this.token = JSON.parse(window.localStorage.getItem('userInfo')).token
    this.$api.user.get_user_info()
    .then((res) => {
      let userInfo = res.data
      this.handleUserInfo(userInfo)
    })
  }
};
</script>
<style scoped>
/* .ivu-layout-sider {
  width: 10vw !important;
} */
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
