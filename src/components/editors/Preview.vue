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
    articleData: new Object()
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
        else if(obj.type === 'paragraph') {
          if(obj.option === 'normal') {
            html += '<p>' + obj.data.content + '</p>\n'
          }
        }
      }
      return html
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>