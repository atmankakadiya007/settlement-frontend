import { API_URL } from '../constants/api'
import { apiGet, apiPost } from '../utils/api'


export function loginAPI (params) {
    return apiPost(API_URL + `auth/login`, params)
        .then(res => res)
        .catch(err => err)
}

export function registerAPI (params) {
    return apiPost(API_URL + `auth/signup`, params)
        .then(res => res)
        .catch(err => err)
}

export function verifytoken (params) {
    return apiPost(API_URL + `auth/verifyToken`, params)
        .then(res => res)
        .catch(err => err)
}

export function forgotPassword (params){
    return apiPost(API_URL + `auth/forgotPassword`, params)
        .then(res => res)
        .catch(err => err)
}

export function resetPassword (params){
    return apiPost(API_URL + `auth/resetPassword`, params)
        .then(res => res)
        .catch(err => err)
}

export function getPackages () {
    return apiGet(API_URL + `auth/packages`)
        .then(res => res)
        .catch(err => err)
}

export function getSinglePackage (plan_uuid) {
    return apiGet(API_URL + `auth/packages/${plan_uuid}`)
        .then(res => res)
        .catch(err => err)
}

export function processPayment (params){
    return apiPost(API_URL + `auth/payment`, params)
        .then(res => res)
        .catch(err => err)
}

export function fetchUserProfile (params) {
    return apiPost(API_URL + `auth/getProfile`, params)
        .then(res => res)
        .catch(err => err)
}

export function updateUserProfile (params) {
    return apiPost(API_URL + `auth/updateProfile`, params)
        .then(res => res)
        .catch(err => err)
}

export function fetchTransactions (params) {
    return apiPost(API_URL + `transaction/listing`, params)
        .then(res => res)
        .catch(err => err)
}

export function getFavouriteProperties (params) {
    return apiPost(API_URL + `property/customerFavourites`, params)
        .then(res => res)
        .catch(err => err)
}

export function verifyUserRole (params){
    return apiPost(API_URL + 'settings/verifyRole', params)
        .then(res => res)
        .catch(err => err)
}   

export function socialLogin (params){
    return apiPost(API_URL + `auth/socialApi`, params)
        .then(res => res)
        .catch(err => err)
}

export function deleteUser (params){
    return apiPost(API_URL + `auth/deleteUser`, params)
        .then(res => res)
        .catch(err => err)
}