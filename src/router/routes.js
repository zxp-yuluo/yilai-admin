import Test1 from '@/components/test1.vue'
import Test2 from '~/components/test2.vue'

export default [
  {
    path: "/test1",
    component: Test1
  },
  {
    path: "/test2",
    component: Test2
  },
  { path: '/', redirect: '/test1' }
]