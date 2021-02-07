<template>
  <div class="container">
    <p>{{msg}}</p>
    <button @click="testReq">click me to test req</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      'msg': 'Hello Test'
    };
  },
  methods: {
    testReq() {
      const provider = 'google';
      const url = this.$API_URL + "/fetch/" + provider + "/oauth-target-url-test";
      this.$axios.get(url).then(res => {
        this.msg = res.data;
        window.location.href = res.data;
      }).catch(e => {
        console.log(e);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: white;
  width: 100%;
}
</style>