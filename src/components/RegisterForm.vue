<template>
  <div>
    <Drawer
      title="注册"
      v-model="regDrawerValue"
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
        <a v-on:click="changeLoginReg">已有账号登录</a>
      </div>
      <div class="demo-drawer-footer">
        <Button class="actionButton" @click="closeRegDrawer">取消</Button>
        <Button class="actionButton" type="primary" @click="handleSubmit">注册</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
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
    openRegDrawer() {
      this.handleRegDrawer(true)
    },
    closeRegDrawer() {
      this.handleRegDrawer(false)
    },
    openLoginDrawer() {
      this.handleLoginDrawer(true)
    },
    changeLoginReg() {
      this.closeRegDrawer()
      this.openLoginDrawer()
    },
    handleSubmit() {
      this.$api.user.register(this.formData)
      .then((res) => {
        if(res.status === 10000) {
          this.changeLoginReg()
          this.formDataInit()
          this.$Message.success(res.messages[0])
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
      'regDrawerValue'
    ]),
  },
  watch: {
    
  }
};
</script>
<style lang="less" scoped>
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
}
</style>
