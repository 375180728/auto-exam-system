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
          class="add-term-drawer"
          @on-close="closeAddTermDrawer">
          <Form :model="addTermForm" :show-message="true">
            <Row>
              <Col>
                <FormItem label="学期名称" prop="name">
                  <Input
                    v-model="addTermForm.name"
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
            <Button class="actionButton" type="primary" @click="handleSubmitTerm" v-show="!isRevise"
              >保存</Button
            >
            <Button class="actionButton" type="success" @click="handleUpdateTerm(false)" v-show="isRevise">修改</Button>
            <Button class="actionButton" type="error" @click="handleUpdateTerm(true)" v-show="isRevise">删除</Button>
            <Button class="actionButton" type="primary" @click="closeAddTermDrawer"
              >取消</Button
            >
          </div>
        </Drawer>
        <div class="card-container">
          <Card v-for="item in termList" :key="item._id">
            <div class="card-wrap">
              <div class="card-title">
                <h3>{{ item.name }}</h3>
                <Icon
                  type="md-settings"
                  size="22"
                  @click="reviseTerm(item)"
                  class="setting-icon"
                />
              </div>
              <Divider />
              <div class="card-body" :style="{ backgroundColor: item.bgColor }">
                <div class="card-lesson-list">
                  <div v-for="lesson in item.lessons" :key="lesson._id">
                    <a @click="toCourseAdmin(lesson._id)">{{ lesson.name }}</a>
                  </div>
                </div>
                <div class="card-action">
                  <div class="action-btn" @click="handleAddLesson(item._id)">
                    <Icon type="md-add" size="24" />
                    <div>
                      添加
                    </div>
                  </div>
                  <div class="action-btn">
                    <Icon type="ios-copy" size="24" />
                    <div>
                      复制
                    </div>
                  </div>
                  <div class="action-btn">
                    <Icon type="md-move" size="24" />
                    <div>
                      移动
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Drawer
          title="添加课程"
          v-model="addLessonDrawerValue"
          width="20"
          class="add-term-drawer"
          @on-close="closeAddLessonDrawer"
          >
          <Form :model="addLessonForm" :show-message="true">
            <Row>
              <Col>
                <FormItem label="课程名称" prop="name">
                  <Input
                    v-model="addLessonForm.name"
                    placeholder="请输入课程名称"
                  >
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
                    v-model="addLessonForm.description"
                    placeholder="请输入课程简介"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="demo-drawer-footer">
            <Button class="actionButton" type="primary" @click="handleSubmitLesson" v-show="!isRevise"
              >保存</Button
            >
            <Button class="actionButton" type="success" @click="handleUpdateTerm(false)" v-show="isRevise">修改</Button>
            <Button class="actionButton" type="error" @click="handleUpdateTerm(true)" v-show="isRevise">删除</Button>
            <Button class="actionButton" type="primary" @click="closeAddLessonDrawer"
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
      addTermDrawerValue: false,
      addLessonDrawerValue: false,
      addLessonForm: {},
      addTermForm: {
        name: '',
        bgColor: ''
      },
      isRevise: false,
      termList: [],
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    openAddTermDrawer() {
      if(!this.isRevise) {
        this.addTermForm = {
          name: '',
          bgColor: ''
        }
      }
      this.addTermDrawerValue = true
    },
    closeAddTermDrawer() {
      this.addTermDrawerValue = false
      setTimeout(() => {
        this.isRevise = false
      }, 150)
      this.getTermList()
    },
    reviseTerm(item) {
      this.openAddTermDrawer()
      this.isRevise = true
      this.addTermForm = item
    },
    getTermList() {
      this.$api.term.get_term_list()
      .then((res) => {
        this.termList = res.data
        console.log(this.termList)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleSubmitTerm() {
      this.$api.term.create_term(this.addTermForm)
      .then((res) => {
        this.closeAddTermDrawer()
        if(res.status === 10000) {
          this.$Message.success(res.messages[0])
        } else {
          this.$Message.error(res.messages[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleUpdateTerm(deleted) {
      this.addTermForm.deleted = deleted
      console.log(this.addTermForm)
      this.$api.term.update_term(this.addTermForm)
      .then((res) => {
        if(res.status === 10000) {
          this.$Message.success(res.messages[0])
          this.closeAddTermDrawer()
        } else {
          this.$Message.error(res.messages[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    closeAddLessonDrawer() {
      this.addLessonForm = {}
      this.addLessonDrawerValue = false
      this.getTermList()
    },
    handleAddLesson(item) {
      this.addLessonForm.term_id = item
      this.addLessonDrawerValue = true
    }, 
    handleSubmitLesson() {
      this.$api.lesson.create_lesson(this.addLessonForm)
      .then((res) => {
        this.closeAddLessonDrawer()
        console.log(res)
      })
    },

    toCourseAdmin(lessonId) {
      window.localStorage.setItem('lessonId', lessonId)
      this.$router.push('/teacher/courseAdmin')
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
    this.getTermList()
  }
};
</script>

<style lang="less">
.add-term-drawer {
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
    height: 380px;
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
        position: relative;
        padding: 0 20px;
        padding-top: 10px;
        border-radius: 5px;
        height: 270px;
        .card-lesson-list {
          max-height: 180px;
          overflow-y: auto;
          // color: white;
          a {
            color: #515a6e;
          }
        }
        .card-action {
          width: 82%;
          display: flex;
          position: absolute;
          justify-content: space-between;
          bottom: 10px;
          .action-btn {
            cursor: pointer;
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(197, 194, 194, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(197, 194, 194, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
