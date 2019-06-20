import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users/:username',
      name: 'profile',
      props: true,
      component: () => import(/* webpackChunkName: 'profile' */ './views/Profile.vue')
    },
    {
      path: '/register',
      name: 'register',
      props: { panel: 'register' },
      component: () => import(/* webpackChunkName: 'register' */ './views/Auth.vue')
    },
    {
      path: '/login',
      name: 'login',
      props: { panel: 'login' },
      component: () => import(/* webpackChunkName: 'login' */ './views/Auth.vue')
    }
  ]
})
