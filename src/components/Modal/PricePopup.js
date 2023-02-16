import React from 'react'
import Slider from 'react-rangeslider'
import Modal from 'react-responsive-modal'
import { priceFormat } from '../../utils/common'


function PricePopup (props) {
    return( 
        <Modal open={props.show} onClose={props.onClose} center>
            <div className="modal-header">
            <h5 className="modal-title" id="pricingModalLabel">price range</h5>
            <p>Lorem ipsum is dummy text.</p>
            </div>
            <div className={"price-popup"}>
                <h6>Min Price(0) - {props.filters.price_range > 0 ? priceFormat(props.filters.price_range): 'Max'}</h6>
                {/* <p>The list price is {props.filters.price_range > 0 ? priceFormat(props.filters.price_range): ''}</p> */}
                <div className="price-range-modal">
                <Slider
                    className={'price-slider'}
                    min={0}
                    max={100000}
                    value={props.filters.price_range}
                    onChange={e => props.setPriceRange({ ...props.filters, 'price_range': e })}
                    orientation='horizontal'
                />
                </div>
            </div>
        </Modal>
    )    
}

export default PricePopup