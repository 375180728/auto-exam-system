<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div style="height: 600px">
        <div>
          <Button icon="md-add-circle" type="primary" @click="openJoinClassDrawer"
            >加入班级</Button
          >
        </div>
        <Divider />
        <Drawer
          title="加入班级"
          v-model="joinClassDrawerValue"
          width="20"
          :closable="true"
          :mask-closable="false"
          class="join-class-drawer"
        >
          <div>
            <div>
              班级码：
            </div>
            <Input v-model="code">

            </Input>
          </div>
          <div class="demo-drawer-footer">
            <Button class="actionButton" @click="joinClass" type="primary">加入</Button>
            <Button>取消</Button>
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
</template>2

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapMutations, mapState } from 'vuex';

export default {
  components: { HeadInfos },
  data() {
    return {
      joinClassDrawerValue: false,
      code: ''
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    openJoinClassDrawer() {
      this.joinClassDrawerValue = true;
    },
    joinClass() {
      let params = {
        code: this.code
      }
      this.$api.lesson.join_class(params)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      console.log(this.code)
    }
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
  }
};
</script>

<style lang="less">
.join-class-drawer {
  .ivu-drawer-right {
    height: 200px !important;
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
