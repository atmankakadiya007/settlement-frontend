import axios from 'axios'
import moment from 'moment'
import https from 'https'

/**
 * Pass number to convert to decimal
 * @params
 * places number of decimal places after the number
 * no number to convert
*/

export const convertDateToLong = (date) => {
	return parseInt(moment(date).format('x'), 10)
}

export function toDecimal(no, places) {
	return parseFloat(Math.round(no * 100) / 100).toFixed(places);
}

export function valid_after(current,yesterday){
	if (current && current.isAfter && yesterday) {
		return current.isAfter(yesterday)
	}
	return false
}

export function valid_before(current,next){
	if (current && current.isBefore && next) {
		return current.isBefore(next);
	}
	return false
};

export function logOut () {
	return new Promise ((res, rej) => {
		sessionStorage.removeItem('user');
		res(true);
	})
}

export function isLoggedIn() {
	let session = getObject('user');
	//let token = session && session.accessToken;
   // let name = session && session.sso_username.split('.');
    return session
}

export function getHeaders () {
	//let session = getObject('session');
	return {
		authorization: null
	}
}

export function mockApi (dispatch, payload, time) {
	return setTimeout(() => dispatch(payload), time)
}


export function saveObject (key, value) {
	if(window && window.sessionStorage) {
		window.sessionStorage.saveObject(key, value);
	}
}

export function getObject(key) {
	// if(window && window.sessionStorage) {
	// 	return window.sessionStorage.getObject(key);
	// }

    return sessionStorage.getItem(key)
}

export function generateUrl (path, isAuth) {
	return path;
}

export function apiReq (endPoint, data, method, headers, config) {
  return new Promise ((res, rej) => {

  	headers = {
  		...getHeaders(),
		...headers
	}

	const agent = new https.Agent({  
		rejectUnauthorized: false
	});

  	if(method === 'get') {
  		data = {
  			params: data,
  			headers,
  			...config
  		}
  	}

  	axios[method](endPoint, data, {...config, headers, agent })
	.then((result) => {
	  let {data} = result;
	  return res(data)
	}).catch((err) => {
	  return rej(err);
	});
  })
}

export function apiPost (endPoint, data, headers = {}, config = {}) {
  return apiReq(endPoint, data, 'post', headers, config);
}

export function apiDelete (endPoint, data, headers = {}, config = {}) {
  return apiReq(endPoint, data, 'delete', headers, config);
}

export function apiGet (endPoint, data, headers = {}, config = {}) {
  return apiReq(endPoint, data, 'get', headers, config);
}

export function apiPut (endPoint, data, headers = {}, config = {}) {
  return apiReq(endPoint, data, 'put', headers, config);
}



