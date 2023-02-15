import { API_URL, API_URL_OLD } from '../constants/api'
import { apiGet, apiPost } from '../utils/api'

export const getPropertyList = (data) => {
    return apiPost(API_URL + `property/listing`, data)
        .then(res => res)
        .catch(err => err)
}

export const getPropertyById = (data) => {
    return apiPost(API_URL + `property/propertyInfo`, data)
        .then(res => res)
        .catch(err => err)
}

export const getAllImageIdsOfProperty = (data) => {
    return apiPost(API_URL + `property/propertyImages`, data)
        .then(res => res)
        .catch(err => err)
}

export const renderImage = (data) => {
    return apiGet(API_URL + `property/renderImage?documentID=${data.imageId}`)
        .then(res => res)
        .catch(err => err)
}

export const getFacilitiesOfProperty = (data) => {
    return apiPost(API_URL + `property/facilities`, data)
        .then(res => res)
        .catch(err => err)
}

export const getHighlightsOfProperty = (data) => {
    return apiPost(API_URL + `property/highlights`, data)
        .then(res => res)
        .catch(err => err)
}

export const getLocationOfProperty = (data) => {
    //  "locationID":"fd6ac692bf0aede0ba708c7e0c808be0" 
    return apiPost(API_URL + `property/location`, data)
        .then(res => res)
        .catch(err => err)
}

export const getProjectionInfo = (data) => {
    return apiPost(API_URL + `property/projection`, data)
        .then(res => res)
        .catch(err => err)
}

export const getProjectionGraphInfo = (data) => {
    return apiPost( API_URL + `property/projectionGraph`, data)
        .then(res => res)
        .catch(err => err)
}


export const getHighlights = () => {
    return apiGet(API_URL + `property/allHighlights`)
        .then(res => res)
        .catch(err => err)
}

export const getPropertyCount = (data) => {
    return apiPost(API_URL + `property/propertiesCount`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchPostalCodes = (data) => {
    return apiPost(API_URL + `property/fetchPostalcodes`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchSuburb = (data) => {
    return apiPost(API_URL + `property/fetchSuburb`, data)
        .then(res => res)
        .catch(err => err)
}

export const addFavorite = (data) => {
    return apiPost(API_URL + `property/addToFavourite`, data)
        .then(res => res)
        .catch(err => err)
}

export const checkFavoriteProperty = (data) => {
    return apiPost(API_URL + `property/isFavourite`, data)
        .then(res => res)
        .catch(err => err)
}


export const sendPropertyOffers = (data) => {
    return apiPost(API_URL + `property/sendPropertyOffer`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchPropertyOffers = (data) => {
    return apiPost(API_URL + `property/fetchPropertyOffers`, data)
        .then(res => res)
        .catch(err => err)
}


export const fetchPropertiesByRole = (data) => {
    return apiPost(API_URL + `property/fetchAgentProperties`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchPeopleCountInterested = (data) => {
    return apiPost(API_URL + `property/fetchCountOfFavorites`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchIdsOfSuburbs = (data) => {
    return apiPost(API_URL + `property/fetchSuburbsIds`, data)
        .then(res => res)
        .catch(err => err)
} 

export const addProperty = (data) => {
    return apiPost(API_URL + `property/add`, data)
        .then(res => res)
        .catch(err => err)
}

export const editProperty = (data) => {
    return apiPost(API_URL + `property/edit`, data)
        .then(res => res)
        .catch(err => err)
}

export const deleteProperty = (data) => {
    return apiPost(API_URL + 'property/deleteProperty' , data)
        .then(res => res)
        .catch(err => err)
}

export const getPropertyStatus = (id) => {
    return apiGet(API_URL + `property/getPropertyStatus/${id}`)
        .then(res => res)
        .catch(err => err)
}

export const getPropertyId = (id) => {
    return apiGet(API_URL + `property/getSinglePropertyId/${id}`)
        .then(res => res)
        .catch(err => err)
}