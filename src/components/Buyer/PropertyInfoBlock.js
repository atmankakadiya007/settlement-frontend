import React from 'react'
import { priceFormat } from '../../utils/common'

function PropertyInfoBlock (props){

    const viewDetail = () => {
        if(props.showDetail){
            props.goToDetail(props.item.property_uuid)
        }
        else {
            if(props.item.property_offers_uuid) {
                props.goToDetail(props.item.property_offers_uuid)
            }
        }
    }
    
    return(
        <div className="row">
            <div className="col-lg-12">
                <div className="property-tab-list" onClick={props.goToDetail ? viewDetail : ()=>{} }>
                    <div className="offer">
                        <p>january 12, 2020</p>{props.item && props.item.current_status ? <span> {props.item && props.item.current_status}</span> : null}
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="box head">
                                <h6>{props.item && props.item.address || '2054 kent street'}</h6>
                                <span>{props.item && props.item.state || 'test'}<p className="badge">{props.item && props.item.type || 'test'}</p></span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box amenitie">
                                <ul>
                                    <li><span><img src="/images/bed.png" alt=""/></span><p>{props.item && props.item.total_bedroom ||'4'}</p></li>
                                    <li><span><img src="/images/bathroom.png" alt=""/></span><p>{props.item && props.item.total_bathroom ||'2'}</p></li>
                                    <li><span><img src="/images/car-parking.png" alt=""/></span><p>{props.item && props.item.total_garage ||'1'}</p></li>
                                    <li><span><img src="/images/dimensions%20copy%2027.png" alt=""/></span><p>{props.item && props.item.total_area || 4800}m <sup>2</sup></p></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box price d-flex flex-direction-column">
                                <div className="w-100">
                                    <h5>list price</h5>
                                    <span>{ props.item ? priceFormat(props.item.property_price) : 'N/A'}</span>
                                </div>
                                {!props.showDetail ? <div className="w-100">
                                    <h5>offer price</h5>
                                    <span>{props.item ? priceFormat(props.item.property_offers_price) : 'N/A'}</span>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyInfoBlock