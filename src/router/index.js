import { createRouter, createWebHistory } from 'vue-router'
import PiniaView from '../views/PiniaView.vue'
import ApiCallPiniaView from '@/views/ApiCallPiniaView'
import vuex from '@/router/vuex'

const routes = [
  ...vuex,
  {
    path: '/pinia',
    name: 'pinia',
    component: PiniaView
  },
  {
    path: '/vuex',
    name: 'vuex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/VuexView.vue')
  },
  {
    path: '/pinia/api',
    name: 'apicallpinia',
    component: ApiCallPiniaView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
