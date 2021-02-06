import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router