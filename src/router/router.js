import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"
import { getUserinfo } from "../api/user/user"
import { useAccount } from '../pinia/modules/useAccount'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})

router.beforeEach(async (to, from) => {
  const {path} = to
  const { setUserInfo } = useAccount()
  const { userInfo } = storeToRefs(useAccount())
  // 如果是跳转以‘/admin’开头的路由，如果pinia中没有用户信息，就去请求。
  // 防止刷新后pinia数据丢失
  if(path.includes("/admin")) {
    if(userInfo.value) return
    const { code, data } = await getUserinfo()
    if (code == 200) {
      setUserInfo(data)
    }
  }
  return true
})

export default router;