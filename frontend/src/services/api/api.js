import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const BASE_URL = "http://localhost:8000";
const USER_KEY = localStorage.getItem("pryde_key");

export default {
    async getUser() {
        let user = await axios.get(BASE_URL + '/api/v1/user');
        return user.data;
    },
    async register(data) {
        let response = await axios.post(BASE_URL + '/api/v1/rest-auth/registration/', data);
        return response;
    },
    async login(data) {
        let response = await axios.post(BASE_URL + '/api/v1/rest-auth/login/', {
            email: data.email,
            password: data.password
        });
        return response;
    },
    logout() {
        let config = {
            headers: {
                Authorization: 'Token ' + USER_KEY
            }
        };
        // axios.defaults.headers.post['authorization'] = 'token ' + key
        axios.post(BASE_URL + '/api/v1/rest-auth/logout/', config)
            .then(function (response) {
                // console.log(response.status)
                // console.log(response.data)
                if (response.status === 200) {
                    localStorage.removeItem("pryde_key");
                    console.log("done!");
                    return true;
                } else {
                    return false;
                }
            })
    },
    async getAllProjects() {
        let projects = await axios.get(BASE_URL + '/api/v1/project/');
        return projects.data
    },
    async getProject(pk) {
        let project = await axios.get(BASE_URL + '/api/v1/project/' + pk + '/');
        return project.data
    },
    async createProject(data) {
        let config = {
            headers: {
                Authorization: 'Token ' + USER_KEY
            }
        };
        // axios.defaults.headers.post['authorization'] = 'token ' + key
        axios.post(BASE_URL + '/api/v1/project/create/', config)
            .then(function (response) {
                // console.log(response.status)
                // console.log(response.data)
                return response.status === 200;
            })

    }
}
