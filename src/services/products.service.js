import axios from "axios";

const api = process.env.REACT_APP_API + "products/";

export const productsService = {
    getAll() {
        return axios.get(api + "all");
    },

    get(id) {
        return axios.get(api + id);
    },

    create(model) {
        const data = new FormData();

        for (const prop in model) {
            data.append(prop, model[prop]);
        }

        return axios.post(api, data);
    },

    edit(model) {
        return axios.put(api, model);
    },

    delete(id) {
        return axios.delete(api + id);
    },
    // TODO: implement
    getCategories() { }
}