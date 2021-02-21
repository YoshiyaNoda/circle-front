<template>
  <div class="container">
    <div v-if="articleData.type === 'heading'">
      <HeadingEditor :article-data="d" />
    </div>
    <div v-if="articleData.type === 'paragraph'">
      <ParagraphEditor :article-data="d"/>
    </div>
    <div v-if="articleData.type === 'image'">
      <ImageEditor :article-data="d"/>
    </div>
    <div v-if="articleData.type === 'paragraphWithImage'">
      <ParagraphWithImageEditor :article-data="d"/>
    </div>
  </div>
</template> 

<script>
import HeadingEditor from '@/components/editors/HeadingEditor.vue'
import ParagraphEditor from '@/components/editors/ParagraphEditor.vue'
import ImageEditor from '@/components/editors/ImageEditor.vue'
import ParagraphWithImageEditor from '@/components/editors/ParagraphWithImageEditor.vue'

export default {
  components: {
    HeadingEditor,
    ParagraphEditor,
    ImageEditor,
    ParagraphWithImageEditor,
  },
  data: function() {
    return {
      d: this.articleData,
    }
  },
  props: {
    articleData: new Object()
  },
  mounted() {
    if(this.articleData.type === "paragraphWithImage") {
      console.log("hoge",this.articleData)
    }
  },
  watch: {
    // こうやってpropsは監視して、dataを子コンポーネントに渡さないと、おかしなことが起こる
    articleData: function(data) {
      this.d = data;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>