import {Login} from "@/api/user.js";
import {ref} from "vue";
import {defineStore} from "pinia";
import {SetCookie} from "@/utils/cookie.js";

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const login = (param) => {
        Login(param).then((res) => {
            token.value = res.token
            SetCookie("websession", res.token)
        }).catch((e) => {
            console.log(e)
        })
        return true
    }
    return {token, login}
})