<template>
  <div>
    <Drawer
      title="登录"
      v-model="loginDrawerValue"
      width="20"
      :closable="false"
      :mask-closable="false"
      :styles="styles"
    >
      <Form 
        :model="formData"
        :show-message="true">
        <Row>
          <Col>
            <FormItem label="Username" prop="username">
              <Input
                v-model="formData.username"
                placeholder="please enter username"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="Password" prop="password">
              <Input
                v-model="formData.password"
                placeholder="please enter password"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div>
        <span>没有账号？</span>
        <a v-on:click="changeLoginReg">注册</a>
      </div>
      <div class="demo-drawer-footer">
        <Button class="actionButton" @click="closeLoginDrawer">取消</Button>
        <Button class="actionButton" type="primary" @click="handleSubmit">登录</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import crypto from 'crypto-js'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    ...mapMutations([
      'handleLoginDrawer',
      'handleRegDrawer',
      'handleUserInfo'
    ]),
    formDataInit() {
      this.formData = {
        username: '',
        password: '',
      }
    },
    openLoginDrawer() {
      this.handleLoginDrawer(true)
    },
    closeLoginDrawer() {
      this.handleLoginDrawer(false)
    },
    openRegDrawer() {
      this.handleRegDrawer(true)
    },
    changeLoginReg() {
      this.closeLoginDrawer()
      this.openRegDrawer()
    },
    saveUserInfo(userInfo) {
      this.handleUserInfo(userInfo)
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    handleSubmit() {
      const password = crypto.AES.encrypt(this.formData.password, 'pengshixia.dev').toString()
      const username = this.formData.username
      this.$api.auth.login({username: username, password: password})
      .then((res) => {
        if(res.status == 10000) {
          this.closeLoginDrawer()
          this.formDataInit()
          this.saveUserInfo(res.data)
          this.$Message.success('登录成功')
          return 
        } else {
          this.$Message.error(res.messages[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState([
      'loginDrawerValue'
    ]),
  },
  watch: {
    
  },
};
</script>
<style lang="less">
.demo-drawer-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
  .actionButton{
    width: 80px
  }
}
.ivu-drawer-right{
  height: 360px !important;
  right: 40% !important;
  margin-top: 160px;
}
.ivu-drawer-mask,
.ivu-drawer-wrap{
  z-index: 20000 !important; 
}
</style>
