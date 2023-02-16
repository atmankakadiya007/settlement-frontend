import { Modal } from 'react-responsive-modal'
import React, { useState } from 'react'
import ContactDetails from '../ContactAgent/ContactDetails'
import PaymentDetails from '../ContactAgent/PaymentDetails'


function ContactAgentModal (props) {
    const [ contactInfo, setContactInfo ] = useState({
        step: 2, 
        stepName: 'Payment Details', 
        c_details: {}, 
        pay_details: {}
    })
    return(
        <Modal open={props.show} onClose={props.onClose} center> 
            <h4> Step {contactInfo.step ? contactInfo.step : '1' } of 2 {contactInfo.stepName ? contactInfo.stepName : 'Contact Details' }</h4>
           {contactInfo.step === 1 ?  <ContactDetails c_details={contactInfo.c_details} updateInfo={setContactInfo}/> : null }
           {contactInfo.step === 2 ? <PaymentDetails pay_details={contactInfo.pay_details} updateInfo={setContactInfo}/> : null}
        </Modal>
    )
}

export default ContactAgentModal