import Login from "~/views/login.vue";
import Admin from "~/views/admin.vue";
// 首页
import Home from '../components/admin/home/home.vue'
// 系统管理
import System from '../components/admin/system/system.vue'
import User from '../components/admin/system/user.vue'
import Role from "../components/admin/system/role.vue"
import Menu from "../components/admin/system/menu.vue"
// 商品管理
import Proudct from "../components/admin/product/product.vue"
import Category from "../components/admin/product/category.vue"
import Brand from "../components/admin/product/brand.vue"
import CategoryBrand from "../components/admin/product/categoryBrand.vue"
import ProductSpec from "../components/admin/product/productSpce.vue"
import ProductList from "../components/admin/product/productList.vue"

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
        path: "product",
        name: "product",
        component: Proudct,
        meta: {
          title: '商品管理',
        },
        children: [
          {
            path: "category",
            name: "category",
            component: Category,
            meta: {
              title: '分类管理',
            }
          },
          {
            path: "brand",
            name: "brand",
            component: Brand,
            meta: {
              title: '品牌管理',
            }
          },
          {
            path: "categoryBrand",
            name: "categoryBrand",
            component: CategoryBrand,
            meta: {
              title: '分类品牌',
            }
          },
          {
            path: "productSpec",
            name: "productSpec",
            component: ProductSpec,
            meta: {
              title: '商品规格',
            }
          },
          {
            path: "productList",
            name: "productList",
            component: ProductList,
            meta: {
              title: '商品列表',
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