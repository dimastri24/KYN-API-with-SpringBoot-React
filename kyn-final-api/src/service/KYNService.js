export const API_BASE_URL = 'http://localhost:8080/kyn';
export const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

//Get Current User Profile - Private Route
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/me",
        method: 'GET'
    });
    //return axios.get(API_BASE_URL + '/online/user/me');
}

//Post Login User - Public Route
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

//Post Register User - Public Route
export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function listAllStores() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/stores",
        method: 'GET'
    })
}

export function searchByKey(keyword) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/stores/search?key=" + keyword,
        method: 'GET'
    })
}

export function getStoreById(storeid){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/stores/" + storeid,
        method: 'GET'
    })
}

export function editProfile(userid, user){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/users/me/" + userid,
        method: 'PUT',
        body: JSON.stringify(user)
    })
}