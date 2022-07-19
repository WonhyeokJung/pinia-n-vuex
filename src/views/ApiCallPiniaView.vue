<template>
<div>
  <h2>API 호출과 Pinia</h2>
  <p>비동기 처리(async/await 등)이 필수이며, Composition API로 작성하는 경우 비동기 처리를 하지 않으면 Data가 null로 들어온다.(actions에서 state에 데이터를 넣기 전에 불러옴.)</p>
  <p>가장 주의할 점은 actions는 storeToRefs로 불러오지 않고, storeName.actionsName 혹은 const { actionsName } = storeName으로 불러오는 것이다.</p>
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
      <img :src="image.download_url" alt="IMAGE" @load="loaded">
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
import { ref, computed } from 'vue-demi';
// import axios from 'axios';
import { useApiCallStore } from '@/stores/pinia'
import { storeToRefs } from 'pinia';
export default {
  name: 'ApiCallPiniaView',
  components: {},
  setup() {
    function loaded() {
      console.log('@load loaded')
    }
    const page = ref(null);
    const limit = ref(null);
    const apiCallStore = useApiCallStore();
    // 반응성 유지
    const { images } = storeToRefs(apiCallStore);
    // actions는 storeToRefs 사용해서 불러오면 함수 인식이 불가능하므로, 따로 부른다.
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
      // 이렇게 해도 유지된다.
      getImages: computed(() => apiCallStore.getImages),
      fetchImages,
      init: fetchImages(273, 1),
      loaded
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
