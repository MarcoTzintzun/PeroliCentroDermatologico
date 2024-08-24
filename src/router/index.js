import Vue from 'vue'
import VueRouter from 'vue-router'

import { getCurrentUser } from '@/firebase/config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/basedatos',
    name: 'basedatos',
    alias: '/',
    component: () =>
      import(/* webpackChunkName: "basedatos" */ '../views/BaseDatos.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ordenes',
    name: 'orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orden',
    name: 'order',
    component: () => import(/* webpackChunkName: "orden" */ '../views/Order.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orden/:id',
    name: 'edit-order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: () => import(/* webpackChunkName: "notas" */ '../views/Notas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nota',
    name: 'nota',
    component: () => import(/* webpackChunkName: "nota" */ '../views/Nota.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nota/:id',
    name: 'edit-nota',
    component: () => import(/* webpackChunkName: "nota" */ '../views/Nota.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = await getCurrentUser()

  if (requiresAuth && !currentUser) {
    next({ name: 'login' })
  } else if (to.name === 'login' && currentUser) {
    next({ name: 'basedatos' })
  } else {
    next()
  }
})

export default router
