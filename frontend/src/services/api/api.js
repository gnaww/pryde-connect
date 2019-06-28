import axios from 'axios'
const base_url = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
var key = localStorage.getItem['pryde_key'];


export default {


    async register_user(data) {

        let registration_response = await axios.post(base_url + '/api/v1/rest-auth/registration/', data);
        return registration_response;

    },

    async login_user(data) {
        // axios.defaults.headers.get['Api-Token'] = '5ea7c60205245ff3f477e9962887d6c0'
        // axios.defaults.headers.get['Api-Secret-Key'] = 'yhgU0DWecw4B'

        // console.log(data);
        //
        // console.log("Sending request")
        let response = await axios.post(base_url + '/api/v1/rest-auth/login/', {
            'email': data['email'],
            'password': data['password']
        });
        return response;
    },



    logout_user(data) {
            // axios.defaults.headers.post['Api-Token'] = '5ea7c60205245ff3f477e9962887d6c0'
            // axios.defaults.headers.post['Api-Secret-Key'] = 'yhgU0DWecw4B'


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


    }



}
