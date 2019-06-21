import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserService from '@/services/user.service'

Vue.use(Router)

const checkNotLoggedIn = (to, from, next) => {
  const isUserLoggedIn = router.app.$session.get('token')

  if (isUserLoggedIn) {
    next('/')
  } else {
    next()
  }
}

const checkProfileExists = async (to, from, next) => {
  const { status } = await UserService.get(to.params.username)
  if (status === 200) {
    next()
  } else {
    next('/')
  }
}

const router = new Router({
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
      beforeEnter: checkProfileExists,
      component: () => import(/* webpackChunkName: 'profile' */ './views/Profile.vue')
    },
    {
      path: '/register',
      name: 'register',
      props: { panel: 'register' },
      beforeEnter: checkNotLoggedIn,
      component: () => import(/* webpackChunkName: 'register' */ './views/Auth.vue')
    },
    {
      path: '/login',
      name: 'login',
      props: { panel: 'login' },
      beforeEnter: checkNotLoggedIn,
      component: () => import(/* webpackChunkName: 'login' */ './views/Auth.vue')
    }
  ]
})

export default router
