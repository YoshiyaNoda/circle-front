<template>
  <div class="website-wrapper">
    <div id="html" v-html="rawHTML"></div>
    <p></p>
  </div>
</template>

<script>
export default {
  // ちゃんとサニタイズ処理をかく
  data() {
    return {
      rawHTML: ''
    }
  },
  mounted() {
    this.fetchRawHTML()
  },
  methods: {
    takeURL() {
      const url = this.$route.path
      const paths = url.split('/')
      if(paths[3]) {
        // website/アカウント名/記事url
        return paths
      }
      return []
    },
    async fetchRawHTML() {
      const paths = this.takeURL()
      if(paths[3]) {
        const url = "fetch-raw-HTML"
        const params = new URLSearchParams()
        params.append('userId', Number(paths[2]))
        params.append('articleURL', paths[3])
        await this.$axios.post(url, params).then(res => {
          if(res.data) {
            this.rawHTML = res.data
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.website-wrapper {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 30px;
}
</style>