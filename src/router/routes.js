import Login from '../views/login/login.vue'
import Home from '../views/home/index.vue'

export default [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home
  },
  { path: '/', redirect: '/login' }
]