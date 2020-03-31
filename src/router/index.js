import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '@aws-amplify/auth'
const awsExports = require('@/aws-exports').default
Auth.configure(awsExports)
const MAX_RETRY = 10

function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

async function checkAuthWithRetry (counter = 0) {
  if (counter < MAX_RETRY) {
    // NOP
    try {
      await Auth.currentAuthenticatedUser({ bypassCache: true })
      return true
    } catch (err) {
      await sleep(200)
      return checkAuthWithRetry(counter + 1)
    }
  }
  return false
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'About',
    meta: {
      noAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async function (to, from, next) {
  if (to.matched.some(record => {
    const meta = record.meta
    return meta && meta.noAuth
  })) return next()

  if (to.path === '/callback') {
    const checkResult = await checkAuthWithRetry()
    if (checkResult) return next({ path: '/' })
    else return next({ path: '/login' })
  }

  // 認証チェック
  try {
    await Auth.currentSession()
    return next()
  } catch (err) {
    return next({ path: '/login' })
  }
})

export default router
