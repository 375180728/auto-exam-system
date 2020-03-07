<template>
  <div class="tag-wrap">
    <Tag class="tag-item" size="medium" v-for="item in tagsList" :color="item.color" :key="item.name" :name="item.name" closable @on-close="handleTagClose(item.name)">{{ item.name }}</Tag>
    <Button class="add-tag" icon="ios-add" type="dashed" size="small" @click="handleCreateTagDrawer">新建标签</Button>
    <Drawer title="新建标签" :closable="true" v-model="createTagDrawer" width="20"> 
      <span>标签名：</span>
      <Input class="tagName" v-model="tagName">
      </Input>
      <span>标签颜色选择器：</span>
      <ColorPicker v-model="tagColor"/>
      <div class="demo-drawer-footer">
        <Button class="actionButton" type="primary" @click="handleCreateTags">新建</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: 'AddTags',
  data() {
    return {
      tagsList: [],
      createTagDrawer: false,
      tagName: '',
      tagColor: '',
    };
  },
  methods: {
    getTagList() {
      this.$api.tag.get_tags()
      .then((res) => {
        console.log(res)
        this.tagsList = res.data
      })
    },
    handleCreateTagDrawer() {
      this.createTagDrawer = true
    },
    handleCreateTags() {
      const params = {
        tagName: this.tagName,
        tagColor: this.tagColor
      }
      this.$api.tag.create_tags(params)
      .then((res) => {
        if(res.status === 10000) {
          this.$Message.success(res.messages[0])
          this.getTagList()
          return
        } else {
          this.$Message.error(res.messages[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleTagClose(name) {
      console.log(name)
    }
  },
  mounted() {
  },
  created() {
    this.getTagList()
  }
};
</script>

<style lang="less">
.tagName{
  margin-top: 5px;
  margin-bottom: 15px;
}
.ivu-select-dropdown{
  top: 0px !important;
}
</style>
