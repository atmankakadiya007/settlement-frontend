import React, { useEffect } from 'react'
import Modal from 'react-responsive-modal'
import { priceFormat } from '../../utils/common'
import moment from 'moment'

function ViewOffers (props) {
    const { offerList = [] } = props
    let ifAccepted = (offerList && offerList.length > 0) ? 
        offerList.filter(offer => (offer.is_accepted === 'Yes')) 
        : []

    useEffect(()=> {
        // console.log('value changed');
    },[props])

    return( 
        <Modal open={props.show} onClose={props.onClose} center>
            <div className="modal-header">
                <h5 className="modal-title" id="pricingModalLabel">Offers Available</h5>
            </div>
            <div className="modal-body">
                <div className="offer-section">
                    <div className="offer-list"> 
                        <ul>
                            {offerList.length > 0 ? offerList.map((offer, index) => {
                                return(
                                    <li key={index}>
                                        <div className="row">
                                            <div className="col-lg-4 col-7">
                                                <span>{`Offer ${index + 1}`} <p>sent on <i className="fa fa-check"></i></p></span>
                                            </div>
                                            <div className="col-lg-2 col-5">
                                                <p>{moment(offer.property_offers_created_date).format('MM/DD/YYYY')}</p>
                                            </div>
                                            <div className="col-lg-3 col-12">
                                                <span>{priceFormat(offer.property_offers_price)}</span>
                                            </div>
                                            <div className="col-lg-3 col-12">
                                                { !(ifAccepted.length > 0) && (offer.is_rejected === 'No') ? 
                                                        <button disabled={(offer.is_accepted === 'Yes')} 
                                                            className="btn green_btn left-button" 
                                                            onClick={() => props.accept(offer.property_offers_uuid)}>
                                                            {(offer.is_accepted === 'Yes') ? 'Accepted' : 'Accept'}
                                                        </button> 
                                                    : (offer.is_accepted === 'Yes') && 
                                                        <button disabled={true} className="btn green_btn left-button" >
                                                            {(offer.is_accepted === 'Yes') && 'Accepted'}
                                                        </button>
                                                }
                                                {!(ifAccepted.length > 0) && (offer.is_accepted === 'No') ? 
                                                    <button 
                                                        disabled={(offer.is_rejected === 'Yes')} 
                                                        className="btn red_btn" 
                                                        onClick={() => props.reject(offer.property_offers_uuid)}>
                                                        {(offer.is_rejected === 'Yes') ? 'Rejected' : 'Reject'}
                                                    </button> 
                                                    : (offer.is_rejected === 'Yes') && <button disabled={true} className="btn red_btn" >{(offer.is_rejected === 'Yes') && 'Rejected'}</button>}
                                            </div>
                                            
                                        </div>

                                    </li>
                                )
                            }) : <li>Available offers may be rejected.</li>}
                        </ul> 
                        
                        
                    </div>  
                </div>         
            </div>
        </Modal>
    )    
}

export default ViewOffers 