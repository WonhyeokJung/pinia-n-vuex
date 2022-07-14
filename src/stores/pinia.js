import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { $_getImages } from '@/api/get'

export const useOptionsStore = defineStore('options', {
  state: () => ({
    list: ['Monkey', 'Lion', 'Tiger', 'Rabbit']
  }),
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
// export const useApiCallStore = defineStore('apicall', () => {
//   const images = ref([]);
//   const getImages = computed(() => images.value);
//   async function fetchImages(page, limit) {
//     const { data } = await $_getImages(page, limit);
//     images.value = data.value
//   }
//   return {
//     images,
//     getImages,
//     fetchImages
//   }
// })

// Options API 방식
export const useApiCallStore = defineStore('apicall', {
  state: () => ({
    images: []
  }),
  getters: {
    getImages: (state) => state.images
  },
  actions: {
    async fetchImages(page, limit) {
      const { data } = await $_getImages(page, limit);
      this.images = data.value
      console.log('Options API Function Call Done!')
    }
  }
})
