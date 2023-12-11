import { defineStore } from 'pinia'
import { ref } from "vue"

export const useAccount = defineStore('account', () => {

  const userInfo = ref(null)

  function setUserInfo(u) {
    userInfo.value = u
  }
  return {
    userInfo,
    setUserInfo
  }
})
