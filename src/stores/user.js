import {Login} from "@/api/user.js";
import {ref} from "vue";
import {defineStore} from "pinia";

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const login = (param) => {
    Login(param).then((res) => {
      console.log("login success")
      console.log(res.data)
        token.value = res.data.token
        return true
    })
  }
  return { token, login }
})