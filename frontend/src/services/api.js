import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const BASE_URL = "http://localhost:8000";
const API_BASE_URL = "/api/v1";

export default {
    async getLoggedInUser() {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };
        let user = await axios.get(`${BASE_URL}${API_BASE_URL}/user/`, config);
        return user.data;
    },
    async getUserByID(id) {
        let user = await axios.get(`${BASE_URL}${API_BASE_URL}/user/${id}/`);
        return user.data;
    },
    async getUsers() {
        let users = await axios.get(`${BASE_URL}${API_BASE_URL}/users/`)
        return users.data;
    },
    async register(data) {
        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/rest-auth/registration/`, data);
        return response;
    },
    async updateUser(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.put(`${BASE_URL}${API_BASE_URL}/user/${id}/update/`, config);
        return response.status === 200;
    },
    async deleteUser(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.delete(`${BASE_URL}${API_BASE_URL}/user/${id}/delete/`, config);
        return response.status === 204;
    },
    async login(data) {
        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/rest-auth/login/`, data);
        return response;
    },
    logout() {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        axios.post(`${BASE_URL}${API_BASE_URL}/rest-auth/logout/`, config)
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem("pryde_key");
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    async getProjects() {
        let projects = await axios.get(`${BASE_URL}${API_BASE_URL}/projects/`);
        return projects.data;
    },
    async getProjectByID(id) {
        let project = await axios.get(`${BASE_URL}${API_BASE_URL}/project/${id}/`);
        return project.data;
    },
    async createProject(data) {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/project/create/`, data, config);
        return response.status === 200;
    },
    async updateProject(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.put(`${BASE_URL}${API_BASE_URL}/project/${id}/update/`, config);
        return response.status === 200;
    },
    async deleteProject(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        let config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.delete(`${BASE_URL}${API_BASE_URL}/project/${id}/delete/`, config);
        return response.status === 204;
    }
}
