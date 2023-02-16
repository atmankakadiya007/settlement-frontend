import React from 'react'
import { priceFormat } from '../../utils/common'


const InfoWindow = (props) => 
    props.show ?  
        <div className="infowindow">    
            <div className="property_address">
                <p onClick={props.onClick} ><img alt='...' src="/images/locate.png" /> {props.item.address ? props.item.address : null }</p>
            </div> 
            <ul className="price-list">
                <li> 
                    <span className="price-category"> 
                        <img alt='...' src="/images/dollar.png" className="icon-width" /> Projected Price 
                    </span>  
                    <span> {props.item.list_price ? priceFormat(props.item.list_price) : priceFormat(null)}</span> 
                    </li>
                <li> 
                    <span className="price-category"> 
                        <img alt='...' className="icon-width" src="/images/rental-income.png" /> Rental Income 
                    </span>  
                    <span className="price_txt"> {props.item.rental ? priceFormat(props.item.rental) : priceFormat(null)}</span> 
                </li>
                <li> 
                    <span className="price-category"> 
                        <img alt='...' className="icon-width" src="/images/median.png" /> Median Price 
                    </span>  
                    <span> { props.item.median_price ?  priceFormat(props.item.median_price) : priceFormat(null) }</span> 
                </li>
            </ul>
        </div> 
    : null

export default InfoWindow