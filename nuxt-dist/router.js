import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d4e0a5a = () => interopDefault(import('../pages/calender/index.vue' /* webpackChunkName: "pages/calender/index" */))
const _7705fcf2 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _57382dac = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _5c837806 = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _4d1ad84c = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _0b1721a5 = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _01fd042c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _2d4e0a5a,
    name: "calender"
  }, {
    path: "/events",
    component: _7705fcf2,
    name: "events"
  }, {
    path: "/news",
    component: _57382dac,
    name: "news"
  }, {
    path: "/products",
    component: _5c837806,
    name: "products"
  }, {
    path: "/events/:id",
    component: _4d1ad84c,
    name: "events-id"
  }, {
    path: "/products/:id",
    component: _0b1721a5,
    name: "products-id"
  }, {
    path: "/",
    component: _01fd042c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
