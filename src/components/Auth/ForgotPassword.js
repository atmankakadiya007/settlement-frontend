import React, { useState } from 'react'
import Modal from 'react-responsive-modal'
import Loader from 'react-loader-spinner'
import { forgotPassword } from '../../Apis/auth'
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/common'

function ForgotPassword(props) {
    const [email, setEmail] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)

    const submit = () => {
        let result = validateEmail(email)
        if (result) {
            setButtonLoading(true)
            forgotPassword({ 'email': email })
                .then(res => {
                    if (res && res.status) {
                        setButtonLoading(false)
                        toast.error(res.response)
                    }
                    else {
                        setButtonLoading(false)
                        toast.success('Request sent successfully.Please check your email.')
                        props.onClose()
                    }
                })
        }
        else {
            toast.error('Please provide valid email.')
        }
        // setTimeout(() => {  setButtonLoading(false) }, 1000)
    }

    return (
        <Modal open={props.show} onClose={props.onClose} classNames={{ modal: 'customModal' }}>
            <div className="modal-header">
                <h2 className="modal-title">Forgot your password?</h2>
                <div className='d-flex justify-content-center w-100 my-4'>
                    <img src="/images/logo.png" alt="" />
                </div>
                <p>Please enter your email, and we’ll send you a link to change your password.</p>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <input onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            className="form-control"
                            id="recipient-name" placeholder="Email" />
                    </div>
                    {/* <div className="captcha"><img src="/images/captcha.png" alt=""/></div> */}
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={submit} className="btn pink_btn width_100">
                    {buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30} /> : 'SUBMIT'}</button>
            </div>
        </Modal>
    )
}

export default ForgotPassword