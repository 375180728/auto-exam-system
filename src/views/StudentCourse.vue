<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div style="height: 600px">
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
      
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    openAddTermDrawer() {
      this.addTermDrawerValue = true;
    },
    handleSubmit() {}
  },
  created() {
    if (!this.userInfo) {
      alert('请先登录');
      location.pathname = '/';
      return;
    }
    if (this.userInfo.role !== 1) {
      console.log('权限不符合');
      location.pathname = '/';
      return;
    }
    // if (this.$route.params.id) {
    //   this.update = true;
    //   this.getArticle();
    // }
    // this.$api.tag.get_tags().then(res => {
    //   this.tagsList = res.data;
    // });
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

}
</style>
