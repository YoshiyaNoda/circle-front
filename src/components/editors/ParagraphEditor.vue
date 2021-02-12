<template>
  <div class="container">
    <div class="paragraphEditor">
      <div v-text="d.data.content" contenteditable="true" @input="sync"></div>
    </div>
    <textarea type="text" v-model="d.data.content"></textarea>
  </div>
</template>

<script>
export default {
  mounted: function() {
  },
  props: {
    articleData: new Object()
  },
  data: function() {
    return {
      d: this.articleData
    }
  },
  methods: {
    sync(e) {
      this.$emit('update', e.target.innerHTML)
      console.log(e.target.innerHTML)
      this.d.data.content = e.target.innerHTML
    }
  },
  watch: {
    articleData: function(data) {
      this.d = data;
    }
  },
}
</script>

<style lang="scss" scoped>
textarea {
  width: 80%;
  height: 200px;
}
</style>