import Login from "~/views/login.vue";
import Admin from "~/views/admin.vue";
// 首页
import Home from '../components/admin/home/home.vue'
// 系统管理
import System from '../components/admin/system/system.vue'
import User from '../components/admin/system/user.vue'
import Role from "../components/admin/system/role.vue"
import Menu from "../components/admin/system/menu.vue"

export default [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "home",
        name: "home",
        component: Home
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
        redirect: '/admin/home'
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]