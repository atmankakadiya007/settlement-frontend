import { Modal } from 'react-responsive-modal'
import React from 'react'

function Contact (props) {

    const { agent = {} } = props
    
    return (
        <Modal open={props.show} onClose={props.onClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="signupModalLabel">
                        Contact Agent
                    </h5>
                </div>
                <form>
                    <div className="form-group">
                        <label for="staticEmail" className="col-sm-12 col-form-label">Agent Name</label>
                        <div className="col-sm-12">
                            <span>{ agent.user_information_fullname ? agent.user_information_fullname  : 'Test Agent'}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="staticEmail" className="col-sm-12 col-form-label">Agent Email</label>
                        <div className="col-sm-12">
                            <span>{ agent.user_information_email_address ? agent.user_information_email_address : 'test@agent.com'}</span>
                        </div>
                    </div>
                    {agent.user_information_mobile_number ? 
                        <div className="form-group">
                            <label for="staticEmail" className="col-sm-12 col-form-label">Contact Number</label>
                            <div className="col-sm-12">
                                <a href="tel:+1-800-555-1234">{ agent.user_information_mobile_number ? agent.user_information_mobile_number : '+1-800-555-1234'}</a>
                            </div>
                        </div> : null }
                </form>
            </div>
        </Modal>
    )
}

export default Contact