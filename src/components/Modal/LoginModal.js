import React, { useState, useEffect } from 'react'
import { registerAPI, loginAPI, socialLogin } from '../../Apis/auth'
import Loader from 'react-loader-spinner'
import Modal from 'react-responsive-modal'
import { validateLogin } from '../../validations/login'
import { validate } from '../../validations/signup'
import ForgotPassword from '../Auth/ForgotPassword'
import { toast } from 'react-toastify'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {
	getPropertyId,
} from '../../Apis/property';
import { useHistory } from 'react-router-dom'
//       userId: null,
//       password: null,
//       emailaddress:"",
//       fullname: "",
//       responseError: false,
//       loggedIn: false,
//       password:"",
//       c_password:"",
//       mobilenumber:"",
//       buttonLabel:'Register',
//       loginPage:[],
//       uploadScreen:[]


function LoginModal(props) {
	const redirectPath = useHistory();
	// const [show, setShowRegister] = useState(false)
	const [loginInfo, setLoginInfo] = useState({})
	const [registerInfo, setRegisterInfo] = useState({})
	const [apiError, setApiError] = useState('')
	const [apiSuccess, setApiSuccess] = useState('')
	const [buttonLoading, setButtonLoading] = useState(false)
	const [loginErrors, setLoginErrors] = useState({})
	const [signinErrors, setSigninErrors] = useState({})
	const [showForgot, setShowForgot] = useState(false)
	const [viewSignup, setShowSignup] = useState(false)



	useEffect(() => {
		setApiError('')
		setLoginErrors({})
		setSigninErrors({})
		setApiSuccess('')
		setButtonLoading(false)
		setLoginInfo({})
	}, [])

	const register = () => {
		let result = validate(registerInfo)
		setSigninErrors(result)
		if (!(Object.keys(result).length > 0)) {
			setButtonLoading(true)
			registerAPI(registerInfo)
				.then(res => {
					if (res && res.length > 0) {
						toast.success('Signed up successfully!')
						sessionStorage.setItem('user', JSON.stringify(res[0]))
						setTimeout(() => {
							props.onClose()
							setButtonLoading(false)
						}, 2000)
					}
					else if (res && res.status !== 200) {
						toast.error(res.message)
						setButtonLoading(false)
					}
				})
		}

	}


	const checkRole = (role) => {
		switch (role) {
			case 'SOLICITOR':
				window.location = '/property_status_view'
				break;
			case 'INSPECTOR':
				window.location = '/property_status_view'
				break;
			case 'BROKER':
				window.location = '/property_status_view'
				break;
			case 'AGENT':
				window.location = '/agent_dashboard'
				break;
			// case 'CUSTOMER':	
			// 	window.location = '/buyer_property_list'
			// 	break;
			case 'SUPER_ADMIN':
				window.location = '/search'
				break;
			default:
				break;
		}
	}


	const login = (e) => {
		e.preventDefault();
		let result = validateLogin(loginInfo)
		setLoginErrors(result)
		if (!(Object.keys(result).length > 0)) {
			setButtonLoading(true)
			loginAPI(loginInfo)
				.then(res => {
					if (res && res.length > 0) {
						sessionStorage.setItem('user', JSON.stringify(res[0]))
						if ((res[0].role === 'CUSTOMER')) {
							getPropertyId(res[0].user_information_uuid).then((data) => {
								toast.success('Logged in successfully!')
								redirectPath.push({
									pathname: '/dashboard',
									state: {
										id: data.property_info_uuid,
									},
								});
								props.onClose();
							}).catch((e) => {
								console.log(e.message);
							});
						} else {
							checkRole(res[0].role)
						}
						setTimeout(() => {
							//window.location.reload();
							//props.onClose()
							setButtonLoading(false)
						}, 2000)
					}
					else if (res && res.response.status !== 200) {
						toast.error(res.response.data.response)
						setButtonLoading(false)
					}
				})
		}
	}

	const setForgot = () => {
		// props.onClose()
		setShowForgot(true)
	}

	const onForgetPasswordClose = () => {
		setShowForgot(false)
		props.onClose()
	}


	// eslint-disable-next-line no-unused-vars
	// const toggleSignupView = (role) => {
	// 	if (role === 'CUSTOMER') {
	// 		setShowSignup(true)
	// 	}
	// 	else {
	// 		setShowSignup(false)
	// 	}
	// 	setLoginInfo({ ...loginInfo, 'user_role_mapping_role': role })
	// }

	// const responseGoogle = (response) => {
	// 	//console.log(response, "google")
	// 	let info = response.profileObj || {}
	// 	let data = {
	// 		"email": info.email,
	// 		"account_type": "GOOGLE",
	// 		"user_role_mapping_role": "CUSTOMER"
	// 	}
	// 	if (info && (info.email !== '')) {
	// 		socialLogin({ ...data })
	// 			.then((res, err) => {
	// 				console.log(res, "google login api response")
	// 				if (res && res.length > 0) {
	// 					setTimeout(() => {
	// 						toast.success('Logged in successfully!')
	// 						sessionStorage.setItem('user', JSON.stringify(res[0]))
	// 						window.location = '/buyer_property_list'
	// 					}, 1000)
	// 				}
	// 				else if (res.response.data.error) {
	// 					toast.error(res.response.data.error)
	// 				}
	// 				else {
	// 					toast.error(err)
	// 				}

	// 			})
	// 	}
	// 	else {
	// 		toast.error('Unable to collect email.')
	// 	}
	// }

	// const responseFacebook = (response) => {
	// 	//console.log(response, "facebook")
	// 	if (response && (response.email !== '')) {
	// 		let data = {
	// 			"email": response.email,
	// 			"account_type": "FACEBOOK",
	// 			"user_role_mapping_role": "CUSTOMER"
	// 		}
	// 		socialLogin({ ...data })
	// 			.then(res => {
	// 				console.log(res, res.error, res.status, "facebook login api response")
	// 				if (res && res.length > 0) {
	// 					setTimeout(() => {
	// 						toast.success('Logged in successfully!')
	// 						sessionStorage.setItem('user', JSON.stringify(res[0]))
	// 						window.location = '/buyer_property_list'
	// 					}, 1000)
	// 				}
	// 				else {
	// 					toast.error('Issue occured while logging in.')
	// 				}
	// 			})
	// 	}
	// 	else {
	// 		toast.error('Unable to collect email information from Facebook.')
	// 	}

	// }

	//console.log(props, "props")
	return (
		<Modal open={props.open} onClose={props.onClose} >
			{/* <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item" onClick={() => setShowRegister(false)}>
          <a className="nav-link active" data-toggle="pill" href="#pills-home" role="tab">Log In</a>
        </li>
        <li className="nav-item" onClick={() => setShowRegister(true)}>
          <a className="nav-link" data-toggle="pill" href="#pills-profile" role="tab">Register</a>
        </li>
      </ul>   */}
			{(apiError !== '') ? <p className="alert">{apiError}</p> : null}
			{(apiSuccess !== '') ? <p className="success">{apiSuccess}</p> : null}
			<div className="tab-content" id="pills-tabContent">
				{!showForgot ?
					<div className="tab-pane fade show active empadding" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">Log in your Account</h5>
							<div className='d-flex justify-content-center w-100 my-4'>
								<img src="/images/logo.png" alt="" />
							</div>
						</div>
						<div className="modal-body">
							<form onSubmit={login}>
								<div className="form-group">
									<input type="text" className="form-control" id="recipient-name"
										// id="exampleInputemail1"  
										placeholder="Email"
										onChange={(event) => setLoginInfo({ ...loginInfo, 'email': event.target.value })} />
									{loginErrors['email'] && loginErrors['email'].length > 0 ?
										<p className="alert">{loginErrors['email'][0]}</p>
										: null
									}
								</div>
								<div className="form-group relative">
									<input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={(event) => setLoginInfo({ ...loginInfo, 'password': event.target.value })} placeholder="Password" />
									{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
									<a className="forgot" onClick={setForgot}>Forgot?</a>
									{loginErrors['password'] && loginErrors['password'].length > 0 ?
										<p className="alert">{loginErrors['password'][0]}</p>
										: null
									}
								</div>
								{/* <div className="form-group relative">
							<select className="form-control" id="state-filter" onChange={e => toggleSignupView(e.target.value)}>
								<option value="">Select Role</option>
								{userTypes.map(user => <option value={user.value}>{user.label}</option>)}		
							</select> 
								{loginErrors['user_role_mapping_role'] && loginErrors['user_role_mapping_role'].length > 0 ? <p className="alert">{loginErrors['user_role_mapping_role'][0]}</p> : null}
							</div> */}
								<div className="modal-footer">
									<button type="submit" className="btn pink_btn width_100">
										{buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30} /> : 'Login'}</button>
								</div>
							</form>
						</div>
						<div className="login-connect">
							<div className="seprator">
								<div ><hr /></div>
								OR
								<div ><hr /></div>
							</div>
							{/* <h5 className="modal-title" id="exampleModalLongTitle justify-content-center">Or Log in With : </h5> */}
						</div>
						<div className="signin">
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<p>Don't have an account? <a href="#registerNow" onClick={props.openRegister}>Sign Up</a>.</p>
						</div>
					</div>
					:

					<ForgotPassword show={showForgot} onClose={onForgetPasswordClose} />
				}
			</div>
		</Modal >
	)
}


export default LoginModal