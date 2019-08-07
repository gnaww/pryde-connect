import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const BASE_URL = "http://localhost:8000";
const API_BASE_URL = "/api/v1";

export default {
    async getLoggedInUser() {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };
        let user = await axios.get(`${BASE_URL}${API_BASE_URL}/user/`, config);
        return user.data;
    },
    async getUserByID(id) {
        let user = await axios.get(`${BASE_URL}${API_BASE_URL}/user/${id}/`);
        console.log(user.data);
        return user.data;
    },
    async getUsers() {
        let users = await axios.get(`${BASE_URL}${API_BASE_URL}/users/`);
        console.log(users.data);
        return users.data;
    },
    async register(data) {
        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/rest-auth/registration/`, data);
        return response;
    },
    async updateUser(data) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.put(`${BASE_URL}${API_BASE_URL}/user/update/`, data, config);
        return response.status === 200;
    },
    async deleteUser(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.delete(`${BASE_URL}${API_BASE_URL}/user/${id}/delete/`, config);
        localStorage.removeItem("pryde_key");
        return response.status === 204;
    },
    async login(data) {
        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/rest-auth/login/`, data);
        return response;
    },
    logout() {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        localStorage.removeItem("pryde_key");
        axios.post(`${BASE_URL}${API_BASE_URL}/rest-auth/logout/`, config)
            .then(response => {
                if (response.status === 200) {
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

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/project/create/`, data, config);
        return response.data;
    },
    async updateProject(id, data) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.put(`${BASE_URL}${API_BASE_URL}/project/${id}/update/`, data, config);
        return response.status === 200;
    },
    async deleteProject(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.delete(`${BASE_URL}${API_BASE_URL}/project/${id}/delete/`, config);
        return response.status === 204;
    },
    async search(queryObject) {
        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/filter/`, queryObject);
        return response.data;
    },
    async getProjectPermissions(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.get(`${BASE_URL}${API_BASE_URL}/project/${id}/permissions/`, config);
        return response.data;
    },
    async toggleProjectVisibility(id) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.put(`${BASE_URL}${API_BASE_URL}/project/${id}/togglevisibility/`, null, config);
        return response.data;
    },
    async getProjectCollaborators(id) {
        let response = await axios.get(`${BASE_URL}${API_BASE_URL}/project/${id}/collaborators/`)
        return response.data;
    },
    async addCollaborator(id, data) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.post(`${BASE_URL}${API_BASE_URL}/project/${id}/collaborator/add/`, data, config);
        return response.status === 201;
    },
    async updateCollaborator(id, data) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.put(`${BASE_URL}${API_BASE_URL}/project/${id}/collaborator/update/`, data, config);
        return response.status === 200;
    },
    async deleteCollaborator(id, data) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            },
            data: data
        };
        let response = await axios.delete(`${BASE_URL}${API_BASE_URL}/project/${id}/collaborator/delete/`, config);
        return response.status === 204;
    },
    async collaboratorSearch(query) {
        const USER_KEY = localStorage.getItem("pryde_key");

        const config = {
            headers: {
                Authorization: `Token ${USER_KEY}`
            }
        };

        let response = await axios.get(`${BASE_URL}${API_BASE_URL}/collaboratorsearch/?q=${query}`, config);
        return response.data;
    }
}
