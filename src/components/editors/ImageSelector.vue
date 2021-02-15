<template>
  <div class="imageSelectorContainer">
    <div class="uploadArea">
      <button @click="emitClick">アップロード</button>
      <input type="file" @change="upload" name="image" ref="imageForm"  accept="image/*" >
    </div>
    <div class="imageListArea">
      <div class="image" v-for="(image, idx) in imageList" :key="'image'+idx">
        <img :src="image.read_path">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetchImageList()
  },
  data() {
    return {
      imageList: []
    }
  },
  methods: {
    async fetchImageList() {
      const url = "fetch-image-list"
      const params = new URLSearchParams()
      params.append('token', this.$store.token)
      await this.$axios.post(url, params).then(res => {
        this.syncImageList(res.data)
      }).catch(e => {
        console.log(e)
      })
    },
    syncImageList(imageList) {
      this.imageList = imageList
    },
    async upload(e) {
      const file = e.target.files[0]
      const url = "upload-image"
      const params = new FormData() //URLSearchParamsではうまくいかない
      params.append('image', file)
      params.append('token', this.$store.token)
      await this.$axios.post(url, params).then(res => {
        if(res.data === "over") {
          alert("画像の登録数の上限を超えています。")
        } else if(res.data === "fail") {
          alert('この画像はアップロードできません。')
        } else {
          this.syncImageList(res.data)
        }
      }).catch(e => {
        console.log(e)
        alert('この画像はアップロードできません。')
      })
    },
    emitClick() {
      this.$refs.imageForm.click()
    }
  }
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
  > .imageListArea {
    width: 100%;
    > .image {
      width: 100%;
      > img {
        width: 100%;
      }
    }
  }
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
      &:hover {
        background-color: rgba(0,0,0,.2);
      }
    }
    > input {
      display: none;
    }
  }
}
</style>