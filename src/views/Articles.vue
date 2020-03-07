<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div>
        <List item-layout="vertical">
          <ListItem v-for="item in data" :key="item.title">
            <ListItemMeta
              :avatar="item.avatar"
              :title="item.title"
              :description="item.description"
            />
            <div class="content-wrap" v-html="item.content">             
            </div>
            <template slot="action">
              <li><Icon size=20 type="ios-thumbs-up" /> {{ item.nice_num }}</li>
              <li><Icon size=20 type="ios-chatbubbles" /> 345</li>
              <li :v-if="item.tags !== []"><Icon size=20 type="ios-pricetags" />
                <Tag
                  class="tag-item"
                  v-for="tagItem in item.tags"
                  :key="tagItem"
                  :name="tagItem"
                  color="blue"
                  >{{ tagItem }}</Tag
                >
              </li>
              <li class="show-detail" @click="toDetail(item)">查看全文 ></li>
              <li class="show-detail" v-if="userInfo ? userInfo.role == 0 : false" @click="toUpdateArticle(item)">编辑</li>
            </template>
            <template slot="extra">
              <img
                src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                style="width: 280px"
              />
            </template>
          </ListItem>
        </List>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos'
import { mapState } from 'vuex'

export default {
  components: { HeadInfos },
  data() {
    return {
      data: [
        // {
        //   title: 'This is title 3',
        //   description:
        //     'This is description, this is description, this is description.',
        //   avatar:
        //     'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        //   content:
        //     'This is the content, this is the content, this is the content, this is the content.'
        // }
      ]
    };
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    getArticleList() {
      this.$api.article.get_article_list()
      .then((res) => {
        this.data = res.data.list
      })
    },
    toDetail(item) {
      this.$router.push(`articles/${item._id}`)
    },
    toUpdateArticle(item) {
      this.$router.push(`new/${item._id}`)
    }
  },
  created() {
    this.getArticleList()
  }
};
</script>

<style lang="less" scoped>
.show-detail{
  float: right;
  color: #2d8cf0;
}
.tag-item{
  margin-left: 10px;
}
.content-wrap{
  max-height: 300px;
  overflow: hidden;
}
</style>
