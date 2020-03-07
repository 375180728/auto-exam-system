import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/Articles.vue'),
  },
  {
    path: '/articles/:id',
    component: () => import('../views/ArticleDetail.vue'),
  },
  {
    path: '/new',
    name: '/new',
    component: () => import('../views/New.vue'),
  },
  {
    path: '/new/:id',
    component: () => import('../views/New.vue'),
  },
  {
    path: '/tags',
    name: '/tags',
    component: () => import('../views/Tags.vue')
  },
  {
    path: '/tagadmin',
    name: '/tagadmin',
    component: () => import('../views/TagAdmin.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
