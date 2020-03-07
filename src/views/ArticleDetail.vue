<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div class="head-info">
        <h1>{{ articleInfo.title }}</h1>
        <ul class="publish-date">
          <li><Icon type="ios-clock-outline" />{{ date }}</li>
          <li><Icon type="ios-thumbs-up-outline" /> {{ articleInfo.nice_num }}</li>
          <li><Icon type="ios-chatbubbles-outline" /> 345</li>
        </ul>
      </div>
      <div v-html="articleInfo.content"> {{ articleInfo.content }} </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos'
export default {
	components: { HeadInfos },
	data () {
		return {
      articleInfo: {},
      date: '',
		}
  },
  methods: {
    getArticle() {
      let id = this.$route.params.id
      this.$api.article.get_article({id: id})
      .then((res) => {
        this.articleInfo = res.data
        this.handleDate(this.articleInfo.create_date)
      })
    },
    handleDate(date) {
      this.date = date.slice(0, 10)
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
.head-info{
  margin: 0 auto;
  margin-bottom: 20px;
  // border-bottom: 1px solid #ccc;
  h1{
    text-align: center;
  }
  .publish-date{
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    list-style: none;
    li{
      padding: 0 10px;
      color: #ccc;
    }
  }
}
</style>