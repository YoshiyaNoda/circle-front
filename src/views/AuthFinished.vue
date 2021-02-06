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
    this.setUserData();
    this.token = this.$store.token;
    this.email = this.$store.email;
    this.name = this.$store.name;
  },
  methods: {
    setUserData() {
      this.$store.token = this.$route.query.token;
      this.$store.email = this.$route.query.email;
      this.$store.name = this.$route.query.name;
    }
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