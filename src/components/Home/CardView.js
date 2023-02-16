import React from 'react'
import { Link } from 'react-router-dom'

const CardView = (props) => {
    return (
        <div className="col-md-3 col-12">
            <div className="property-list-item">
                <figure>
                    <div className="info">
                        <span className="sold-out"> sold out </span>
                    </div>
                    <div className="wishlist">
                        <span className="wishlist_icon"> <img alt='...' src="images/heart.png" /> </span>  
                    </div>
                    <div className="property_img_container">
                    <Link to="Detail1" >
                        <img alt='...' src="images/property_listing.png" />  
                        </Link>  
                    </div>
                </figure>
                <div className="property_price">
                    <span>{props.list_price} </span>
                    <span className="property_tag ml-auto">{props.type}</span>    
                </div>
                <div className="property_address">
                    <p><img alt='...' src="images/locate.png"/>{props.address},
                    <span>Sydney NSW</span>
                    </p>
                </div>
                <div className="property_specification">
                    <div className="specification-info">
                        <span> <img alt='...' src="images/bed.png" />{props.total_bedroom} </span> 
                        <span> <img alt='...' src="images/bathroom.png" />{props.total_bathroom}</span> 
                        <span> <img alt='...' src="images/car-parking.png" />{props.total_garage}</span> 
                        <span> <img alt='...' src="images/dimensions%20copy%2027.png"/>{props.total_area} <sup> 2</sup></span> 
                    </div>
                </div>
                <ul className="price-list">
                    <li> <span className="price-category"> <img alt='...' src="images/dollar.png" className="icon-width" />projected price </span>  <span>$520000</span> </li>
                    <li> <span className="price-category"> <img alt='...' className="icon-width" src="images/rental-income.png" /> rental income </span>  <span className="price_txt"> $552,000</span> </li>
                    <li> <span className="price-category"> <img alt='...' className="icon-width" src="images/median.png" />median price </span>  <span> $552,000</span> </li>
                </ul>
            </div>
        </div>
    )
}
export default CardView