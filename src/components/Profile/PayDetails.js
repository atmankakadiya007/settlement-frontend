import React from 'react'

function PayDetails(){
    return (
        <div className="box payment">
            <h4 className="d-flex align-items-center">Payment Details <span className="ml-auto"><a href="#"><i className="fa fa-plus"></i> add card</a></span></h4>

            <div className="option-box">
               <label><input type="radio" name="radio-box"/> <span className="check"></span> card 1
               
                  <div className="card-detail">
                     <ul>
                        <li><span>name on card</span>John Doe</li>
                        <li><span>card number</span>1234 9876 4321</li>
                        <li><span>expire date</span> 12/11</li>
                        <li><span>CVV</span> <input type="number"/></li>
                        <li><span>billing address</span> 128, Wolf Street, Sydney</li>
                     </ul>
                  </div>
               </label>
            </div>
            <div className="option-box">
               <label><input type="radio" name="radio-box"/> <span className="check"></span> card 2
               
                  <div className="card-detail">
                     <ul>
                        <li><span>name on card</span>John Doe</li>
                        <li><span>card number</span>1234 9876 4321</li>
                        <li><span>expire date</span> 12/11</li>
                        <li><span>CVV</span> <input type="number"/></li>
                        <li><span>billing address</span> 128, Wolf Street, Sydney</li>
                     </ul>
                  </div>
               </label>
            </div>
        </div>
    )
}

export default  PayDetails