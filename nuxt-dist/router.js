import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _82a151be = () => interopDefault(import('../pages/calender/index.vue' /* webpackChunkName: "pages/calender/index" */))
const _3dd91300 = () => interopDefault(import('../pages/dsgvo/index.vue' /* webpackChunkName: "pages/dsgvo/index" */))
const _674314c0 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _c906d8f4 = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _be9e860a = () => interopDefault(import('../pages/information/index.vue' /* webpackChunkName: "pages/information/index" */))
const _08563e0c = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _b1d6bf6a = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _7e0f4728 = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _21961987 = () => interopDefault(import('../pages/images/_id.vue' /* webpackChunkName: "pages/images/_id" */))
const _a18a4c3c = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _09578d1a = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _4254f81e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _82a151be,
    name: "calender"
  }, {
    path: "/dsgvo",
    component: _3dd91300,
    name: "dsgvo"
  }, {
    path: "/events",
    component: _674314c0,
    name: "events"
  }, {
    path: "/impressum",
    component: _c906d8f4,
    name: "impressum"
  }, {
    path: "/information",
    component: _be9e860a,
    name: "information"
  }, {
    path: "/news",
    component: _08563e0c,
    name: "news"
  }, {
    path: "/products",
    component: _b1d6bf6a,
    name: "products"
  }, {
    path: "/events/:id",
    component: _7e0f4728,
    name: "events-id"
  }, {
    path: "/images/:id?",
    component: _21961987,
    name: "images-id"
  }, {
    path: "/news/:id",
    component: _a18a4c3c,
    name: "news-id"
  }, {
    path: "/products/:id",
    component: _09578d1a,
    name: "products-id"
  }, {
    path: "/",
    component: _4254f81e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
