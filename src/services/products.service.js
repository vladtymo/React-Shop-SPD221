import axios from "axios";

const api = process.env.REACT_APP_API + "products/";

export const productsService = {
    getAll() {
        return axios.get(api + "all");
    },

    get(id) {

    },

    create(model) {
        const data = new FormData();

        for (const prop in model) {
            data.append(prop, model[prop]);
        }

        return axios.post(api, data);
    },

    delete(id) {
        return axios.delete(api + id);
    }
}