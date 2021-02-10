<template>
  <div class="container">
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
    };
  },
  watch: {
    articleData: function(data) {
      this.d = data;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>