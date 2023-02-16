import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import { toast } from 'react-toastify'
import { validate } from '../../validations/contactDealer'
import { contactAgent } from '../../Apis/settings'   
import Loader from 'react-loader-spinner';


function ContactDealerModal (props){
    const [ errors, setErrors ] = useState({})
    const [ info, setInfo ] = useState({ 'phone' : '+1'})
    const { agent = {} } = props
    const [ buttonLoading, setLoading] = useState(false)

    useEffect(() => {
        setErrors({})
    }, [info])

    const submit = () => {
       // console.log(info, 'submit clicked')
        let result = validate(info)
        if((Object.keys(result).length > 0)){
           setErrors(result) 
        }
        else {
            contactAgent({...info, 'agent_email': agent && agent.user_information_email_address })
                .then(res => {
                    if(res.send){
                        setErrors({})
                        toast.success('Your request is sent.')
                        setTimeout(() => {
                            props.onClose()
                        }, 1000)
                    }
                })
        }
    }

    return(
        <Modal open={props.open} onClose={() => {
                setInfo({ 'phone' : '+1'})
                props.onClose()
            }}>
            <div className="modal-header">
                <div className="agent">
                    {/* <span><img src="/images/avatar.png" alt=""/></span> */}
                    <h4> { agent && agent.user_information_fullname && agent.user_information_fullname} </h4>
                    {/* <p>One Agency - Cronulla - Caringbah</p> */}
                    {agent.user_information_mobile_number  ? 
                        <a href={`tel:${agent.user_information_mobile_number}`}>call</a> : null }
                </div>
            </div>
            <div className="modal-body">
                <div className="offer-section">
                    <form>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group enquire_box">
                                    <label>I would like to enquire about:</label>
                                    <ul>
                                        <li className="form-check">
                                            <input onClick={(e) => setInfo({...info, 'enquire_about': 'price guide'})} 
                                                type="radio" defaultChecked={(info.enquire_about === 'price guide')} 
                                                className="form-check-input" name="optradio"/>
                                            <label className="form-check-label">price guide</label>
                                        </li>
                                        <li className="form-check">
                                            <input onClick={(e) => setInfo({...info, 'enquire_about': 'contract of sale'})} 
                                                type="radio" defaultChecked={(info.enquire_about === 'contract of sale')} className="form-check-input" name="optradio"/>
                                            <label className="form-check-label">contract of sale</label>
                                        </li>
                                        <li className="form-check">
                                            <input onClick={(e) => setInfo({...info, 'enquire_about': 'book inspection'})} 
                                                type="radio" defaultChecked={(info.enquire_about === 'book inspection')} className="form-check-input" name="optradio"/>
                                            <label className="form-check-label">book inspection</label>
                                        </li>
                                        <li className="form-check">
                                            <input onClick={(e) => setInfo({...info, 'enquire_about': 'similar properties'})} 
                                                type="radio" defaultChecked={(info.enquire_about === 'similar properties')} className="form-check-input" name="optradio"/>
                                            <label className="form-check-label">similar properties</label>
                                        </li>
                                        {errors['enquire_about'] && errors['enquire_about'].length > 0 ? <p className="alert">{errors['enquire_about'][0]}</p> : null}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>From :</label>
                                    <input onChange={(e) => setInfo({...info, 'name': e.target.value })} 
                                        type="text" value={info.name || ''} className="form-control" placeholder="Your full name"/>
                                </div>
                                {errors['name'] && errors['name'].length > 0 ? <p className="alert">{errors['name'][0]}</p> : null}
                            </div>

                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <input onChange={(e) => setInfo({...info, 'email': e.target.value })}
                                        type="text" value={info.email || ''} className="form-control" placeholder="Your email"/>
                                </div>
                                {errors['email'] && errors['email'].length > 0 ? <p className="alert">{errors['email'][0]}</p> : null}
                            </div>
                        
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group list-price">
                                    <input onChange={(e) => setInfo({...info, 'phone': e.target.value })} 
                                        type="number" value={info.phone || ''} className="form-control" placeholder="Your phone"/>
                                </div>
                                {errors['phone'] && errors['phone'].length > 0 ? <p className="alert">{errors['phone'][0]}</p> : null}
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Your Message :</label>
                                    <textarea onChange={(e) => setInfo({...info, 'message': e.target.value })} 
                                        cols="4" value={info.message || ''} type="text" className="form-control"></textarea>
                                </div>
                                {errors['message'] && errors['message'].length > 0 ? <p className="alert">{errors['message'][0]}</p> : null}
                            </div>

                        </div>
                        <button className="btn pink_btn" type="button" onClick={submit}>
                            {buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>: 'Send'}</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ContactDealerModal