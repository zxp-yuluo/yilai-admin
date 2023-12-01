import Login from '../views/login/login.vue'

import Home from '../views/home/index.vue'
// 首页
import Index from '../components/home/main/index/index.vue'
// 系统管理
import System from '../components/home/main/system/system.vue'
import User from '../components/home/main/system/user.vue'
import Role from "../components/home/main/system/role.vue"
import Menu from "../components/home/main/system/menu.vue"
// 商品管理
import Product from '../components/home/main/product/product.vue'

export default [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "index",
        name: "index",
        component: Index
      },
      {
        path: "system",
        name: "system",
        component: System,
        meta: {
          title: '系统管理',
        },
        icon: 'Location',
        children: [
          {
            path: "user",
            name: "user",
            component: User,
            meta: {
              title: '用户管理',
            }

          },
          {
            path: "role",
            name: "role",
            component: Role,
            meta: {
              title: '角色管理',
            }
          },
          {
            path: "menu",
            name: "menu",
            component: Menu,
            meta: {
              title: '菜单管理',
            }
          }
        ]
      },
      {
        path: '',
        redirect: '/home/index'
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]