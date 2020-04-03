<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <Tabs>
        <TabPane v-for="cclass in classList" :key="cclass._id" :label="cclass.name" :name="cclass.name" class="class-container">
          <div class="class-info">
            <div>
              <span>本班共</span>
              <span style="color: red"> {{ cclass.student.length }} </span>
              <span>人</span>
            </div>
            <div>
              <span>班级码: </span>
              <span style="color: orange">{{ cclass.code }}</span>
            </div>
          </div>
          <div class="class-list" v-if="cclass.student.length !== 0">
            <Table border :columns="columns" :data="cclass.student" class="class-table">
              <template slot="action">
                <Button type="error">Delete</Button>
              </template>
            </Table>
          </div>
          <div class="class-no-students" v-if="cclass.student.length === 0">
            这个班级还没有学生，请让学生直接发送“字母班级码”快速加班！
          </div>
        </TabPane>
      </Tabs>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
export default {
  components: { HeadInfos },
  data() {
    return {
      lessonId: '',
      classList: [],
      columns: [
        {
          type: 'selection',
          align: 'center',
          width: '60'
        },
        {
          title: '学号',
          key: 'studentNum',
          align: 'center',
          sortable: true
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          width: '120'
        },
        {
          title: '电话',
          key: 'phone',
          align: 'center',
        },
        {
          title: '性别',
          key: 'sex',
          width: '80',
          align: 'center',
        },
        {
          title: '专业班级',
          key: 'classNum',
          align: 'center',
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center',
        },
        {
          title: 'Action',
          slot: 'action',
          align: 'center',
        }
      ]
    };
  },
  methods: {
    getClassInfo(lessonId) {
      this.$api.lesson.get_class_info({ id: lessonId})
      .then((res) => {
        this.classList = res.data.class
        console.log(this.classList)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.lessonId = window.localStorage.getItem('lessonId')
    this.getClassInfo(this.lessonId)
  }
};
</script>

<style lang="less">
.class-container {
  .class-info {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 18px;
    }
  }
  .class-list {
    margin-top: 20px;
  }
  .class-no-students {
    font-size: 28px;
    color: silver;
    width: 420px;
    margin: 100px auto;
    
  }
}
</style>