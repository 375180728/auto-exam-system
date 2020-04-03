<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div>
        <Tabs type="card">
          <TabPane label="个人信息">
            <div class="my-info-container">
              <div class="my-info">
                <span>姓名： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.name"
                  style="width: 300px"
                />
              </div>
              <div class="my-info">
                <span>性别： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.sex"
                  style="width: 300px"
                />
              </div>
              <div class="my-info">
                <span>手机： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.phone"
                  style="width: 300px"
                />
              </div>
              <div class="my-info">
                <span>邮箱： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.email"
                  style="width: 300px"
                />
              </div>
              <div class="my-info">
                <span>学校： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.school"
                  style="width: 300px"
                />
              </div>
              <div class="my-info">
                <span>班级： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.classNum"
                  style="width: 300px"
                />
              </div>
              <div class="my-info">
                <span>学号： </span>
                <Input
                  :disabled="disabled"
                  v-model="userInfo.studentNum"
                  style="width: 300px"
                />
              </div>
            </div>
            <div class="action-btn">
              <Button type="primary" class="left-btn" @click="editorInfo"
                >编辑信息</Button
              >
              <Button type="primary" @click="handleSubmitInfo">提交更改</Button>
            </div>
          </TabPane>
          <TabPane label="登录名密码"> </TabPane>
        </Tabs>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapMutations } from 'vuex';

export default {
  components: { HeadInfos },
  data() {
    return {
      userInfo: {},
      disabled: true
    };
  },
  computed: {
  },
  methods: {
    ...mapMutations(['handleUserInfo']),
    editorInfo() {
      this.disabled = !this.disabled;
    },
    handleSubmitInfo() {
      console.log(this.userInfo)
      this.$api.user.update_user_info(this.userInfo)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getUserInfo() {
      this.token = JSON.parse(window.localStorage.getItem('userInfo')).token;
      this.$api.user.get_user_info()
      .then(res => {
        this.userInfo = res.data;
        this.handleUserInfo(this.userInfo);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.getUserInfo()
  }
};
</script>

<style lang="less">
.my-info-container {
  width: 80%;
  margin: 30px auto;
  font-size: 20px;
  .my-info {
    margin-bottom: 30px;
  }
}
.action-btn {
  width: 80%;
  margin: 30px auto;
  .left-btn {
    margin-right: 30px;
  }
}
</style>
