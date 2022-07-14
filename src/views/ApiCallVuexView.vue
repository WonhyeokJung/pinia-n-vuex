<template>
<div>
  <h2>Vuex를 이용한 API 호출 후 데이터 출력하기</h2>
  <div>
    <p>이미지 새로 가져오기</p>
    <p>페이지 * 장수 &lt;= 993</p>
    <label for="page">
      페이지 번호 :
      <input v-model="page" type="text" placeholder="페이지 번호 입력">
    </label>
    <label for="limit">
      이미지 수 :
      <input v-model="limit" type="text" placeholder="이미지 수 입력">
    </label>
    <button @click="fetchImages(page, limit)" @keypress.enter="fetchImages(page, limit)">실행</button>
  </div>
  <div class="container">
    <h4>state 직접 출력하기</h4>
    <div v-if="store.state.api.images && store.state.api.images.length > 0" class="img-container">
      <div v-for="(image, i) in store.state.api.images" :key="i">
        <img :src="image.download_url" alt="IMG">
      </div>
    </div>
  </div>
  <div class="container">
    <h4>getters 이용한 computed 출력</h4>
    <div v-if="images && images.length > 0" class="img-container">
      <div v-for="(image, i) in images" :key="i">
        <img :src="image.download_url" alt="IMG">
      </div>
    </div>
  </div>
  {{ store }}
</div>
</template>
<script>
import { computed, ref } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  name: 'ApiCallVuexView',
  components: {},
  directives: {},
  provide() {
    return {
    }
  },
  inject() {
    return {
    }
  },
  props: {},
  setup() {
    const store = useStore();
    const page = ref(null);
    const limit = ref(null);
    // const images = computed(() => store.getters['api/getImages']);
    function fetchImages(page, limit) {
      return store.dispatch('api/fetchImages', { page: page, limit: limit });
    }
    return {
      store,
      page,
      limit,
      images: computed(() => store.getters['api/getImages']),
      fetchImages,
      init: store.dispatch('api/fetchImages', { page: 3, limit: 3 })
    }
  },
  data() {
    return {
      sampleData: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {}
}
</script>
<style scoped>
  .container {
    border: 3px solid #686868;
  }
  .img-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  img {
    width: 400px;
    height: 300px;
    margin: 10px;
  }
</style>
