import * as types from '../action_types/common'
import { getHighlights, fetchSuburb, fetchPostalCodes } from '../Apis/property'
import { getPackages } from '../Apis/auth'

export function getPropertyHighlights() {
    return function(dispatch) {
        return getHighlights()
                .then(res => {
                    dispatch({
                        type: types.GET_HIGHLIGHTS,
                        payload: res 
                    });
                }); 
    };
}

export function getSuburbs(data) {
    return function(dispatch) {
        return fetchSuburb(data)
                .then(res => {
                    dispatch({
                        type: types.GET_SUBURBS,
                        payload: res 
                    });
                }); 
    };
}


export function getPostalCodes(data) {
    return function(dispatch) {
        return fetchPostalCodes(data)
                .then(res => {
                    dispatch({
                        type: types.GET_POSTAL_CODES,
                        payload: res 
                    });
                }); 
    };
}

export function getPricingPackages () {
    return function(dispatch){
        return getPackages()
                .then(res => {
                    dispatch({
                        type: types.GET_PRICING_PACKAGES,
                        payload: res 
                    });
                }); 
    }
}

export function changeLoggedInStatus () {
    return function(dispatch){
        dispatch({
            type: types.CHANGE_USER_LOGGEDIN_STATUS,
        });
    }
}

export function changeShow () {
    return function(dispatch){
        dispatch({
            type: types.CHANGE_USER_LOGGEDIN_STATUS,
        });
    }
}

