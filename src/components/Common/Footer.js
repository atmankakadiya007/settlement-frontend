import React, { useState } from 'react'
import Modal from '../Modal/LoginModal'
import SignupModal from '../Modal/SignupPlanModal'

function Footer(){
   const [ showLogin, openLoginModal ] = useState(false)
   const [ showSignup, openSignupModal ] = useState(false) 

   const openRegister = () => {
      openSignupModal(true)
      openLoginModal(false)
   }

   return (
      <footer className="footer-section">
         <div className="container-fluid">
            <div className="row">
               <div className="col-md-3 col-12">
                  <div className="content-section">
                     <h3><a href="/about"> About Us</a></h3>
                     <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                     <a href="#" className="btn agent-btn" data-toggle="modal" onClick={() => openLoginModal(true)} data-target="#loginModal"> Agent Login <img src="images/logout.png"/> </a>  
                     <Modal 
                        open={showLogin} 
                        onClose={() => openLoginModal(false)} 
                        openRegister={openRegister} />   
                  </div>
               </div>
               <div className="col-md-3 col-12">
                  <div className="content-section">
                     <h3><a href="/"> Quick Links </a></h3>
                     <ul className="links">
                        <li><a href="/about"> About us</a> </li>
                        <li><a href=""> Terms & Condition</a> </li>
                        <li><a href="">Teams</a> </li>
                        <li><a href="">Careers</a> </li>
                     </ul>
                  </div>
               </div>
               <div className="col-md-3 col-12">
                  <div className="content-section">
                     <h3><a href="/contact"> Contact Us </a></h3>
                     <div className="locate">
                        <p>  Fields Way House
                           Bondi Beach , NSW , 2026
                        </p>
                        <p>United States
                           +1 444-000-0000
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-md-3 col-12">
                  <div className="content-section">
                     <h3>  Follow Us  </h3>
                     <div className="social-links"> 
                        <a href=""> <img src="/images/iconfinder_FB_1217112.png"/> </a>
                        <a href=""> <img src="/images/iconfinder_40-google-plus_104464.png"/> </a>
                        <a href=""> <img src="/images/iconfinder_38-instagram_104466.png"/> </a>
                        {/* <a href=""> <img src="/images/twitter.png"/> </a> */}
                     </div>
                     <div className="suscribe mt-4">
                        <h3>  Subscribe </h3>
                        <form className="subscribe_form">
                           <div className="input-group">
                              <input type="text" className="form-control" name="email" placeholder="Enter your email"/>
                              <span className="input-group-btn">
                              <button className="btn btn-default" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                              </span>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         <div className="row">
            <div className="copyryt">
               <p> Copyright © 2021. All rights reserved. </p>
            </div>
         </div>
      </div>
      <SignupModal  
         show={showSignup} onClose={() => openSignupModal(false)} />
   </footer>
   )
 }
export default Footer