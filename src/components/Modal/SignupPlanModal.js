import React, { useState, useEffect } from 'react'
import { registerAPI } from '../../Apis/auth'
import Loader from 'react-loader-spinner'
import { validate } from '../../validations/signup'
import { toast } from 'react-toastify'
import Modal from 'react-responsive-modal'
import { userTypes } from '../../constants/data'
import PricingModal from '../Modal/PricingModal'

const Modal4 = (props) => {
   const [ registerInfo, setRegisterInfo ] = useState({
      email: '', 
      password: '', 
      user_role_mapping_role: ''
   })
   const [ buttonLoading, setButtonLoading] = useState(false)
   const [ errors, setErrors] = useState({})
   const [ userType, setUserType] = useState('')
   const [ showPricing, setPricingDisplay] = useState(false)

   useEffect(() => {
      setErrors({})
   },[registerInfo])

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
         case 'CUSTOMER':	
            window.location = '/buyer_property_list'
            break;
         case 'SUPER_ADMIN':
            window.location = '/search'
            break;
         default:
            break;
      }
     }

   const submit = () => {
      let result = validate(registerInfo)
      setErrors(result)
      if(!(Object.keys(result).length > 0)){
         setButtonLoading(true)
         registerAPI(registerInfo)
            .then(res => {
               if(res && res.length){
                  toast.success('Signed up successfully!')
                  sessionStorage.setItem('user', JSON.stringify(res[0]))
                  
                  if((res[0].role === 'CUSTOMER') && (res[0].plan_uuid === null)){
							//setPricingDisplay(true)
                     window.location = "/user_profile"
                  } 
                  else {
                     checkRole(res[0].role)
                  }

                  setTimeout(() => {
                     setButtonLoading(false)
                  }, 2000)
               }
               else if(res.status !== 200 ){
                  setTimeout(() => {
                     toast.error(res.response.data.error)
                     setButtonLoading(false)
                  }, 1000)
               }
            })
         }
   }

   const openPricing = () => {
      setPricingDisplay(true)
      setTimeout(() => {
         props.onClose()
      }, 1000);
   }
   
   //console.log(props, "signup props")
   return (
      <Modal open={props.show} onClose={props.onClose}>

         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title" id="signupModalLabel">Sign Up</h5>
               {/* <p>Lorem Ipsum is a dummy content.</p> */}
            </div>
            <div className="modal-body">
               <div className="offer-section">
                  <form>
                     <div className="row">
                        <div className="col-lg-12 col-xs-12">
                           <div className="form-group">
                              <label>email address</label>
                              <input 
                                 value={registerInfo.email || ''} 
                                 onChange={(e) => setRegisterInfo({...registerInfo, 'email': e.target.value }) }
                                 type="text" 
                                 className="form-control"/>
                              {errors['email'] && errors['email'].length > 0 ? <p className="alert">{errors['email'][0]}</p> : null}
                           </div>
                        </div>
                        
                        <div className="col-lg-12 col-xs-12">
                           <div className="form-group list-price">
                              <label>password</label>
                              <input 
                                 value={registerInfo.password || ''} 
                                 onChange={(e) => setRegisterInfo({...registerInfo, 'password': e.target.value }) }
                                 className="form-control" type="password"/>
                              {errors['password'] && errors['password'].length > 0 ? <p className="alert">{errors['password'][0]}</p> : null}
                           </div>
                        </div>
                        
                        <div className="col-lg-12 col-xs-12">
                           <div className="form-group list-price">
                              <label>User Role</label>
                              <select className="form-control" id="state-filter" onChange={e => setRegisterInfo({...registerInfo, 'user_role_mapping_role': e.target.value })}>
                                 <option value="">Select Role</option>
                                 {userTypes.map((user, index) => <option key={index} value={user.value} >{user.label}</option>)}		
								      </select> 
                              {errors['user_role_mapping_role'] && errors['user_role_mapping_role'].length > 0 ? <p className="alert">{errors['user_role_mapping_role'][0]}</p> : null}
                           </div>
                        </div>
                        {/* <AdditionalFields 
                           errors={{}} 
                           registerInfo={registerInfo} 
                           setRegisterInfo={setRegisterInfo}/> */}
                     </div>
                     <button className="btn" type="button" onClick={submit}>
                        {buttonLoading ? 
                           <Loader type="ThreeDots" color="#FFFFFF" 
                              height={20} width={30}/>: 'sign up'}
                     </button>
                  </form>
               </div>
            </div>
         </div>
         {/* <PricingModal getPackages={props.getPackages} 
            packages={props.packages} open={showPricing} onClose={() => setPricingDisplay(false)}/> */}
   </Modal>
)}

export default Modal4