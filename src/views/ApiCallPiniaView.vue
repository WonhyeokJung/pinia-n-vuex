<template>
<div>
  <h2>API 호출과 Pinia</h2>
  <p>비동기 처리(async/await 등)이 필수이며, Composition API 형태로 구현하면 Reactivity(반응성) 정상적으로 작동하지 않는 경우가 있어 <br /> 되도록이면 Pinia를 Options API 형태로 구현한다.</p>
  <p>페이지 * 장수 &lt;= 993</p>
  <div>
    <label for="page">
      원하는 페이지 입력 :
      <input v-model="page" class="page" type="text" placeholder="숫자 입력">
    </label>
    <label for="limit">
      원하는 장수 입력 :
      <input v-model="limit" class="limit" type="text" placeholder="숫자 입력">
    </label>
  </div>
  <button @click="fetchImages(page, limit)" @keypress.enter="fetchImages(page, limit)">실행</button>
  <hr />
  <div>getters 이용한 이미지 가져오기</div>
  <div v-if="getImages" class="image-container">
    <div v-for="(image, i) in getImages" :key="i">
      <img :src="image.download_url" alt="IMAGE">
    </div>
  </div>
  <hr />
  <div>State를 통한 이미지 가져오기</div>
  <div v-if="images" class="image-container">
    <div v-for="(image, i) in getImages" :key="i">
      <img :src="image.download_url" alt="IMAGE">
    </div>
  </div>
</div>
</template>
<script>
import { ref } from 'vue-demi';
// import axios from 'axios';
import { useApiCallStore } from '@/stores/pinia'
import { storeToRefs } from 'pinia';
export default {
  name: 'ApiCallPiniaView',
  components: {},
  setup() {
    const page = ref(null);
    const limit = ref(null);
    const apiCallStore = useApiCallStore();
    const { images, getImages } = storeToRefs(apiCallStore);
    async function fetchImages(page, limit) {
      if (page === null || limit === null) {
        return alert('페이지 수와 이미지 수를 입력해주세요.');
      }
      await apiCallStore.fetchImages(page, limit)
    }
    return {
      page,
      limit,
      images,
      getImages,
      fetchImages,
      init: fetchImages(273, 1)
    }
  },
}
</script>
<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}
img {
  width: 400px;
  height: 300px;
  margin: 10px;
}
</style>
