<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div style="">
        <div class="tag-wrap">
          <Tag
            class="tag-item"
            size="medium"
            v-for="item in tagsList"
            :color="item.color"
            :key="item.name"
            :name="item.name"
            @click="toArticleList(item.name)"
            >{{ item.name }}</Tag
          >
        </div>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapState } from 'vuex';

export default {
  components: {
    HeadInfos
  },
  data() {
    return {
      tagsList: [],
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    getTagList() {
      this.$api.tag.get_tags()
      .then(res => {
        console.log(res);
        this.tagsList = res.data;
      });
    }, 
    toArticleList(item) {
      console.log(item)
    }
  },
  created() {
    this.getTagList()
  }
};
</script>
