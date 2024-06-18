import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/LoginIndex.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/MainPage.vue'),
    children:[
      {
        path: 'content',
        name: 'content',
        component: () => import('@/views/PageIndex.vue'),
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/menu/Menu_main.vue'),
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/department/Department.vue'),
      },
      {
        path: 'department_add',
        name: 'department_add',
        component: () => import('@/views/department/Department_add.vue'),
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role/Role_main.vue'),
      },
      {
        path: 'role_add',
        name: 'role_add',
        component: () => import('@/views/role/Role_add.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/account/Account.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
