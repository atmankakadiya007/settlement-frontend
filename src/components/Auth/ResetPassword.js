import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { verifytoken, resetPassword } from '../../Apis/auth'
import { validateEmail } from '../../utils/common'

function ResetPassword (props){
    const [ passwordInfo, setInfo] = useState({})
    const [ buttonLoading, setButtonLoading] = useState(false)
    const [ errors, setErrors] = useState({})

    useEffect(() => {
        const token = props.location.search.split('=')[1]
        if( Object.keys(passwordInfo).length < 1) {
            verify(token)
        }
        setErrors({})
    }, [passwordInfo])


    const verify = (token) => {
        verifytoken({ 'verifyToken': token })
            .then(res => {
                if(res && res.response){
                    toast.error('Token in the url not valid.')
                }
                else {
                    setInfo({...passwordInfo, 'user_id': token })
                }
            })
    }

    const validate = (data) => {
        if(data.password === data.confirm_password){
            setErrors({})
            return data
        }
        else {
            let err = {
                'password' : 'New and Confirmed password should be same.', 
                'confirmed': 'New and Confirmed password should be same.'
            }
            setErrors(err)
            return {}
        }
    }


    const reset = () => {
        let validInfo = validate(passwordInfo)
        if(Object.keys(validInfo).length === 3){
            setButtonLoading(true)
            resetPassword(validInfo)
                .then(res => {
                    if(res && res.response){
                        setButtonLoading(false)
                        toast.success(res.response)
                        setTimeout(() => {
                            props.history.push('/')
                        }, 1000)         

                    }
                    else if(res && res.error){
                        setButtonLoading(false)
                        toast.error('Malformed URl.Token is already expired.')
                    }
                })
        }
    }


    return(
        <section className="reset-password">
            <div className="container">
                <div className="spacing">
                <div className="col-lg-6 mx-auto">
                <h4 className="mb-4">Reset Password</h4>
                <form>
                {/* <div className="form-group">
                    <input 
                        placeholder="Old Password"
                        type="text" 
                        className="form-control"
                        value={passwordInfo.old_password} 
                        onChange={(e) => setInfo({...passwordInfo, 'old_password': e.target.value })} />
                </div> */}
                <div className="form-group">
                    <input
                        placeholder="New Password"
                        type="password" 
                        className="form-control"
                        value={passwordInfo.password} 
                        onChange={(e) => setInfo({...passwordInfo, 'password': e.target.value })}/>
                    {errors && errors['password'] ? <p className="alert" >{errors['password']}</p>: null}
                </div>
                <div className="form-group">
                    <input
                        placeholder="Confirm Password"
                        type="password" 
                        className="form-control"
                        value={passwordInfo.confirm_password} 
                        onChange={(e) => setInfo({...passwordInfo, 'confirm_password': e.target.value })}/>
                     {errors && errors['confirmed'] ? <p className="alert">{errors['confirmed']}</p>: null}
                </div>
                <button type="button" className="btn agent-btn" onClick={reset}>
                    {buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>: 'SUBMIT'}</button>
                </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword