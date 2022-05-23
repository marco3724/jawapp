import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import FavouritesView from '../views/FavouritesView.vue'
import LoginFormView from '../views/LoginFormView.vue'
import MapView from '../views/MapView.vue'
import RegistrationFormView from '../views/RegistrationFormView.vue'
import ReviewView from '../views/ReviewView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationFormView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginFormView
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewView
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: FavouritesView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
