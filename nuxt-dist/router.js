import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ff1a176 = () => interopDefault(import('../pages/calender/index.vue' /* webpackChunkName: "pages/calender/index" */))
const _112c1e6a = () => interopDefault(import('../pages/dsgvo/index.vue' /* webpackChunkName: "pages/dsgvo/index" */))
const _40641f56 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _428393d1 = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _bc0e52f4 = () => interopDefault(import('../pages/information/index.vue' /* webpackChunkName: "pages/information/index" */))
const _2b1b9dcf = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _2856eaa0 = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _a553f806 = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _50dcd65c = () => interopDefault(import('../pages/images/_id.vue' /* webpackChunkName: "pages/images/_id" */))
const _3944c7f7 = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _73df1508 = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _8bb26bae = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3ff1a176,
    name: "calender"
  }, {
    path: "/dsgvo",
    component: _112c1e6a,
    name: "dsgvo"
  }, {
    path: "/events",
    component: _40641f56,
    name: "events"
  }, {
    path: "/impressum",
    component: _428393d1,
    name: "impressum"
  }, {
    path: "/information",
    component: _bc0e52f4,
    name: "information"
  }, {
    path: "/news",
    component: _2b1b9dcf,
    name: "news"
  }, {
    path: "/products",
    component: _2856eaa0,
    name: "products"
  }, {
    path: "/events/:id",
    component: _a553f806,
    name: "events-id"
  }, {
    path: "/images/:id?",
    component: _50dcd65c,
    name: "images-id"
  }, {
    path: "/news/:id",
    component: _3944c7f7,
    name: "news-id"
  }, {
    path: "/products/:id",
    component: _73df1508,
    name: "products-id"
  }, {
    path: "/",
    component: _8bb26bae,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
