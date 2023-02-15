import React from 'react'
import { Fragment } from 'react'

function Pricing (props){
    return(
        <Fragment>
            <section className="tax-line">
                <div className="container">
                <p>After successfull NSW launch, soon we are launching in QLD and other Australian states!<br />
                </p> 
                </div>
            </section>
            <section className="meet spacing">
                <div className="container">
                    <div className="head">
                        <span>Pricing</span>
                        <h2>Full-service property settlement at pre negotiated bulk prices</h2>
                    </div>
                    <div className="pricing-table">
                        <table className="table">
                            <thead className="thead-1">
                                <tr>
                                <th scope="col"></th>
                                <th scope="col">Search&Settle</th>
                                <th scope="col">Buyer Agent</th>
                                <th scope="col">Other Settlement Company</th>
                                </tr>
                            </thead>
                            <thead className="thead-2">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"><b>$1,800</b><br />onwards inc GST</th>
                                    <th scope="col"><b>$12,500</b><br />onwards inc GST</th>
                                    <th scope="col"><b>$4,500</b><br />onwards inc GST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Property takeover</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Routine inspections</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Web portal for owners </th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Mobile app for tenants </th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Bills management (strata, water, council etc) </th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Lease preparation</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Lease renewal</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Landlord insurance (free for 1st year)*</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>
                                <tr>
                                    <th scope="row">Organise maintenance and repairs</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>  
                                <tr>
                                    <th scope="row">Monthly administration</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>   
                                <tr>
                                    <th scope="row">End of financial year statements</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>  
                                <tr>
                                    <th scope="row">Tenancy tribunal attendance and preparation (NCAT/VCAT) </th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>    
                                <tr>
                                    <th scope="row">Rent guarantee**</th>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                    <td><img src="images/success2.png" alt="" width="25"/></td>
                                </tr>            
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>   
            <section className="saving spacing">
                <div className="container">
                    <div className="head">
                        <span>Savings calculator</span>
                        <h2>How much can I save?</h2>
                    </div>

                    <div className="col-lg-5 mx-auto rent">
                        <div className="row">
                        <div className="col-lg-6 col-6">
                            <div className="box">
                                <span>your weekly rent</span>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                    </div>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-6">
                            <div className="box">
                                <span>your weekly rent</span>
                                <div className="input-group">
                                    <input type="text" className="form-control"/>
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-5 mx-auto fee">
                        <div className="row">
                            <div className="col-lg-6 col-6">
                                <div className="box">
                                    <span>your fee</span>
                                    <h2>$224 <p>per <br/>month</p></h2>
                                </div>
                            </div>
                            <div className="col-lg-6 col-6">
                                <div className="box">
                                    <span>different fee</span>
                                    <h2>$224 <p>per <br/>month</p></h2>
                                </div>
                            </div>               
                            <div className="col-lg-12 col-xs-12 mt-5">
                                <div className="box">
                                    <img src="images/range-slider.jpg" alt=""/>
                                </div>
                            </div>               
                        
                            <div className="col-lg-12 col-xs-12 mt-5">
                                <div className="box save">
                                    <span>with :Different, you'd save:</span>
                                    <h1>$2,150</h1>
                                    <p>* Assumes 18-month average tenancy length and 1.5 weeks of rent leasing fee for current agent. Saving figure includes FREE first-year landlord insurance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
     
            <section className="technology location team-member spacing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xs-12 d-flex order-2 order-md-1">
                            <div className="content">
                                <span>Leasing</span>
                                <h2>We will find you the best tenants</h2>
                                <p>Need to find new tenants? No worries, we've got you covered.
                                Pay $500 for leasing plus $150 for professional photography & $350 for advertising (NSW & VIC) or $250 (QLD)</p>
                                <ul>
                                    <label>Features</label>
                                <li><img src="images/success.png" alt="success"/>Rent appraisal</li>
                                <li><img src="images/success.png" alt="success"/>Mid-week, weekend and private inspections</li>
                                <li><img src="images/success.png" alt="success"/>Feedback collection from every open home attendee with prompt SMS & email updates </li>
                                <li><img src="images/success.png" alt="success"/>Wholistic tenant screening: tenancy database check and employment & rental history reference checks</li>
                                <li><img src="images/success.png" alt="success"/>Comprehensive lease preparation: bond management, key preparation, holding deposit and detailed ingoing condition report</li>
                                <li><img src="images/success.png" alt="success"/>Compliance (fire, water cleanliness, pool) and Fair Trading & Consumer Affairs compliance</li>
                                <li><img src="images/success.png" alt="success"/>Managing marketing campaign</li>
                                </ul>
                                <button type="button" className="btn" onClick={() => props.history.push('/contact')}>Book a Call</button>
                                <button type="button" className="btn meet-team" onClick={() => props.history.push('/faq')}>FAQ</button>
                            </div>
                        </div>
                    
                        <div className="col-lg-6 col-xs-12 order-1">
                            <div className="content_img">
                                <img src="images/technology.png" className="w-100 img-responsive"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
     
            <section className="meet spacing">
                <div className="container">
                    <div className="head">
                        <span>Attracting the best tenants</span>
                        <h2>Leasing</h2>
                    </div>

                    <div className="pricing-table">
                        <table className="table">
                        <thead className="thead-1">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Search&Settle</th>
                            <th scope="col">Agent</th>
                            <th scope="col">Agent</th>
                            </tr>
                        </thead>
                        <thead className="thead-2">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"><b>$100</b><br />per month inc GST</th>
                            <th scope="col"><b>5-9%</b><br />of rent plus GST</th>
                            <th scope="col"><b>5-9%</b><br />of rent plus GST</th>
                            </tr>
                        </thead>
               <tbody>
                  <tr>
                     <th scope="row">Property takeover</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Routine inspections</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Web portal for owners </th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Mobile app for tenants </th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Bills management (strata, water, council etc) </th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Lease preparation</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Lease renewal</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Landlord insurance (free for 1st year)*</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>
                  <tr>
                     <th scope="row">Organise maintenance and repairs</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>  
                  <tr>
                     <th scope="row">Monthly administration</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>   
                  <tr>
                     <th scope="row">End of financial year statements</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>  
                  <tr>
                     <th scope="row">Tenancy tribunal attendance and preparation (NCAT/VCAT) </th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>    
                  <tr>
                     <th scope="row">Rent guarantee**</th>
                     <td><img src="images/success2.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                     <td><img src="images/quest.png" alt="" width="25"/></td>
                  </tr>            


               </tbody>
             </table>
         </div>

      </div>
   </section>

   <section className="common-quest spacing">
      <div className="container">
         <div className="head">
            <span>FAQ</span>
            <h2>Common questions</h2>
         </div>

         <div className="row">
            <div className="col-lg-4 col-12">
               <div className="box text-center d-flex flex-column">
                  <img src="images/common1.png" alt=""/>
                  <h4>How can you offer a good service at this price?</h4>
                  <p>Our property managers are much more efficient, enhanced by our proprietarty
                     technology. We don't compromise on service.
                  </p>
               </div>
            </div>
            <div className="col-lg-4 col-12">
               <div className="box text-center d-flex flex-column">
                  <img src="images/common2.png" alt=""/>
                  <h4>Is this just software or do I get a property manager?</h4>
                  <p>Both! our team look after all aspects of your property. Our software gives you visibility &
                     convenience with your properties.
                  </p>
               </div>
            </div>
            <div className="col-lg-4 col-12">
               <div className="box text-center d-flex flex-column">
                  <img src="images/common2.png" alt=""/>
                  <h4>How do I transfer my property to you?</h4>
                  <p>We handle the entire process. We communicate with your existing agent,
                     transfer files and then commence service at end of your notice period.
                  </p>
               </div>
            </div>
         </div>
      </div>
   </section>
 
   <section className="check-service spacing">
      <div className="container">
         <div className="head">
            <h2>Check if we service your area</h2>
         </div>
         <div className="col-lg-6 offset-lg-3">
            <div className="location_search">
               <input type="text" placeholder="Search by suburb or postcode"/>
               <button type="button" className="btn">check location</button>
            </div>
         </div>
      </div>
   </section>
        </Fragment>
    )
}

export default Pricing