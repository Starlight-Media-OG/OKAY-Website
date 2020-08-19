import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _113bb0e9 = () => interopDefault(import('..\\pages\\calender\\index.vue' /* webpackChunkName: "pages/calender/index" */))
const _44ef346a = () => interopDefault(import('..\\pages\\events\\index.vue' /* webpackChunkName: "pages/events/index" */))
const _7968ccb0 = () => interopDefault(import('..\\pages\\news\\index.vue' /* webpackChunkName: "pages/news/index" */))
const _357f8cff = () => interopDefault(import('..\\pages\\products\\index.vue' /* webpackChunkName: "pages/products/index" */))
const _74b34952 = () => interopDefault(import('..\\pages\\events\\_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _693ac327 = () => interopDefault(import('..\\pages\\products\\_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _0733f3a3 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/calender",
    component: _113bb0e9,
    name: "calender"
  }, {
    path: "/events",
    component: _44ef346a,
    name: "events"
  }, {
    path: "/news",
    component: _7968ccb0,
    name: "news"
  }, {
    path: "/products",
    component: _357f8cff,
    name: "products"
  }, {
    path: "/events/:id",
    component: _74b34952,
    name: "events-id"
  }, {
    path: "/products/:id",
    component: _693ac327,
    name: "products-id"
  }, {
    path: "/",
    component: _0733f3a3,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
