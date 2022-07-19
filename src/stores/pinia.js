import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { $_getImages } from '@/api/get'

export const useOptionsStore = defineStore('options', {
  // 직접 가져올 때 쓰거나, 혹은 사용을 지양한다.
  state: () => ({
    list: ['Monkey', 'Lion', 'Tiger', 'Rabbit']
  }),
  // 보통 state에 추가 작업을 할 때 사용.
  getters: {
    getList: (state) => state.list
  }
})

export const useCompositionStore = defineStore('composition', () => {
  const foodList = ref(['Hamburger', 'Ramyeon'])
  const getFoodList = computed((state, getters, rootState, rootGetters) => foodList.value)
  return {
    foodList,
    getFoodList
  }
})

// Compoistion API 방식
export const useApiCallStore = defineStore('apicall', () => {
  const images = ref([]);
  const getImages = computed(() => images.value);
  async function fetchImages(page, limit) {
    const { data } = await $_getImages(page, limit);
    images.value = data.value
  }
  return {
    images,
    getImages,
    fetchImages
  }
})

// Options API 방식
// export const useApiCallStore = defineStore('apicall', {
//   state: () => ({
//     images: []
//   }),
//   getters: {
//     getImages: (state) => state.images
//   },
//   // mutation과 합쳐졌다.
//   actions: {
//     async fetchImages(page, limit) {
//       const { data } = await $_getImages(page, limit);
//       this.images = data.value
//       console.log('Options API Function Call Done!')
//     }
//   }
// })
