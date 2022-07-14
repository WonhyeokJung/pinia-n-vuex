<template>
<div>
  <h2>Vuex를 이용한 실시간 데이터 업데이트 구현</h2>
  <div>State에서 직접 불러온 동물 리스트(비추천) : {{ store.state.list }}</div>
  <div>Getters 이용한 동물 리스트 : {{ list }}</div>
  <div>
    <h4>동물 추가하기</h4>
    <input v-model="animal" type="text" placeholder="동물명" @keypress.enter="addAnimal">
    <button @click="addAnimal">추가</button>
  </div>
</div>
</template>
<script>
import { computed, ref } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  name: 'VuexView',
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
    const list = computed(() => store.getters.getList);
    const animal = ref(null);
    function addAnimal() {
      store.dispatch('addAnimal', animal.value)
    };
    return {
      store,
      animal,
      list,
      addAnimal
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
