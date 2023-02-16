import React from 'react'


function ContactDetails(props) {
    return (
        <section>
            <form>
                <div>
                    <div>
                        <label>First Name</label>
                        <input className="form-control" type="text" value={props.c_details.firstName || ''} 
                            onChange={(e) => props.updateInfo({...props.c_details, 'firstName' : e.target.value })}/>
                    </div>
                    <div>
                        <label> Last Name</label>
                        <input className="form-control" type="text" value={props.c_details.lastName || ''}
                            onChange={(e) => props.updateInfo({...props.c_details, 'lastName' : e.target.value })}/>
                    </div>
                </div>
                <div>
                    <label>Mobile Number(optional)</label>
                    <input className="form-control" type="number" value={props.c_details.mobile || ''}
                        onChange={(e) => props.updateInfo({...props.c_details, 'mobile' : e.target.value })}/>
                </div>
                <div>
                    <label>Enter email</label>
                    <input className="form-control" type="text" value={props.c_details.email || ''}
                        onChange={(e) => props.updateInfo({...props.c_details, 'email' : e.target.value })}/>
                </div>
                <div>
                    <label>Confirm email</label>
                    <input className="form-control" type="text"  value={props.c_details.confirm_email || ''}
                        onChange={(e) => props.updateInfo({...props.c_details, 'confirm_email' : e.target.value })}/>
                </div>
            </form>
            <button type="button" className="btn_r" onClick={props.submitContact}>Submit</button>
        </section>
    )
}

export default ContactDetails