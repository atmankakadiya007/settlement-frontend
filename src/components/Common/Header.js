import React, { useState, useEffect } from 'react'
import { logOut } from '../../utils/api'
import Modal from '../Modal/LoginModal'
import { useSelector, useDispatch } from 'react-redux';
import { changeLoggedInStatus } from '../../actions/common';
import SignupModal from '../Modal/SignupPlanModal';
import { useHistory } from 'react-router-dom';

function Header (props) {
  const redirectPath = useHistory();
  const isUserLoggedIn = useSelector(state => state.common.isUserLoggedIn);
  const dispatch = useDispatch();
  const [ showLogin, openLoginModal ] = useState(false);
  const [ loggedIn, setLoggedIn] = useState(false);
  const [ showSignup, openSignupModal ] = useState(false);
  const [ role, setRole ] = useState('');
  const [ show, toggle ] = useState(false);
  const [ user, setUser ] = useState({});

  useEffect(() => {
    let info = JSON.parse(sessionStorage.getItem('user'))
    if(info && info.user_information_uuid){
      setLoggedIn(true)
      setRole(info.role)
      setUser(info)
    }
  }, [showLogin, showSignup, isUserLoggedIn])
  
  const clicklogOut = () => {
    setLoggedIn(false)
    logOut()
    dispatch(changeLoggedInStatus());
    window.location = "/"
  } 

  const openRegister = () => {
    // openSignupModal(true)
    redirectPath.push({
      pathname:'/'
    })
    openLoginModal(false)
  }

  const goToFavourites = () => {
    if(role === 'AGENT'){
      window.location = '/agent_dashboard'
    }
  }

  return (
	    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <a className="navbar-brand" href="/"><img src="/images/logo.png" alt=""/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              {
                !loggedIn && <React.Fragment>
                    <li className="nav-item ">
                      <a className="nav-link"  href="/about">About us <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/How_it_works">How It Works</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/contact">Contact Us</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/pricing" >Pricing</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/faq">FAQs</a>
                    </li>
                  </React.Fragment>
              }
               {/* <li className="nav-item ">
                      <a className="nav-link"  href="/about">About us <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/How_it_works">How It Works</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/contact">Contact Us</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/pricing" >Pricing</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/faq">FAQs</a>
                    </li> */}
              {/* <PricingModal packages={props.packages} hideRegister={false}/> */}
              <li className="nav-item">
                {!loggedIn && <a className="nav-link loginBtn" onClick={() => openLoginModal(true)}>LOGIN</a>}
              </li>

              {loggedIn ? <li className="nav-item"> 
                  <div className="dropdown nav-dropdown">
                    <button onClick={ () => toggle(!show)} 
                      className="btn btn-primary dropdown-toggle nav-dropdown-btn" 
                      type="button" data-toggle="dropdown" 
                      aria-haspopup="true" aria-expanded={show}>
                        {
                          (user && user.user_information_uuid ) ? 
                            (user.user_information_fullname !== '') ? 
                              user.user_information_fullname 
                              : (user.role !== '' ) ? 
                                'LoggedIn '+user.role 
                                : 'LoggedIn User'  
                            : 'Logged In User'
                        }
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="/user_profile">Profile</a></li>
                      {(loggedIn && (role !== 'AGENT')) && <li><a href="/property_status_view">Property Status</a></li>}
                      {(loggedIn && ((role === 'AGENT') || (role === 'CUSTOMER'))) &&  <li><a href="/search"> All Properties</a></li>}
                      {(loggedIn && (role === 'CUSTOMER'))&&  <li><a href="/buyer_property_list">Property/Offer List</a></li>}
                      {(loggedIn && (role === 'AGENT')) &&  <li>
                        <a href="/agent_dashboard" onClick={goToFavourites}>Dashboard</a>
                      </li>}
                      {(loggedIn && (role === 'AGENT')) && <li>
                        <a href="/manage_property">Manage Property</a>
                      </li>}  
                      <li><a onClick={clicklogOut}>Logout</a></li>  
                    </ul>
									</div>
                </li> : null}
              </ul>
              <Modal getPackages={props.getPackages}
                open={showLogin} 
                onClose={
                  () => openLoginModal(false)} 
                  openRegister={openRegister} 
                packages={props.packages}/>
              <SignupModal  getPackages={props.getPackages}
                show={showSignup} onClose={() => openSignupModal(false)} packages={props.packages}/>
            
          </div>
        </nav>
 )   
}


export default Header