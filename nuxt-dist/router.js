import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a1c5a470 = () => interopDefault(import('../pages/calender/index.vue' /* webpackChunkName: "pages/calender/index" */))
const _044815b9 = () => interopDefault(import('../pages/dsgvo/index.vue' /* webpackChunkName: "pages/dsgvo/index" */))
const _6eb46927 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _8e6cdc82 = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _c291de18 = () => interopDefault(import('../pages/information/index.vue' /* webpackChunkName: "pages/information/index" */))
const _4c8e2321 = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _d0fb121c = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _626eed62 = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _724f5bae = () => interopDefault(import('../pages/images/_id.vue' /* webpackChunkName: "pages/images/_id" */))
const _21dc79c9 = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _02c58dda = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _1ebd5ef0 = () => interopDefault(import('../pages/projects/_id.vue' /* webpackChunkName: "pages/projects/_id" */))
const _0697d01d = () => interopDefault(import('../pages/unsubscribe/_mail.vue' /* webpackChunkName: "pages/unsubscribe/_mail" */))
const _83f28cd2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _a1c5a470,
    name: "calender"
  }, {
    path: "/dsgvo",
    component: _044815b9,
    name: "dsgvo"
  }, {
    path: "/events",
    component: _6eb46927,
    name: "events"
  }, {
    path: "/impressum",
    component: _8e6cdc82,
    name: "impressum"
  }, {
    path: "/information",
    component: _c291de18,
    name: "information"
  }, {
    path: "/news",
    component: _4c8e2321,
    name: "news"
  }, {
    path: "/products",
    component: _d0fb121c,
    name: "products"
  }, {
    path: "/events/:id",
    component: _626eed62,
    name: "events-id"
  }, {
    path: "/images/:id?",
    component: _724f5bae,
    name: "images-id"
  }, {
    path: "/news/:id",
    component: _21dc79c9,
    name: "news-id"
  }, {
    path: "/products/:id",
    component: _02c58dda,
    name: "products-id"
  }, {
    path: "/projects/:id?",
    component: _1ebd5ef0,
    name: "projects-id"
  }, {
    path: "/unsubscribe/:mail?",
    component: _0697d01d,
    name: "unsubscribe-mail"
  }, {
    path: "/",
    component: _83f28cd2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
