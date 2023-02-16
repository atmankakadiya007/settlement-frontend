import { API_URL } from '../constants/api'
import { apiPost } from '../utils/api'

export const fetchPurchasedProperties = (data) => {
    return apiPost(API_URL + `property/purchasedProperties`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchRejectedProperties = (data) => {
    return apiPost(API_URL + `property/rejectedProperties`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchSentOffers = (data) => {
    return apiPost(API_URL + `property/sentOffers`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchOfferStatusById = (data) => {
    return apiPost(API_URL + `property/fetchOffer`, data)
        .then(res => res)
        .catch(err => err)
}


export const fetchOfferCount = (data) => {
    return apiPost(API_URL + `property/offersListingCount`, data)
        .then(res => res)
        .catch(err => err)
}


export const fetchOfferListByRole = (data) => {
    return apiPost(API_URL + `property/offersListing`, data)
        .then(res => res)
        .catch(err => err)
}

export const updateOfferStatus = (data) => {
    return apiPost(API_URL + `property/updateOfferStatus`, data)
        .then(res => res)
        .catch(err => err)
}


export const acceptOffer = (data) => {
    return apiPost(API_URL + `property/acceptOffer`, data)
        .then(res => res)
        .catch(err => err)
}

export const rejectOffer = (data) => {
    return apiPost(API_URL + `property/rejectOffer`, data)
        .then(res => res)
        .catch(err => err)
}

export const rolesWithProperty = (data) => {
    return apiPost(API_URL + `property/rolesAssignedToProperty`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchPropertiesWithOffers = (data) => {
    return apiPost(API_URL + `property/propertiesHaveOffers`, data)
        .then(res => res)
        .catch(err => err)
}







