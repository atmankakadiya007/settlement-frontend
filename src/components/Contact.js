import React, { useEffect, useState, Fragment } from 'react'
import { validate } from '../validations/contact';
import { toast } from 'react-toastify'
import { contactAdmin } from '../Apis/settings'
import Loader from 'react-loader-spinner';

function Contact (){
   const [ info, setInfo ] = useState({ 'phone' : '+' })
   const [ errors, setErrors ] = useState({})
   const [ buttonLoading, setLoading] = useState(false)

   useEffect(() => {
      //window.scrollTo(0, 0);
      setErrors({})
   }, [info])


   const submit = () => {
      let result = validate(info)
      //console.log( result, "result")
      if( Object.keys(result).length > 0 ){
         setErrors(result)
      } 
      else {
         setLoading(true)
         setErrors({})
         contactAdmin(info)
            .then(res => {
               if (res.send){
                  setLoading(false)
                  toast.success('Your request is sent.')
                  setTimeout(() => {
                     setInfo({ 'phone' : '+' })
                  }, 200); 
               }
            })
         // setErrors({})
         // toast.success('Your request is under process.')
      }
      
   }

   return (
      <Fragment>
         <section className="tax-line">
            <div className="container">
               <p>After successfull NSW launch, soon we are launching in QLD and other Australian states!<br />
                </p>                    
            </div>
         </section>
         <section className="get-touch spacing">
            <div className="container">
               <div className="row">
                  <div className=" col-lg-6 offset-lg-3 col-xs-12 d-flex">
                     <div className="form-content">
                        <h2>Get in Touch</h2>
                        <form action="touch">
                           <div className="row">
                              <div className="col-lg-12 col-12">
                                 <div className="form-group">
                                    <input value={info.name} onChange={(e) => setInfo({...info, 'name': e.target.value })} 
                                       type="text" className="form-control" placeholder="Enter your Name"/>
                                 </div>
                                 {errors['name'] && errors['name'].length > 0 ? <p className="alert">{errors['name'][0]}</p> : null}
                              </div>
                              {/* <div className="col-lg-6 col-12">                              
                                 <div className="form-group">
                                    <input value={info.last_name} onChange={(e) => setInfo({...info, 'last_name': e.target.value })}  
                                       type="text" className="form-control" placeholder="Last Name"/>
                                 </div>
                                 {errors['last_name'] && errors['last_name'].length > 0 ? <p className="alert">{errors['last_name'][0]}</p> : null}
                              </div> */}
                              <div className="col-lg-12 col-12">                              
                                 <div className="form-group">
                                    <input value={info.email} onChange={(e) => setInfo({...info, 'email': e.target.value })} 
                                       type="text" className="form-control" placeholder="Email Address"/>
                                 </div>
                                 {errors['email'] && errors['email'].length > 0 ? <p className="alert">{errors['email'][0]}</p> : null}
                              </div>
                              <div className="col-lg-12 col-12">                              
                                 <div className="form-group">
                                    <input value={info.phone} onChange={(e) => setInfo({...info, 'phone': e.target.value })}  
                                       type="number" className="form-control" placeholder=" Phone Number"/>
                                 </div>
                                 {errors['phone'] && errors['phone'].length > 0 ? <p className="alert">{errors['phone'][0]}</p> : null}
                              </div>
                              {/* <div className="col-lg-12 col-12">                              
                                 <div className="form-group">
                                    <select name="property" id="property-location" className="form-control">
                                       <option value="1">Location 1</option>
                                       <option value="2">Location 2</option>
                                       <option value="3">Location 3</option>
                                    </select>
                                 </div>
                              </div> */}
                              <div className="col-lg-12 col-12">    
                                 <div className="form-group">
                                    <label for="">Who are you?</label>                          
                                    <div className="row">
                                       <div className="col">
                                          <div className="form-check">
                                             <input checked={(info.who_are_you === 'landlord')} 
                                                onChange={(e) => setInfo({...info, 'who_are_you': 'landlord' })}  
                                                type="radio" className="form-check-input" name="optradio"/>
                                             <label className="form-check-label">
                                                <img alt='...' src="/images/landlord.png"/>I’m a landlord
                                             </label>
                                             </div>
                                       </div>
                                       <div className="col">                                    
                                          <div className="form-check">
                                             <input checked={(info.who_are_you === 'tenant')} 
                                                onChange={(e) => setInfo({...info, 'who_are_you': 'tenant' })}   
                                                type="radio" className="form-check-input" name="optradio"/>
                                             <label className="form-check-label">
                                                <img alt='...' src="/images/tenant.png"/>I’m a tenant
                                             </label>
                                             </div>
                                       </div>
                                       <div className="col">                                    
                                          <div className="form-check">
                                             <input checked={(info.who_are_you === 'partner')} 
                                                onChange={(e) => setInfo({...info, 'who_are_you': 'partner' })}   
                                                type="radio" className="form-check-input" name="optradio"/>
                                             <label className="form-check-label"><img alt='...' src="/images/Press.png"/>Partner or Press
                                             </label>
                                             </div>
                                       </div>
                                    </div>
                                    {errors['who_are_you'] && errors['who_are_you'].length > 0 ? <p className="alert">{errors['who_are_you'][0]}</p> : null}
                                 </div>
                              </div>
                              <div className="col-lg-12 col-12">                              
                                 <div className="form-group">
                                    <textarea value={info.message} 
                                       onChange={(e) => setInfo({...info, 'message': e.target.value })}   
                                       type="text" className="form-control" placeholder="Message" rows="4"/>
                                 </div>
                                 {errors['message'] && errors['message'].length > 0 ? <p className="alert">{errors['message'][0]}</p> : null}
                              </div>
                           </div>
                           <button type="button" className="btn btn-primary" onClick={submit}>
                              {buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>: 'Contact us'}</button>
                           <p>Phone <u>1300 00 GRIN (4746)</u> Email: <u>help@different.com.au</u></p>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="need-help spacing">
            <div className="container">
               <div className="head">
                  <h2>need help?</h2>
               </div>
               <div className="content">
                  <div className="row">
                     <div className="col-lg-3 col-12">
                        <div className="box">
                        <h3>Potential new landlord?</h3>
                        <p>If you have questions we don't cover off on our website then please feel free to ask on live chat.</p>
                        <button type="button" className="btn">Live chat with sales team</button>
                        </div>
                  </div>
                  <div className="col-lg-3 col-12">
                     <div className="box">
                        <h3>I am an existing landlord</h3>
                        <p>You can login to your owner portal or click below to open up live chat with our team.</p>
                        <button type="button" className="btn">Start live chat</button>
                     </div>
                  </div>
                  <div className="col-lg-3 col-12">
                     <div className="box">
                        <h3>I am an existing Tenant</h3>
                        <p>Talk to us through your tenant up or open a live chat here.</p>
                        <button type="button" className="btn">Start live chat</button>
                     </div>
                  </div>
                  <div className="col-lg-3 col-12">
                     <div className="box">
                        <h3>Update on tenancy
                           application?</h3>
                        <p>If you haven't heard from us, don't worry! It can sometimes take up to 5 days for us to determine fit for a tenant with our landlords. We aim to notify both successful and unsuccessful applicants within 5 days.</p>
                        <button type="button" className="btn">Talk to us</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section> 
      <section className="location team-member spacing">
         <div className="container">
         <div className="row">
            <div className="col-lg-6 col-xs-12 d-flex order-2 order-md-1">
               <div className="content">
                  <span>Schedule</span>
                  <h2>Book a time with a team member</h2>
                  <p>We'll meet you when you want. Schedule time with us and we can call you or meet you in person if you prefer.</p>
                  <button type="button" className="btn">Schedule a Meeting</button>
               </div>
            </div>
            
            <div className="col-lg-6 col-xs-12 order-1">
               <div className="content_img">
                  <img alt='...' src="/images/team-member.jpg" className="w-100 img-responsive"/>
               </div>
            </div>
         </div>
         </div>
      </section>
      <section className="map spacing">
         <div className="container">         
            <div className="head">
               <h2>Our Offices</h2>
            </div>
            <div className="row">
               <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="box">
                     <span><img src="/images/map.jpg" alt=""/></span>
                     <h4>Sydney</h4>
                     <ul>
                        <li><b>Phone:</b> 1300 00 GRIN (4746)</li>
                        <li><b>Email:</b> hello@different.com.au</li>
                        <li><b>Address:</b><br />
                           Unit 2, 6a Liverpool St
                           Paddington
                           NSW 2021</li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="box">
                     <span><img src="/images/map.jpg" alt=""/></span>
                     <h4>Melbourne</h4>
                     <ul>
                        <li><b>Phone:</b> 1300 00 GRIN (4746)</li>
                        <li><b>Email:</b> hello@different.com.au</li>
                        <li><b>Address:</b><br />
                           Unit 2, 6a Liverpool St
                           Paddington
                           NSW 2021</li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="box">
                     <span><img src="/images/map.jpg" alt=""/></span>
                     <h4>Brisbane</h4>
                     <ul>
                        <li><b>Phone:</b> 1300 00 GRIN (4746)</li>
                        <li><b>Email:</b> hello@different.com.au</li>
                        <li><b>Address:</b><br />
                           Unit 2, 6a Liverpool St
                           Paddington
                           NSW 2021</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section> 
   </Fragment>
 )   
}


export default Contact