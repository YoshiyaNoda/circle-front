<template>
  <div class="container">
    <!-- これを変更すると親が持つデータも変更される -->
    <!-- <p>order: {{d.order}}</p> -->
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
  // watch: {
  //   articleData: function(articleData) {
  //     // もし変更があったらdを更新(いるか??)
  //     this.d = articleData;
  //   }
  // }
}
</script>

<style lang="scss" scoped>

</style>