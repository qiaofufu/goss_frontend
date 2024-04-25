import {APIInstance} from "@/api/api.js";
import {GetCookie} from "@/utils/cookie.js";

export class UserAPI {
    Login(username, password) {
        APIInstance.post('/login', {
            username: username,
            password: password
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    GetUserInfo() {
    }
}