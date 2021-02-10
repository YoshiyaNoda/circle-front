<template>
  <div class="container">
    <div v-html="data2html()"></div>
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
    data2html: function() {
      let html = ""
      const length = this.d.length
      for(let i = 0; i < length; i++) {
        const obj = this.d[i]
        if(obj.type === 'heading') {
          if(obj.option === 'normal') {
            html += '<h1>' + obj.data.content + '</h1>\n'
          }
        }
      }
      return html
    }
  }
}
</script>

<style>

</style>