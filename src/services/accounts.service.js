import axios from "axios";

const api = process.env.REACT_APP_API + "accounts/";

export const accountsService = {
    register(model) {
        return axios.post(api + "register", model);
    },
    login(model) {
        return axios.post(api + "login", model);
    },
    logout() {
        //return axios.post(api + "logout", { refreshToken: "" });
    }
}