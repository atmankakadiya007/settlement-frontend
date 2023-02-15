import { API_URL } from '../constants/api'
import { apiGet, apiPost } from '../utils/api'


export const getOfferCount = () => {
    return apiGet(API_URL + `settings/offerLimit`)
        .then(res => res)
        .catch(err => err)
}


export const getGeoInfo = () => {
    return apiGet('https://api.ipify.org/?format=json')
        .then(response => response)
        .catch(err => err.response)
};


export const uploadDocument = (data) => {
    return apiPost(API_URL + `property/offerDocumentUpload`, data)
        .then(res => res)
        .catch(err => err)
}


export const fetchDocumentList = (data) => {
    return apiPost(API_URL + `property/fetchDocuments`, data)
        .then(res => res)
        .catch(err => err)
}


export const contactAdmin = (data) => {
    return apiPost(API_URL + `property/enquiryToAdmin`)
        .then(res => res)
        .catch(err => err)
}

export const contactAgent = (data) => {
    return apiPost(API_URL + `property/enquiryToAgent`)
        .then(res => res)
        .catch(err => err)
}

export const sendMessage = (data) => {
    return apiPost(API_URL + `property/sendMessage`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchAllHighlights = () => {
    return apiGet(API_URL + `property/allHighlights`)
        .then(res => res)
        .catch(err => err)
}

export const fetchAllFacilities = () => {
    return apiGet(API_URL + `property/allFacilities`)
        .then(res => res)
        .catch(err => err)
}



