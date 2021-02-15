<template>
  <div class="imageSelectorContainer">
    <div class="uploadArea">
      <button>アップロード</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.imageSelectorContainer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 20%;
  border: solid 1px rgba(0,0,0,.2);
  border-right: none;
  background-color:rgb(240, 240, 240);
  z-index: 200;
  padding: 5px;
  > .uploadArea {
    width:80%;
    height:100px;
    margin: 10px auto;
    border: solid 1px rgba(0,0,0,.2);
    background-color: white;
    > button {
      border: 0;
      background-color: transparent;
      width: 100%;
      height: 100%;
      color: gray;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>