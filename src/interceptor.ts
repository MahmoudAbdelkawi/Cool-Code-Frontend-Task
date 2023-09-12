import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/v1";

axios.interceptors.request.use(
    (config) => {

        const token = window.localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);