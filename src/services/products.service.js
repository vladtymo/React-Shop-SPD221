import axios from "axios";

const api = process.env.REACT_APP_API + "products/";

export const productsService = {
    getAll() {
        return axios.get(api + "all");
    },

    get(id) {

    },

    create(model) {

    },

    delete(id) {
        return axios.delete(api + id);
    }
}