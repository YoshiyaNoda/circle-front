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
    <transition>
      <ImageSelector v-show="selectedImageEditor" />
    </transition>
  </div>
</template> 

<script>
import HeadingEditor from '@/components/editors/HeadingEditor.vue'
import ParagraphEditor from '@/components/editors/ParagraphEditor.vue'
import ImageEditor from '@/components/editors/ImageEditor.vue'
import ImageSelector from '@/components/editors/ImageSelector.vue'

export default {
  components: {
    HeadingEditor,
    ParagraphEditor,
    ImageEditor,
    ImageSelector
  },
  data: function() {
    return {
      d: this.articleData,
      selectedImageEditor: null
    }
  },
  methods: {
    setSelectedImageEditor(editor) {
      this.selectedImageEditor = editor;
    }
  },
  props: {
    articleData: new Object()
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