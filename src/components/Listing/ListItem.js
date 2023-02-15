import React, { useEffect, useState, Fragment } from 'react'
import { API_URL } from '../../constants/api'
import { priceFormat } from '../../utils/common'

function ListItem (props) {
    const [ image, setImage] = useState({})
    useEffect(() => {
        if((props.propertyImages != null) && (props.propertyImages.length > 0)){
            setImage(props.propertyImages[0])
        }
        
    }, [props.propertyImages])

    const { hide = false, user = {} } = props
    const propertyType = (props.item.type) && (props.item.type).split("_").join(" ")
    
    return(    
        <Fragment>
            <div className={props.viewMap ? "col-md-6" : "col-md-3"}>
                <div className="property-list-item">
                    <figure>
                        <div className="info">
                            <span className="sold-out"> sold out </span>
                        </div>
                        {user && user.user_information_uuid ? <div className="wishlist">
                            <span className="wishlist_icon" onClick={() => props.addFav(props.item.property_uuid)}> {props.favorite ? <img alt='...' src="/images/fill-heart.png" /> : <img alt='...' src="/images/heart.png" /> }</span>
                        </div> : null }
                        <div className="property_img_container" onClick={() => props.goToDetail(props.item.property_uuid, props.item)}>
                            { (image != null) && (image.master_document_uuid !== undefined) ? 
                                <img src= {(API_URL + `property/renderImage?documentID=${image.master_document_uuid}`)} alt="property-pic" /> 
                            : <img alt='...' src={"/images/noimg.png"} /> }
                        </div>
                    </figure>
                    <div className="property_price">
                        <span>{priceFormat(props.item.list_price)} </span>
                        <span className="property_tag ml-auto"> {propertyType}  </span>
                    </div>
                    <div className="property_address">
                        {!props.hide ?  <p><img alt='...' src="/images/locate.png" /> {props.item.address}</p> : (props.offers && props.offers.length > 0 )? <p>`Sent Offers: ${props.offers.length}`</p> : 0 }
                    </div>  
                    <div className="property_specification">
                        <div className="specification-info">
                            <span> <img alt='...' src="/images/bed.png" /> {props.item.total_bedroom} </span>
                            <span> <img alt='...' src="/images/bathroom.png" /> {props.item.total_bathroom}</span>
                            <span> <img alt='...' src="/images/car-parking.png" /> {props.item.total_garage}</span>
                            <span> <img alt='...' src="/images/dimensions%20copy%2027.png" /> {props.item.total_area} m <sup> 2</sup></span>
                        </div>
                    </div>
                    <ul className="price-list">
                        <li> <span className="price-category"> <img alt='...' src="/images/dollar.png" className="icon-width" /> Projected Price </span>  <span> {priceFormat(props.item.list_price)}</span> </li>
                        <li> <span className="price-category"> <img alt='...' className="icon-width" src="/images/rental-income.png" /> Rental Income </span>  <span className="price_txt"> {priceFormat(props.item.rental)}</span> </li>
                        <li> <span className="price-category"> <img alt='...' className="icon-width" src="/images/median.png" /> Median Price </span>  <span> {priceFormat(props.item.median_price)}</span> </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default ListItem;