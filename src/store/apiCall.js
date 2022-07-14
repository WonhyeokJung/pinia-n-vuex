import { $_getImages } from '@/api/get'
export const apiCall = {
  namespaced: true,
  state: {
    images: []
  },
  getters: {
    getImages: (state) => state.images
  },
  mutations: {
    SET_IMAGES(state, data) {
      state.images = data;
    }
  },
  actions: {
    async fetchImages(context, { page, limit }) {
      const { data } = await $_getImages(page, limit);
      context.commit('SET_IMAGES', data.value)
    }
  }
}
