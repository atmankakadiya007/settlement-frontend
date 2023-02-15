import React from 'react'
import ListItem from '../Listing/ListItem'
import ViewButton from '../Common/ViewButton'
import { Link } from 'react-router-dom'


function MostView(props){
    //console.log(props, "Most view")
    
    const goToDetail = (id, loc = {}) => {
		
		let pos = {
			lat: parseFloat(loc.lat), 
			lng: parseFloat(loc.long)
		}

		sessionStorage.setItem('location', JSON.stringify(pos))
		return props.history.push(`/detail/${id}`)
	}

    return (
        <section className="product-grid">
            <div className="container-fluid">
               <div className="directory-header-panel">
                  <div className="left-panel">
                     <h4>{props.title} </h4>
                  </div>
                  <ViewButton redirect={`/search?property_filter_type=${props.searchText}`}/>
               </div>
               <div className="container-fluid text-center">
                    <div className="row mx-auto my-auto">
                        <div className="row">
                            <div className="col-12">
                                <a className="carousel-control-prev text-dark" href="#myCarousel2" role="button" data-slide="prev">
                                    <span className="fa fa-chevron-left" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </div>
                        </div>
                        <div id="myCarousel2" data-interval="false" className="carousel slide w-100" data-ride="carousel">
                            <div className="carousel-inner" role="listbox">
                                {props.properties && (props.properties.length > 0) ?  
                                    <div className="carousel-item active">
                                        <div className="row">   
                                            { props.properties.map((data,index) => 
                                                <ListItem
                                                    key = {index}
                                                    user={{}}
                                                    addFav={() => {}}
                                                    goToDetail={goToDetail}
                                                    viewMap={false}
                                                    favorite={false}
                                                    propertyImages={props.propertyImages || null} 
                                                    item={data}
                                                />)}
                                        </div>
                                    </div>  : <p>No property available.</p>}
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12">
                                <a className="carousel-control-next text-dark" href="#myCarousel2" role="button" data-slide="next">
                                    <span className="fa fa-chevron-right" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
 }
export default MostView


// eslint-disable-next-line no-unused-vars
const MostViewedCard = ({ item, index }) => {
    return (
        <div className="col-md-4">
            <div className="property-list-item">
                <figure>
                    <div className="info">
                        <span className="sold-out"> sold out </span>
                    </div>
                    <div className="wishlist">
                        <span className="wishlist_icon"> <img alt='...' src="images/heart.png" /> </span>  
                    </div>
                    <div className="property_img_container">
                        <Link to={'/search'} >
                            <img alt='...' src="images/property_listing.png" />  
                        </Link>  
                    </div>
                </figure>
                <div className="property_price">
                    <span>{item.list_price} </span>
                    <span className="property_tag ml-auto"> {item.type}  </span>    
                </div>
                <div className="property_address">
                    <p><img alt='...' src="images/locate.png" /> {item.address}</p>
                </div>
                <div className="property_specification">
                    <div className="specification-info">
                        <span> <img alt='...' src="images/bed.png" />{item.total_bedroom} </span> 
                        <span> <img alt='...' src="images/bathroom.png" />{item.total_bathroom}</span> 
                        <span> <img alt='...' src="images/car-parking.png" />{item.total_garage}</span> 
                        <span> <img alt='...' src="images/dimensions%20copy%2027.png" />{item.total_area} <sup> 2</sup></span> 
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