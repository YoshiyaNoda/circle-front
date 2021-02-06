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
      'token': this.$store.token,
      'email': this.$store.email,
      'name': this.$store.name,
    };
  },
  mounted() {
    this.$store.appendObservable(this);
    this.$store.setUserData(this.$route.query);
  },
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