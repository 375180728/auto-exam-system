<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div>
        <div>
          <Form v-model="articleInfo" label-position="left" :label-width="80">
            <FormItem label="文章标题:">
              <Input
                v-model="articleInfo.title"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
            <FormItem label="添加描述:">
              <Input
                v-model="articleInfo.description"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
            <FormItem label="添加标签:">
              <div class="tag-wrap">
                <Tag
                  class="tag-item"
                  size="medium"
                  v-for="item in articleInfo.tags"
                  color="primary"
                  :key="item"
                  :name="item"
                  >{{ item }}</Tag
                >
                <Button
                  class="add-tag"
                  icon="ios-add"
                  type="dashed"
                  size="small"
                  @click="handleAddTagDrawer"
                  >添加标签</Button
                >
                <Drawer
                  title="选择标签"
                  :closable="false"
                  v-model="addTagDrawer"
                  width="20"
                >
                  <CheckboxGroup v-model="articleInfo.tags">
                    <Checkbox
                      :border="true"
                      v-for="item in tagsList"
                      :key="item.name"
                      :name="item.name"
                      :label="item.name"
                      on-change="changeTag"
                      >{{ item.name }}</Checkbox
                    >
                  </CheckboxGroup>
                </Drawer>
              </div>
            </FormItem>
          </Form>
        </div>
        <div>
          <div ref="editor" style="text-align:left"></div>
        </div>
        <Button
          type="primary"
          v-if="!this.update"
          class="submit"
          @click="submitArticle"
          >提交</Button
        >
        <Button type="primary" v-else class="submit" @click="update"
          >更新</Button
        >
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapState, mapMutations } from 'vuex';
import E from 'wangeditor';

export default {
  components: {
    HeadInfos
  },
  data() {
    return {
      articleInfo: {
        content: '',
        title: '',
        description: '',
        tags: []
      },
      editor: {},
      tagsList: [],
      addTagDrawer: false,
      update: false
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['handleArticleInfo']),
    handleAddTagDrawer() {
      this.addTagDrawer = true;
    },
    submitArticle() {
      this.$api.article.create_article(this.articleInfo).then(res => {
        console.log(res);
      });
    },
    updateArticle() {
      console.log(1)
    },
    getArticle() {
      let id = this.$route.params.id;
      this.$api.article.get_article({ id: id }).then(res => {
        let { content, title, description, tags } = res.data;
        this.articleInfo.title = title;
        this.articleInfo.description = description;
        this.articleInfo.tags = tags;
        this.editor.txt.html(content);
      });
    }
  },
  watch: {
    articleInfo: {
      handler(val) {
        console.log(val);
      },
      deep: true
    }
  },
  created() {
    if (!this.userInfo) {
      console.log('先登录');
      location.pathname = '/';
      return;
    }
    if (this.userInfo.role !== 0) {
      console.log('权限不足');
      location.pathname = '/';
      return;
    }
    if (this.$route.params.id) {
      this.update = true;
      this.getArticle();
    }
    this.$api.tag.get_tags().then(res => {
      this.tagsList = res.data;
    });
  },
  mounted() {
    let editor = new E(this.$refs.editor);
    this.editor = editor;
    editor.customConfig.onchange = html => {
      this.articleInfo.content = html;
    };
    editor.create();
  }
};
</script>

<style lang="less" scoped>
.submit {
  width: 100px;
  margin-top: 20px;
}
.tag-wrap {
  line-height: 1.5;
  padding: 4px 7px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  overflow: hidden;
  .tag-item {
    height: 24px;
    line-height: 24px;
    margin-right: 10px;
  }
  .add-tag {
    margin-left: 20px;
  }
}
.ivu-checkbox-border{
  margin-bottom: 10px;
}
</style>
