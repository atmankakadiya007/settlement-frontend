import React from 'react'
import CustomTable from '../Common/CustomTable'
import { trans_data } from '../../constants/data'

function Referrels(){
    return(
        <div className="box refer">
            <h4 className="d-flex align-items-center">Refer a Friend</h4>
            <div className="row">
               <div className="col">
                  <div className="refer-box">
                     <label>Send Email</label>
                     <p>Invite Friend</p>
                     <input type="text" className="form-control" placeholder="Enter new email ID.."/>
                     <button type="submit" className="btn">submit</button>
                  </div>
               </div>
               <div className="col">
                  <div className="refer-box">
                     <label>Send SMS</label>
                     <p>Invite Friend</p>
                     <input type="number" className="form-control" placeholder="Enter Mobile Number"/>
                     <button type="submit" className="btn">submit</button>
                  </div>
               </div>
               <div className="col">
                  <div className="refer-box">
                     <label>Invite on social media</label>
                     <p>Invite Friend</p>
                     <ul>
                        <li><a href="#"><img src="images/social/facebook.png" alt=""/></a></li>
                        <li><a href="#"><img src="images/social/google.png" alt=""/></a></li>
                        <li><a href="#"><img src="images/social/twitter.png" alt=""/></a></li>
                     </ul>
                  </div>                  
               </div>
            </div>
            
            <h4 className="d-flex align-items-center mt-4">Referral Earnings</h4>
            
            <div className="scroll-table">
                <CustomTable
                    headings={['ID', 'DATE', 'NAME', 'PLAN', 'AMOUNT']}
                    rowdata={[]}
                />
            </div>
        </div>
    )
}

export default Referrels