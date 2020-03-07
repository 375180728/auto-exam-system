<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor';
export default {
  name: 'Editor',
  data() {
    return {
      editorContent: ''
    };
  },
  methods: {
    sendContent() {
      this.$emit('getContent', this.editorContent)
    }
  },
  mounted() {
    let editor = new E(this.$refs.editor)
    editor.customConfig.onchange = html => {
      this.editorContent = html
      this.sendContent()
    };
    editor.create();
  }
};
</script>

<style scoped></style>
