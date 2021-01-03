import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _915700be = () => interopDefault(import('../pages/calender/index.vue' /* webpackChunkName: "pages/calender/index" */))
const _6e0e8b00 = () => interopDefault(import('../pages/dsgvo/index.vue' /* webpackChunkName: "pages/dsgvo/index" */))
const _40185d40 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _910709f4 = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _8756770a = () => interopDefault(import('../pages/information/index.vue' /* webpackChunkName: "pages/information/index" */))
const _4262497a = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _c08c6e6a = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _76c6a0b0 = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _68238207 = () => interopDefault(import('../pages/images/_id.vue' /* webpackChunkName: "pages/images/_id" */))
const _99ef3b3c = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _57acfc1a = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _2baf80c4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _915700be,
    name: "calender"
  }, {
    path: "/dsgvo",
    component: _6e0e8b00,
    name: "dsgvo"
  }, {
    path: "/events",
    component: _40185d40,
    name: "events"
  }, {
    path: "/impressum",
    component: _910709f4,
    name: "impressum"
  }, {
    path: "/information",
    component: _8756770a,
    name: "information"
  }, {
    path: "/news",
    component: _4262497a,
    name: "news"
  }, {
    path: "/products",
    component: _c08c6e6a,
    name: "products"
  }, {
    path: "/events/:id",
    component: _76c6a0b0,
    name: "events-id"
  }, {
    path: "/images/:id?",
    component: _68238207,
    name: "images-id"
  }, {
    path: "/news/:id",
    component: _99ef3b3c,
    name: "news-id"
  }, {
    path: "/products/:id",
    component: _57acfc1a,
    name: "products-id"
  }, {
    path: "/",
    component: _2baf80c4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
