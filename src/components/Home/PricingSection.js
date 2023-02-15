import React, { useEffect, useState } from 'react';
import { getPackages } from '../../Apis/auth';
import { useHistory } from 'react-router-dom'
import { priceFormat } from "../../utils/common";

function PricingSection() {
  const redirectPath = useHistory(),
    [investmentData, setInvestmentData] = useState([]),
    [ownData, setOwnData] = useState([]);

  useEffect(() => {
    let componentMounted = true;
    getPackages().then((data) => {
      if (componentMounted) {
        setInvestmentData(data.filter((item) => item.plan_type === 'Investment'));
        setOwnData(data.filter((item) => item.plan_type === 'Own'));
      }
    }).catch((e) => {
      console.log(e.message);
    });

    return () => {
      componentMounted = false;
    }
  }, []);

  const redirectTo = (opt) => {
    redirectPath.push({
      pathname: '/register',
      state: {
        id: opt.id,
      },
    });
  }

  return (
    <div className="container-fluid">
      <ul className="nav nav-pills d-flex justify-content-center mb-4 custom-pricing-tab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="pill" href="#investment">Investment</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="pill" href="#own">Own</a>
        </li>
      </ul>

      <div className="tab-content">
        <div id="investment" className="container tab-pane active">
          <div className="row">
            {
              investmentData.length && investmentData.map((item, index) => {
                return (
                  <div className="col-lg-4 col-xs-6 mb-3" key={index}>
                    <div className={`pricing-section ${index == 1 ? 'active' : ''}`}>
                      <div className='d-flex align-items-center'>
                        {index == 1 ? <strong>best seller</strong> : ''}
                        <h6>{item.plan_name}</h6>
                        <div className="tooltip-custom position-relative d-inline-block ml-2 mb-2">
                          <i className="fa fa-info-circle" style={index == 1 ? { color: 'white' } : { color: 'var(--pink)' }} aria-hidden="true"></i>
                          <span className="tooltiptext">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                        </div>
                      </div>
                      <span>{priceFormat(item.amount)}</span>
                      <p>{item.plan_description}</p>
                      <ul>
                        <li><i className="fa fa-check"></i> Duration: 5 days</li>
                        <li><i className="fa fa-check"></i> 5 Listing</li>
                        <li><i className="fa fa-check"></i> Contact Display</li>
                      </ul>
                      <button className="btn" onClick={() => redirectTo({ id: item.plan_uuid })}>register now</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div id="own" className="container tab-pane">
          <div className="row">
            {
              ownData.length && ownData.map((item, index) => {
                return (
                  <div className="col-lg-4 col-xs-6 mb-3" key={index}>
                    <div className={`pricing-section ${index == 1 ? 'active' : ''}`}>
                      <div className='d-flex align-items-center'>
                        {index == 1 ? <strong>best seller</strong> : ''}
                        <h6>{item.plan_name}</h6>
                        <div className="tooltip-custom position-relative d-inline-block ml-2 mb-2">
                          <i className="fa fa-info-circle" style={index == 1 ? { color: 'white' } : { color: 'var(--pink)' }} aria-hidden="true"></i>
                          <span className="tooltiptext">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                        </div>
                      </div>
                      <span>{priceFormat(item.amount)}</span>
                      <p>{item.plan_description}</p>
                      <ul>
                        <li><i className="fa fa-check"></i> Duration: 5 days</li>
                        <li><i className="fa fa-check"></i> 5 Listing</li>
                        <li><i className="fa fa-check"></i> Contact Display</li>
                      </ul>
                      <button className="btn" onClick={() => redirectTo({ id: item.plan_uuid })}>register now</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingSection
