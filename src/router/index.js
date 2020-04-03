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
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/Articles.vue'),
  },
  {
    path: '/teacher/course',
    name: 'teacherCourse',
    component: () => import('../views/teacher/TeacherCourse.vue'),
  },
  {
    path: '/teacher/studentList',
    name: 'studentList',
    component: () => import('../views/teacher/StudentList.vue'),
  },
  {
    path: '/teacher/courseAdmin',
    name: 'teacherCourseAdmin',
    component: () => import('../views/teacher/TeacherCourseAdmin.vue'),
  },
  {
    path: '/teacher/testPaper',
    name: 'testPaper',
    component: () => import('../views/teacher/TestPaper.vue'),
  },
  {
    path: '/teacher/testEditor',
    name: 'testEditor',
    component: () => import('../views/teacher/TestEditor.vue'),
  },
  {
    path: '/student/course',
    name: 'studentCourse',
    component: () => import('../views/student/StudentCourse.vue'),
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
