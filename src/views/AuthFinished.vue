<template>
  <div class="wrapper">
    <p>認証成功</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      'login': this.$store.login,
      'email': this.$store.email,
      'name': this.$store.name,
    };
  },
  mounted() {
    this.$store.appendObservable(this);
    this.$store.setUserData(this.$route.query);
    this.$router.push({ path: '/auth/select-articles' });
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 100px;
  min-height: 100vh;
}
</style>