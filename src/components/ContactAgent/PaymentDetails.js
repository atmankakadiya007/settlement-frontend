import React from 'react'
import DateTime from 'react-datetime'

function PaymentDetails(props) {
    return(
        <section>
            
            <div>
                <label>Name on the card</label>
                <input className="form-control" type="text" value={props.pay_details.name || ''}
                    onChange={(e) => props.updateInfo({...props.pay_details, 'name' : e.target.value })}/>
            </div>
            <div>
                <label>Card Number</label>
                <input className="form-control" type="number" value={props.pay_details.card_number || ''}
                    onChange={(e) => props.updateInfo({...props.pay_details, 'card_number' : e.target.value })}/>
            </div>
            <div>
                <div>
                    <label>Expiration Date</label>
                    <DateTime className="form-control" value={props.pay_details.expiration_date || ''} 
                        onChange={(date) => props.updateInfo({...props.pay_details, 'expiration_date' : date })}/>
                </div>
                <div>
                    <label> CVV</label>
                    <input type="number" value={props.pay_details.cvv || ''}
                        onChange={(e) => props.updateInfo({...props.pay_details, 'cvv' : e.target.value })}/>
                </div>
            </div>
            <div>
                <div>
                    <label>Country</label>
                    <input className="form-control" type="text" value={props.pay_details.country || ''} 
                        onChange={(date) => props.updateInfo({...props.pay_details, 'country' : date })}/>
                </div>
                <div>
                    <label> City</label>
                    <input type="text" value={props.pay_details.city || ''}
                        onChange={(e) => props.updateInfo({...props.pay_details, 'city' : e.target.value })}/>
                </div>
            </div>
            <div>
                <label>Address 1</label>
                <input className="form-control" type="text" value={props.pay_details.address1 || ''}
                    onChange={(e) => props.updateInfo({...props.pay_details, 'address1' : e.target.value })}/>
            </div>
            <div>
                <label>Address 2</label>
                <input type="text" value={props.pay_details.address2 || ''}
                    onChange={(e) => props.updateInfo({...props.pay_details, 'address2' : e.target.value })}/>
            </div>
            <div>
                <div>
                    <label>Postal code </label>
                    <input className="form-control"type="number" value={props.pay_details.post_code || ''} 
                        onChange={(e) => props.updateInfo({...props.pay_details, 'postcode' : e.target.value })}/>
                </div>
                <div>
                    <label> State</label>
                    <input className="form-control" type="text" value={props.pay_details.state || ''}
                        onChange={(e) => props.updateInfo({...props.pay_details, 'state' : e.target.value })}/>
                </div>
            </div>
            <div>
                <label>Email address for invoice</label>
                <input className="form-control" type="text" value={props.pay_details.email || ''}
                    onChange={(e) => props.updateInfo({...props.pay_details, 'email' : e.target.value })}/>
            </div>
            <div>
                <button className="btn_r" type="button" onClick={props.submitPayDetails}>Submit</button>
                <button className="btn_w" type="button" onClick={() => {}}>Skip</button>
            </div>
        </section>
    )
}

export default PaymentDetails