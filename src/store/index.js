import { createStore } from 'vuex'
import { apiCall } from './apiCall'

export default createStore({
  state: {
    list: ['Lion', 'Monkey']
  },
  getters: {
    getList: (state) => state.list
  },
  mutations: {
    SET_LIST(state, data) {
      state.list.push(data)
    }
  },
  actions: {
    addAnimal(context, animal) {
      context.commit('SET_LIST', animal)
    }
  },
  modules: {
    api: apiCall
  }
})
