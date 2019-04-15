/**
 * 
 * Final Entry for all the API calls
 * 
 * All the common configurations should bypass httpUtils
 * Keep adding additional methods on requirement
 * 
 */

import GLOBAL from './../global';

import { getPermission, getAccessToken } from './../config/AccessToken';

import { AsyncStorage } from 'react-native';

import { Notify, GetStore } from './core.utils';

let authToken;

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'X-Apartment-Id': 1,
};

/**
 * Method for Get Call
 * 
 * @param {*} param
 */
export async function GetData({ url, token }) {
    return ApiCall({ url, method: 'GET' });
}

/**
 * Method posts data to mentioned url 
 * 
 * @param {*} param 
 */
export async function PostData({ url, formBody }) {
    return ApiCall({ url, formBody, method: 'POST', returnResponse: true });
}

/**
 * Final Exit for API call
 * 
 * @param {*} param 
 */
export async function ApiCall({ url, formBody, method, ...props }) {

    return await GetStore('token').then((token) => {

        if (token != null) {

            headers['Authorization'] = 'Token ' + token;

            let payload = {
                method: method,
                headers: headers,
                body: formBody ? JSON.stringify(formBody) : null
            };


            // Rough implementation. Untested.
            // function timeout(ms, promise) {
            //     return new Promise(function(resolve, reject) {
            //       setTimeout(function() {
            //         reject(new Error("timeout"))
            //       }, ms)
            //       promise.then(resolve, reject)
            //     })
            //   }

            //   timeout(1000, fetch('/hello')).then(function(response) {
            //     // process response
            //   }).catch(function(error) {
            //     // might be a timeout error
            //   })

            return fetch(GLOBAL.API.API_BASE_URL + url, payload)
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    } else {

                        return res.json()
                        // Notify({ message: 'Failure', description: 'failed', type: 'danger' });
                        // return res;

                    }
                })
                .then(res => {

                    if (res.status == "success") {

                        // If the complete response has to be returned ,
                        // so as to show the notification according to 
                        // the result at a parent level
                        if (props.returnResponse) {
                            return res;
                        } else {
                            return res.data;
                        }

                    } else {

                        let error = Object.keys(res.error);

                        error.forEach((item) => {
                            Notify({ message: 'Failure', description: JSON.stringify(res.error[item]), type: 'danger' });
                        });
                    }
                })
                .catch(error => {
                    Notify({ message: 'Hello', type: 'danger' });
                    console.log(error);
                });


        } else {
        }
    });

} 