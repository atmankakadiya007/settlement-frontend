import React from 'react'
import { Modal } from 'react-responsive-modal'
import Loader from 'react-loader-spinner';

function SendMessagePopup (props) {
    const { errors = {}, buttonLoading = false } = props

    return(
        <Modal open={props.open} onClose={props.onClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="signupModalLabel">
                        Send Message
                    </h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input onChange={(e) => props.saveMessage({...props.messageInfo, 'name': e.target.value })} 
                                        type="text" value={props.messageInfo.name || ''} className="form-control" placeholder="Your full name"/>
                                </div>
                                {errors['name'] && errors['name'].length > 0 ? <p className="alert">{errors['name'][0]}</p> : null}
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group">
                                    <textarea placeholder={'Type your message'} onChange={(e) => props.saveMessage({...props.messageInfo, 'message': e.target.value })} 
                                        cols="4" value={props.messageInfo.message || ''} type="text" className="form-control"></textarea>
                                </div>
                                {errors['message'] && errors['message'].length > 0 ? <p className="alert">{errors['message'][0]}</p> : null}
                            </div>
                        </div>
                        <button className="btn pink_btn" type="button" onClick={props.sendMessage}>
                            {buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>: 'Send'}</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default SendMessagePopup