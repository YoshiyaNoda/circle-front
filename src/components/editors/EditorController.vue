<template>
  <div class="container">
    <div v-if="articleData.type === 'heading'">
      <HeadingEditor :article-data="d" />
    </div>
    <div v-if="articleData.type === 'paragraph'">
      <ParagraphEditor />
    </div>
  </div>
</template> 

<script>
import HeadingEditor from '@/components/editors/HeadingEditor.vue';
import ParagraphEditor from '@/components/editors/ParagraphEditor.vue';
import ArticleComponent from '@/components/ArticleComponent.js';
import _ from 'lodash';

export default {
  components: {
    HeadingEditor,
    ParagraphEditor
  },
  data: function() {
    return {
      d: this.articleData
    };
  },
  props: {
    articleData: _.cloneDeep(ArticleComponent.heading.normal)
  },
  watch: {
    // こうやってpropsは監視して、dataを子コンポーネントに渡さないと、おかしなことが起こる
    articleData: function(data) {
      this.d = data;
    }
  },
  methods: {
    // updateData: function() {
    //   this.$parent.articleData[this.articleData.order] = this.articleData;
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>