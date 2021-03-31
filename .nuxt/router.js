import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5f811abb = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _2cd39827 = () => interopDefault(import('../pages/NotFound.vue' /* webpackChunkName: "pages/NotFound" */))
const _5390205a = () => interopDefault(import('../pages/relationship/index.vue' /* webpackChunkName: "pages/relationship/index" */))
const _e470d4a6 = () => interopDefault(import('../pages/test/index.vue' /* webpackChunkName: "pages/test/index" */))
const _2636b7d8 = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _514459ea = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/contact",
    component: _5f811abb,
    name: "contact"
  }, {
    path: "/NotFound",
    component: _2cd39827,
    name: "NotFound"
  }, {
    path: "/relationship",
    component: _5390205a,
    name: "relationship"
  }, {
    path: "/test",
    component: _e470d4a6,
    name: "test"
  }, {
    path: "/detail/:id?",
    component: _2636b7d8,
    name: "detail-id"
  }, {
    path: "/",
    component: _514459ea,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
