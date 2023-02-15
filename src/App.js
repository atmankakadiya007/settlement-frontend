import React, { useEffect, useState } from 'react';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Routes from './Routes'
import Notification from './components/Common/Notification'
import { getPricingPackages } from './actions/common';
import { connect } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

function App(props) {
  useEffect(() => {
    props.getPackages();
  }, [])

  return (
    <>
      <Elements stripe={stripePromise}>
        <Header packages={props.packages} getPackages={props.getPackages} />
        <div className="route-box">
          <Routes packages={props.packages} />
        </div>
       <Footer packages={props.packages} getPackages={props.getPackages} />
      </Elements>
      <Notification />
    </>
  )
}

const mapStateToProps = state => ({
  packages: state.common.packages,
})

const mapDispatchToProps = dispatch => ({
  getPackages: () => dispatch(getPricingPackages())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);