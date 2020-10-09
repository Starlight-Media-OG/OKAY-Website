import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3a33a6e1 = () => interopDefault(import('../pages/calender/index.vue' /* webpackChunkName: "pages/calender/index" */))
const _367cdb40 = () => interopDefault(import('../pages/dsgvo/index.vue' /* webpackChunkName: "pages/dsgvo/index" */))
const _f9cf5700 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _defb8874 = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _6aed553b = () => interopDefault(import('../pages/information/index.vue' /* webpackChunkName: "pages/information/index" */))
const _777710ba = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _2298f00b = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _0c9d1230 = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _c58f6d72 = () => interopDefault(import('../pages/images/_id.vue' /* webpackChunkName: "pages/images/_id" */))
const _0db40cbc = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _17297933 = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _5283f05e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3a33a6e1,
    name: "calender"
  }, {
    path: "/dsgvo",
    component: _367cdb40,
    name: "dsgvo"
  }, {
    path: "/events",
    component: _f9cf5700,
    name: "events"
  }, {
    path: "/impressum",
    component: _defb8874,
    name: "impressum"
  }, {
    path: "/information",
    component: _6aed553b,
    name: "information"
  }, {
    path: "/news",
    component: _777710ba,
    name: "news"
  }, {
    path: "/products",
    component: _2298f00b,
    name: "products"
  }, {
    path: "/events/:id",
    component: _0c9d1230,
    name: "events-id"
  }, {
    path: "/images/:id?",
    component: _c58f6d72,
    name: "images-id"
  }, {
    path: "/news/:id",
    component: _0db40cbc,
    name: "news-id"
  }, {
    path: "/products/:id",
    component: _17297933,
    name: "products-id"
  }, {
    path: "/",
    component: _5283f05e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
