import React from 'react'


function Banner(props){
    return (
        <section className="banner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <span className="styles-module--tagline--VWro9">AFFORDABLE AND ONLINE PROPERTY SETTLEMENT EXPERT</span>
                        <h1>Future of <span>property buying</span> with just a click away</h1>
                        
                        <p>We get pre-negotiated prices with the best in class finanical brokers, conveyancers, building inspectors and provide you the most affordable 
                            and convenient way of buying a property with just a click of a button. 
                            We understand property buying and settlement can be a very time consuming and stressful.
                            That's where our team coordinate with all the parties i.e. property agents, financial brokers, conveyancer/solicitors, building/pest inpectors through to the settlement 
                            process and even beyond.
                        </p>
                    
                        <div className="hero-button"><a className="btn-lg-pink" onClick={props.open}>How it works?<span onClick={props.open}><img src="images/get-started.png" alt=""/></span></a></div>
                        
                    </div>
                </div>
            </div>
        </section>
        )
 }
export default Banner