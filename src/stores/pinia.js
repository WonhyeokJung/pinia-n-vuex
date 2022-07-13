import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

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
