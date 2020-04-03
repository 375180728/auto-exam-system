<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div>
        <div>
          <Button icon="md-add-circle" type="success" @click="toNewEdit"
            >新建试卷</Button
          >
        </div>
        <Divider></Divider>
        <div>
          <List>
            <ListItem v-for="item in examList" :key="item._id">
              <ListItemMeta
                avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                :title=item.name
                :description=item.create_date
              />
              <template slot="action">
                <li>
                  <a @click=toEdit(item)>编辑</a>
                </li>
                <li>
                  <a @click=deletePaper(item)>删除</a>
                </li>
                <li>
                  <a @click=publishPaper(item)>发布</a>
                </li>
              </template>
            </ListItem>
          </List>
        </div>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapMutations } from 'vuex'

export default {
  components: { HeadInfos },
  data() {
    return {
      examList: []
    };
  },
  methods: {
    ...mapMutations(['handlePaperId']),
    getExamList() {
      this.$api.exam
      .get_exam_list()
      .then(res => {
        console.log(res);
        this.examList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    toEdit(item) {
      this.$router.push('/teacher/testEditor')
      console.log(item)
      this.handlePaperId(item._id)
    },
    toNewEdit() {
      this.$router.push('/teacher/testEditor')
      this.handlePaperId('')
    }
  },
  created() {
    this.getExamList();
  }
};
</script>
