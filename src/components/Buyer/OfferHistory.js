import React from 'react'
import { priceFormat } from '../../utils/common'

export default function OfferHistory (props) {
    return (
        <React.Fragment>
            <table className="table">
                <thead className="thead-1">
                    <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">List Price</th>
                        <th scope="col">Offer Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign : 'center' }}>
                        {props.propertyOffers.map((item,index)=>{
                            return ( 
                                <OfferItem key={index}
                                    offer = {item}
                                    index = {index}>
                                </OfferItem>
                            )
                        }) }
                </tbody>
            </table>
        </React.Fragment>
    )
}

const OfferItem = (props) =>{
    return ( 
        <tr>
            <td>{(props.index + 1)}</td>
            <td>{priceFormat(props.offer.property_price)}</td>
            <td>{priceFormat(props.offer.property_offers_price)}</td>
            <td>{props.offer.current_status}</td>
        </tr>
    )
}