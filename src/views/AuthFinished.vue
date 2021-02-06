<template>
  <div class="wrapper">
    <p>{{ token }}</p>
    <p>{{ email }}</p>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      'token': 'nothing',
      'email': 'nothing',
      'name': 'nothing',
    };
  },
  mounted() {
    this.token = this.$route.query.token;
    this.email = this.$route.query.email;
    this.name = this.$route.query.name;
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 100px;
}
</style>