<template>
  <div class="container">
    <div v-for="obj in d" :key="obj.order">
      <div v-html="data2html(obj)"></div>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      d: this.articleData
    };
  },
  props: {
    articleData: {} //なぜObjectなのか...Arrayだと思うのだが...
  },
  watch: {
    articleData: function(data) {
      this.d = data;
    }
  },
  methods: {
    data2html: function(obj) {
      if(obj.type === 'heading') {
        if(obj.option === 'normal') {
          return '<h1>' + obj.data.content + '</h1>'
        }
      }
    }
  }
}
</script>

<style>

</style>