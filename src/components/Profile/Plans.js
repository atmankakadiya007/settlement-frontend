import React, { useState } from 'react'
import { priceFormat } from '../../utils/common'

function Plans (props){
   const [selected, setPackage ] = useState(1)

   return(
      <div className="row">
         {props.packages && props.packages.length > 0 ? 
            props.packages.map((pack, index) => <PlanBlock 
               key={index}
               index={index}  
               setPackage={props.setSelectedPlan}
               plan={pack} 
               selected={props.selected}
               hide={props.hideRegister}
               {...props}/>)
         : null}
               
      </div>
    )
}

export default Plans

const PlanBlock = ({ plan, selected, index, setPackage, hide, setShow }) => {
   return (
      <div className="col-lg-3 col-xs-6" onClick={() => setPackage(index)}>
         <div className={(selected === plan.plan_uuid) ? "pricing-section active" : "pricing-section"}>
            {(selected === plan.plan_uuid)  && <strong>best seller</strong>}
            <h6>{plan.plan_name}</h6>
            <span>{priceFormat(plan.amount)}<sub>/mo</sub></span>
            <p>{plan.plan_description}</p>
            <ul>
               <li><i className="fa fa-check"></i> Duration: 5 days</li>
               <li><i className="fa fa-check"></i> 10 Listing</li>
               <li><i className="fa fa-check"></i> Contact Display</li>
               <li><i className="fa fa-check"></i> Price Range</li>
            </ul>
            {(selected === null) ? <button className="btn" onClick={() => setShow(true)}>register now</button> : null}
         </div>
      </div>
   )
}