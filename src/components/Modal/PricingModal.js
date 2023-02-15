import React, { useState, useEffect } from 'react';
import Plans from '../Profile/Plans';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModal from '../Modal/PaymentModal';
import { processPayment } from '../../Apis/auth'; 
import { toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal'

const Modal1 = (props) => {
   const stripe = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)
   const [ show, setShow] = useState(false)
   const [ selectedPlan, setSelectedPlan] = useState(0)

   useEffect(() => {
      if(props.getPackages){
         props.getPackages()
      }

   }, []) 


   const handleRegisterClick = () => {
     // document.getElementById('price-cancel-btn').click()
      
      setTimeout(() => {
         setShow(true)
      }, 2000) 
   }
   
   const pay = (token) => {
      let user_id = null
      let info = JSON.parse(sessionStorage.getItem('user'))
         if(info && info.user_information_uuid){
            user_id = info.user_information_uuid
   
            processPayment({
               "amount": props.packages[selectedPlan]["amount"],
               "description": props.packages[selectedPlan]["plan_description"],
               "token": token, 
               "user_id": user_id, 
               "package_id": props.packages[selectedPlan]['plan_uuid']
            }).then(res => {
               if(res && res.status){
                  toast.error(res.response)
               }
               else {
                  setShow(false)
                  if(props.fetchUserDetails){
                     props.fetchUserDetails(user_id)
                  }
                  //fetchTransactionHistory({ 'user_id': user.user_information_uuid })
                  toast.success('Payment Succeeded.')
               }
            })
      }
   }
   //console.log( props.packages[selectedPlan], "user profile")

   return (
      <Modal open={props.open} onClose={props.onClose}>
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title" id="pricingModalLabel">pricing plan</h5>
               {/* <p>Each type of hosting service we provide is further optimized wi</p> */}
               {/* <button id="price-cancel-btn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button> */}
            </div>
            <div className="modal-body">
               <Plans setSelectedPlan={setSelectedPlan} selected={props.userProfile && props.userProfile.plan_uuid  || null}
                  packages={props.packages || []} hideRegister={false} setShow={handleRegisterClick}/>
            </div>
            <Elements stripe={stripe}>
               <PaymentModal 
                  show={show} 
                  pay={pay}
                  plan={props.packages[selectedPlan] || {}}
                  onClose={() => setShow(false)}/>
            </Elements> 
         </div>
      </Modal>
   )}

export default Modal1