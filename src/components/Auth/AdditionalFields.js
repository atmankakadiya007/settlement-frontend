import React, { useState, Fragment } from 'react'
import { states } from '../../constants/data'

function AdditionalFields (props) {
    const [ signupInfo, setSignupInfo ] = useState({})
    let { errors } = props
    return(
        <Fragment> 
            <form>
                <div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                value={signupInfo.company_name || ''} 
                                onChange={(e) => setSignupInfo({...signupInfo, 'company_name': e.target.value }) } 
                                className="form-control" type="text"/>
                            {errors['company_name'] && errors['company_name'].length > 0 ? <p className="alert">{errors['company_name'][0]}</p> : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                value={signupInfo.full_name || ''} 
                                onChange={(e) => setSignupInfo({...signupInfo, 'full_name': e.target.value }) } 
                                className="form-control" type="text"/>
                            {errors['full_name'] && errors['full_name'].length > 0 ? <p className="alert">{errors['full_name'][0]}</p> : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group list-price">
                            <label>Address</label>
                            <input
                                value={signupInfo.address || ''} 
                                onChange={(e) => setSignupInfo({...signupInfo, 'address': e.target.value }) } 
                                className="form-control" type="text"/>
                            {errors['address'] && errors['address'].length > 0 ? <p className="alert">{errors['address'][0]}</p> : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group list-price">
                            <label>website</label>
                            <input
                                value={signupInfo.website || ''} 
                                onChange={(e) => setSignupInfo({...signupInfo, 'website': e.target.value }) } 
                                className="form-control" type="text"/>
                            {errors['website'] && errors['website'].length > 0 ? <p className="alert">{errors['website'][0]}</p> : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group list-price">
                            <label>state</label>
                            <select  value={signupInfo.state || ''}
                                className="form-control" id="state-filter" onChange={e => setSignupInfo({ ...signupInfo.state, 'state' : e.target.value })}>
                                <option value="">Select State</option>
                                {states.map(state => <option value={state}>{state}</option>)}		
                            </select> 
                            {/* <input
                                value={''} 
                                onChange={(e) => setRegisterInfo({...registerInfo, 'phone_number': e.target.value }) } 
                                className="form-control" type="number"/> */}
                            {errors['state'] && errors['state'].length > 0 ? <p className="alert">{errors['state'][0]}</p> : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group list-price">
                            <label>ABN/ACN</label>
                            <input
                                value={signupInfo.abn || ''} 
                                onChange={(e) => setSignupInfo({...signupInfo, 'abn': e.target.value }) } 
                                className="form-control" type="number"/>
                            {errors['abn'] && errors['abn'].length > 0 ? <p className="alert">{errors['abn'][0]}</p> : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xs-12">
                        <div className="form-group list-price">
                            <label>phone number</label>
                            <input
                                value={signupInfo.phone_number || ''} 
                                onChange={(e) => setSignupInfo({...signupInfo, 'phone_number': e.target.value }) } 
                                className="form-control" type="number"/>
                            {errors['phone_number'] && errors['phone_number'].length > 0 ? <p className="alert">{errors['phone_number'][0]}</p> : null}
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default AdditionalFields