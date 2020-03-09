<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div>
        <div>
          <Button icon="md-add-circle" type="primary" @click="openAddTermDrawer"
            >添加学期</Button
          >
        </div>
        <Divider />
        <Drawer
          title="添加学期"
          v-model="addTermDrawerValue"
          width="20"
          :closable="true"
          :mask-closable="false"
          class="addTermDrawer"
        >
          <Form :model="addTermForm" :show-message="true">
            <Row>
              <Col>
                <FormItem label="学期名称" prop="termName">
                  <Input
                    v-model="addTermForm.termName"
                    placeholder="请输入学期名称"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="背景颜色选择器" prop="bgColor">
                  <ColorPicker v-model="addTermForm.bgColor" />
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="demo-drawer-footer">
            <Button class="actionButton" type="primary" @click="handleSubmit"
              >保存</Button
            >
          </div>
        </Drawer>
        <div class="card-container">
          <!-- <Card>
            <div style="text-align:center">
              <h3>A high quality UI Toolkit based on Vue.js</h3>
            </div>
          </Card>
          <Card>
            <div style="text-align:center">
              <h3>A high quality UI Toolkit based on Vue.js</h3>
            </div>
          </Card> -->
          <Card v-for="item in termList" :key="item.termName">
            <div class="card-wrap">
              <div class="card-title">
                <h3>{{ item.termName }}</h3>
                <!-- <Button icon="md-settings" shape="circle"></Button> -->
                <Icon
                  type="md-settings"
                  size="22"
                  @click="handleSetting"
                  class="setting-icon"
                />
              </div>
              <Divider />
              <div class="card-body" :style="{ backgroundColor: item.bgColor }">
                <span>数学</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapMutations, mapState } from 'vuex';

export default {
  components: { HeadInfos },
  data() {
    return {
      addTermDrawerValue: false,
      addTermForm: {
        termName: '',
        bgColor: '#19be6b'
      },
      termList: [
        { termName: 'asd', bgColor: '#19be6b' },
        { termName: 'aa', bgColor: '#19be6b' },
        { termName: 'a', bgColor: '#19be6b' },
        { termName: 'aassaa', bgColor: '#19be6b' },
        { termName: 'aaaa', bgColor: '#19be6b' },
        { termName: 'aaassssa', bgColor: '#19be6b' }
      ]
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    openAddTermDrawer() {
      this.addTermDrawerValue = true;
    },
    handleSubmit() {
      console.log(this.addTermForm)
    },
    handleSetting() {
      console.log(1);
    }
  },
  created() {
    if (!this.userInfo) {
      this.$router.push('/')
      this.$Message.error('请先登录')
      return;
    }
    if (this.userInfo.role !== 2) {
      this.$router.push('/')
      this.$Message.error('您的权限不符合')
      return;
    }
  }
};
</script>

<style lang="less">
.addTermDrawer {
  .ivu-drawer-right {
    height: 360px !important;
    right: 40% !important;
    margin-top: 160px;
  }
  .ivu-drawer-mask,
  .ivu-drawer-wrap {
    z-index: 20000 !important;
  }
}
.ivu-select-dropdown {
  top: -100px !important;
}
.card-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  .ivu-card {
    width: 19%;
    height: 300px;
    margin: 0 0.5%;
    margin-bottom: 20px;
    .card-wrap {
      .card-title {
        display: flex;
        justify-content: space-between;
        .setting-icon {
          cursor: pointer;
        }
      }
      .card-body {
        height: 190px;
      }
    }
  }
}
</style>
