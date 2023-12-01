import { defineStore } from 'pinia'
import { reactive } from "vue"

export const useAccount = defineStore('account', () => {
  let account = reactive({
    userInfo: null,
    token: ""
  })

  function clearUserInfo() {
    account.userInfo = null
  }
  function clearToken() {
    account.token = ""
  }
  function setUserInfo(userInfo) {
    account.userInfo = userInfo
  }
  function setToken(token) {
    account.token = token
  }
  return {
    account,
    clearUserInfo,
    setUserInfo,
    setToken,
    clearToken
  }
})