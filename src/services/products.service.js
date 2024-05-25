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
        const data = new FormData();

        for (const prop in model) {
            if (model[prop] == null) continue;

            data.append(prop, model[prop]);
        }

        return axios.put(api, data); // model in Form Content
    },

    delete(id) {
        return axios.delete(api + id);
    },
    // TODO: implement
    getCategories() { }
}