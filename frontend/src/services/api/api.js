import axios from 'axios'
const base_url = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
var key = localStorage.getItem['pryde_key'];


export default {


    async get_user_info() {

        let response = await axios.get(base_url + '/api/v1/user');
        return response.data;
    },

    async register_user(data) {

        let registration_response = await axios.post(base_url + '/api/v1/rest-auth/registration/', data);
        return registration_response;

    },

    async login_user(data) {

        let response = await axios.post(base_url + '/api/v1/rest-auth/login/', {
            'email': data['email'],
            'password': data['password']
        });
        return response;
    },

    logout_user(data) {

            let config = {
                headers: {
                    'Authorization': 'Token ' + key
                }
            };
            // axios.defaults.headers.post['authorization'] = 'token ' + key
            axios.post(base_url + '/api/v1/rest-auth/logout/', config)
                .then(function (response) {
                    // console.log(response.status)
                    // console.log(response.data)
                    if (response.status == 200) {
                        localStorage.removeItem('pryde_key');

                        console.log("done!");

                        //NEED REACT VERSION OF THIS... PUSH THE PAGE TO EITHER HOME OR LOGIN
                        // router.push( { path: `/login` });
                        return true;
                    } else {
                        return false;
                    }
                })
    },

    async get_all_studies() {

        let response = await axios.get(base_url + '/api/v1/study/');
        return response.data

    },

    async get_study(pk) {

        let response = await axios.get(base_url + '/api/v1/study/' + pk + '/');
        return response.data
    },

    async post_study(data) {
        let config = {
            headers: {
                'Authorization': 'Token ' + key
            }
        };
        // axios.defaults.headers.post['authorization'] = 'token ' + key
        axios.post(base_url + '/api/v1/study/create/', config)
            .then(function (response) {
                // console.log(response.status)
                // console.log(response.data)
                return response.status === 200;
            })

    }

}
