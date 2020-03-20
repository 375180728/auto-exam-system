<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <!-- <div style="height: 600px">Content</div> -->
      <div>
        <div>
          <div class="form-group">
            <span>课程名称： </span>
            <span>{{ this.lessonInfo.name }}</span>
            <Button
              icon="ios-settings"
              type="primary"
              @click="openLessonSettingDrawer"
              >课程设置</Button
            >
          </div>
          <div class="form-group">
            <span>班级：</span>
            <Card v-for="cclass in this.lessonInfo.class" :key="cclass._id">{{
              cclass.name
            }}</Card>
            <Button
              icon="md-add-circle"
              type="success"
              @click="openAddClassDrawer"
              >添加</Button
            >
          </div>
          <div class="form-group">
            <span>助教：</span>
            <Button icon="md-add-circle" type="success">添加</Button>
          </div>
          <div class="action-item">
            <Card class="student-list" to="/teacher/studentList">
              学生列表
            </Card>
            <Card class="online-exam">
              在线考试
            </Card>
            <!-- <Card>
              学生列表
            </Card>
            <Card>
              学生列表
            </Card>
            <Card>
              学生列表
            </Card>
            <Card>
              学生列表
            </Card>
            <Card>
              学生列表
            </Card>
            <Card>
              学生列表
            </Card> -->
          </div>
        </div>
        <Drawer
          title="课程设置"
          v-model="lessonSettingDrawerValue"
          class="lesson-setting-drawer"
          width="20"
          @on-close="closeLessonSettingDrawer"
        >
          <Form :model="lessonInfo" :show-message="true">
            <Row>
              <Col>
                <FormItem label="课程名称" prop="name">
                  <Input v-model="lessonInfo.name" placeholder="请输入课程名称">
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="课程简介" prop="description">
                  <Input
                    type="textarea"
                    :rows="4"
                    v-model="lessonInfo.description"
                    placeholder="请输入课程简介"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="demo-drawer-footer">
            <Button
              class="actionButton"
              type="primary"
              @click="handleUpdateLesson(false)"
              >保存</Button
            >
            <Button
              class="actionButton"
              type="error"
              @click="handleUpdateLesson(true)"
              >删除</Button
            >
            <Button
              class="actionButton"
              type="primary"
              @click="closeLessonSettingDrawer"
              >取消</Button
            >
          </div>
        </Drawer>
        <Drawer
          title="添加班级"
          v-model="addClassDrawerValue"
          class="add-class-drawer"
          width="20"
        >
          <div class="add-form">
            <div class="add-form-title">
              班级名称：
            </div>
            <Input v-model="className"> </Input>
          </div>
          <div class="demo-drawer-footer">
            <Button class="actionButton" type="primary" @click="handleAddClass"
              >保存</Button
            >
            <Button
              class="actionButton"
              type="primary"
              @click="closeAddClassDrawer"
              >取消</Button
            >
          </div>
        </Drawer>
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
      lessonSettingDrawerValue: false,
      addClassDrawerValue: false,
      addAssistDrawervalue: false,
      className: '',
      lessonInfo: {},
      lessonId: ''
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    openLessonSettingDrawer() {
      this.lessonSettingDrawerValue = true;
    },
    closeLessonSettingDrawer() {
      this.lessonSettingDrawerValue = false;
      this.lessonInfo = {};
      this.getLessonInfo(this.lessonId);
    },
    handleUpdateLesson(deleted) {
      this.lessonInfo.deleted = deleted;
      this.$api.lesson
        .update_lesson_setting(this.lessonInfo)
        .then(res => {
          if (res.messages[0] == '删除成功') {
            this.$Message.success(res.messages[0]);
            this.$router.push('/teacher/course');
            return;
          }
          this.$Message.success(res.messages[0]);
          this.closeLessonSettingDrawer();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLessonInfo(lessonId) {
      this.$api.lesson
        .get_lesson_info({ id: lessonId })
        .then(res => {
          this.lessonInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openAddClassDrawer() {
      this.addClassDrawerValue = true;
    },
    closeAddClassDrawer() {
      this.addClassDrawerValue = false;
    },
    handleAddClass() {
      let params = {
        name: this.className,
        id: this.lessonId
      };
      this.$api.lesson
        .add_class(params)
        .then(res => {
          this.closeAddClassDrawer();
          this.getLessonInfo(this.lessonId);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!this.userInfo) {
      this.$router.push('/');
      this.$Message.error('请先登录');
      return;
    }
    if (this.userInfo.role !== 2) {
      this.$router.push('/');
      this.$Message.error('您的权限不符合');
      return;
    }
    this.lessonId = window.localStorage.getItem('lessonId');
    this.getLessonInfo(this.lessonId);
  }
};
</script>

<style lang="less">
.form-group {
  display: flex;
  margin-left: 20px;
  margin-bottom: 25px;
  font-size: 17px;
  font-weight: 700;
  span {
    line-height: 32px;
  }
  .ivu-card {
    margin-right: 10px;
    .ivu-card-body {
      padding: 0 10px;
      text-align: center;
      line-height: 32px;
    }
  }
  button {
    margin-left: 30px;
  }
}
.action-item {
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
  .student-list {
    background-color: #fa1;
  }
  .online-exam {
    background-color: tomato;
  }
  .ivu-card {
    color: white;
    text-align: center;
    justify-content: flex-start;
    width: 16%;
    margin-right: 4%;
    margin-bottom: 25px;
  }
}
.lesson-setting-drawer {
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
.add-class-drawer {
  .add-form {
    .add-form-title {
      margin-bottom: 15px;
    }
  }
  .ivu-drawer-right {
    height: 210px !important;
    right: 40% !important;
    margin-top: 160px;
  }
  .ivu-drawer-mask,
  .ivu-drawer-wrap {
    z-index: 20000 !important;
  }
}
</style>
