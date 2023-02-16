import React from 'react'

function BasicDetails(props){
    return(
        <div className="box details">
            <h4 className="d-flex align-items-center">profile details 
                <span className="ml-auto" >
                    {props.editMode ? 
                        <a onClick={props.updateUser}><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</a> : 
                        <a onClick={() => props.setEditMode(true)}><i className="fa fa-edit"></i> edit</a>}</span>
            </h4>
            <form>
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Full Name</label>
                    <div className="col-sm-6">
                        {props.editMode ? 
                            <input value={props.info.user_information_fullname || ''}
                                type="text" onChange={(e) => props.updateInfo({...props.info, 'user_information_fullname': e.target.value })}/> 
                            : props.info.user_information_fullname || ''}
                        {props.errors['user_information_fullname'] && props.errors['user_information_fullname'].length > 0 ? <p className="alert">{props.errors['user_information_fullname'][0]}</p> : null}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Email ID</label>
                    <div className="col-sm-6">
                        {props.editMode ? 
                            <input value={props.info.user_information_email_address || ''} 
                                type="text" onChange={(e) => props.updateInfo({...props.info, 'user_information_email_address': e.target.value })}/> 
                            : props.info.user_information_email_address || ''}
                        {props.errors['user_information_email_address'] && props.errors['user_information_email_address'].length > 0 ? <p className="alert">{props.errors['user_information_email_address'][0]}</p> : null}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Mobile</label>
                    <div className="col-sm-6">
                        {props.editMode ? 
                            <input value={props.info.user_information_mobile_number || ''} 
                                type="number" onChange={(e) => props.updateInfo({...props.info, 'user_information_mobile_number': e.target.value })}/> 
                            : props.info.user_information_mobile_number || ''}
                        {props.errors['user_information_mobile_number'] && props.errors['user_information_mobile_number'].length > 0 ? <p className="alert">{props.errors['user_information_mobile_number'][0]}</p> : null}
                    </div>
                </div>
            </form>
            {/* <li><span>Gender</span> Male</li>
            <li><span>Date of Birth</span> January 20, 1990</li> */}
            {/* <li><span>Account Number</span> 1234 9876 6543</li>
            <li><span>Bank</span> Commonwealth Bank</li> */}
        </div>
    )
}

export default BasicDetails




