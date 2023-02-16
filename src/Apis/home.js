import { API_URL } from '../constants/api'
import { apiGet, apiPost } from '../utils/api'


export const fetchHomepageProperties = (data) => {
    return apiPost(API_URL + `property/homePropertieslisting`, data)
        .then(res => res)
        .catch(err => err)
}

export const fetchArticles = () => {
    return apiGet(`https://searchnsettleblogs.trigma.in/wp-json/wp/v2/posts`)
        .then(res => res)
        .catch(err => err)
}

export const fetchArticleImages = (data) => {
    return apiGet(`https://searchnsettleblogs.trigma.in/wp-json/wp/v2/media/`, data)
        .then(res => res)
        .catch(err => err)
}