import React, { useState, useEffect, Fragment } from 'react'
import { 
    getAllImageIdsOfProperty,   
    fetchPropertiesByRole, 
	fetchPropertyOffers, 
    getPropertyById
} from '../Apis/property'
import { acceptOffer, rejectOffer } from '../Apis/buyer'
import { toast } from 'react-toastify'
import PageLoader from 'react-loader-advanced'
import { API_URL } from '../constants/api'
import { priceFormat } from '../utils/common'
import ViewOffers from '../components/Modal/ViewOffers'
import Pagination from "react-paginate";

function AgentDashboard (props){
    const [isAlter,setIsAlter] = useState(false)
    const [propertyList, savePropertyList] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [property_images, setPropertyImages] = useState({})
    const [loading, setLoading] = useState(false)
    const [showOffer, showOfferModal] = useState(false)
    const [offerViewedList, setOfferViewed] = useState('')
	const [ filters, setFilters] = useState({ 'pageNumber': 1 , 'pageSize': 10 })
	const [ total, setTotal] = useState(0)

    useEffect (() => {
        let info = JSON.parse(sessionStorage.getItem('user'))
        if(info && info.user_information_uuid){
            setUserInfo(info)
            //verifyRole(info.user_information_uuid)
            fetchAgentProperties({ ...filters , 'user_id': info.user_information_uuid })
            // fetchPropertiesByRole({'user_id': info.user_information_uuid }).then(res => setTotal(res.length))
        }
    }, [])

    // useEffect(() => {
    //     let info = JSON.parse(sessionStorage.getItem('user'))
    //     if(info && info.user_information_uuid){
    //         fetchAgentProperties({ ...filters , 'user_id': info.user_information_uuid })
    //     }
    // },[filters])

   
    const getAllProperties = (properties) => {
       properties.forEach((element, index) => {
            getAllImageIdsOfProperty({ 'propertyID': element.property_info_uuid })
                .then((images) =>  {
                    if(images && images.status){
                        toast.error(images.data)
                        setLoading(false)
                    }
                    else {             
                        property_images[element.property_info_uuid] = images
                        setPropertyImages(property_images)
                        setLoading(false)
                        return property_images
                    }
                })
        })
	}

    const fetchPropertiesById = async (properties) => {
        let temp = []
        
        await properties.forEach((element, index) => {
            getPropertyById({ 'propertyID': element.property_info_uuid })
                .then((property)=> {
                    if( property && property.response ){
                        toast.error(property.response)
                        setLoading(false)
                    }
                    else {

                        getAllImageIdsOfProperty({ 'propertyID': element.property_info_uuid })
                            .then((images) =>  {
                                if(images && images.status){
                                    toast.error(images.data)
                                    setLoading(false)
                                }
                                else {             
                                    // propertyList.push({
                                    //     ...property[0], 
                                    //     'address' : element.address, 
                                    //     'images' : images 
                                    // })
                                    // property_images[element.property_info_uuid] = images
                                    // setPropertyImages(property_images)
                                    // setLoading(false)
                                    // return property_images
                                    fetchPropertyOffers({ 'property_id': element.property_info_uuid })
                                        .then((res, index)=> {
                                            if( res && res.response ){
                                                toast.error(res.response)
                                                setLoading(false)
                                            }
                                            else { 
                                                temp.push({
                                                    ...property[0], 
                                                    'address' : element.address, 
                                                    'images': images,
                                                    'offers': res 
                                                })  
                                                setLoading(false)          
                                                // offerList[element.property_info_uuid] = res 
                                                // setOfferList(offerList)
                                                // return offerList
                                         
                                                savePropertyList([...temp])
                                            }
                                        })
                                    
                                }
                            })

                        
                                           
                        
                       // return [...propertyList]
                    }
                })
        })
        
    }

    const fetchAgentProperties = (data) => {
        setLoading(true)
        fetchPropertiesByRole({...filters , ...data})
            .then(res => {
                if(res && res.length > 0 ){
                    fetchPropertiesById(res)
                    // getOffers(res)
                    getAllProperties(res)   
                }
                else {
                    setLoading(false)
                }
            })
    }

    const goToDetail = (id, loc = {}) => {
		let pos = {
			lat: parseFloat(loc.lat), 
			lng: parseFloat(loc.long)
		}
		
        sessionStorage.setItem('location', JSON.stringify(pos))
		return props.history.push(`/detail/${id}`)
	}

    const viewOffersModal = (offers) => {
        let list = [...offers] || []
        setOfferViewed(list)
        showOfferModal(true)
    }


    const accept = (id) => {
        acceptOffer({ 'offer_uuid' : id })
            .then(res => {
                fetchAgentProperties({ 'user_id' : userInfo && userInfo.user_information_uuid })
                showOfferModal(false)
                setIsAlter(!isAlter)
            })
    }

    const reject = (id) => {
        rejectOffer({ 'offer_uuid': id })
            .then(res => {
                showOfferModal(false)
                fetchAgentProperties({ 'user_id' : userInfo && userInfo.user_information_uuid })
                
            })
    }

    const goToOfferDetail = (id) => {
        props.history.push(`/buyer_dashboard/${id}`)
    }

    // const getDataOnPageChange = (e) => {
	// 	setFilters({ ...filters , 'pageNumber': e.selected + 1,  'pageSize': 10 })
	// }

	// const pageTotal = ((total%2) === 0) ?  parseInt(total/10) + 1  : parseInt(total/10) + 1  

    // console.log(pageTotal , total , propertyList)

    return (
        <div>
            <div className="product-grid">
                <div className="container-fluid">
                    <div className="directory-header-panel">
                        <div className="left-panel">
                            <h4>Properties List</h4>
                        </div>
                    </div>
                    <PageLoader show={loading} message={'Fetching....'}>
                        <div className="row">
                            {propertyList && propertyList.length > 0 ? 
                                 propertyList.map((item, index) => 
                                    <ItemBlock
                                        key={index}
                                        item={item}
                                        addFav={() => {}}
                                        goToDetail={goToDetail}
                                        favorite={() => {}}
                                        hide={true}
                                        viewOffersModal={viewOffersModal}
                                        images={property_images[item.property_info_uuid] || null}
                                    />):	
                                    <div className="col-md-12 text-center"> 
                                        <h4>No data found.</h4>
                                    </div>}
                        </div>
                    </PageLoader>
                    {/* {(total > 10 ) ?  <div className="listing-navigation">
                        <div className="container">
                            <div className="d-flex pagination-box">
                                <Pagination
                                    activePage={filters.pageNumber}
                                    pageCount={pageTotal}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={getDataOnPageChange}
                                />
                            </div> 
                        </div>
                    </div> : null} */}
                </div>
            </div>
            <ViewOffers 
                show={showOffer} 
                accept={accept}
                
                reject={reject}
                goToOfferDetail={goToOfferDetail}
                onClose={() => showOfferModal(false)}
                viewOffersModal={viewOffersModal}
                offerList={offerViewedList}
            />
        </div>
    )
}

export default AgentDashboard



const ItemBlock = (props) => {
    const propertyType = (props.item.property_info_type) && (props.item.property_info_type).split("_").join(" ")
    return(<Fragment>
            <div className="col-md-6">
                <div className="property-list-item">
                    <figure>
                        <div className="info">
                            <span className="sold-out"> sold out </span>
                        </div>
                        <div className="wishlist">
                            {/* <span className="wishlist_icon" onClick={() => props.addFav(props.item.property_uuid)}> {props.favorite ? <img src="/images/fill-heart.png" /> : <img src="/images/heart.png" /> }</span> */}
                        </div>
                        <div className="property_img_container" onClick={() => props.goToDetail(props.item.property_info_uuid, props.item)}>
                            { (props.item.images != null) && ( props.item.images[0] !== undefined )&&  (props.item.images[0].master_document_uuid !== undefined) ? 
                                <img src= {(API_URL + `property/renderImage?documentID=${props.item.images[0].master_document_uuid}`)} alt="property-pic" /> 
                            : <div style={{ backgroundColor: "white" }}>
                                    <img alt='...' className="center" src={"/images/noimg.png"}/>
                                </div> }
                        </div>
                    </figure>
                    <div className="property_price">
                        <span>{priceFormat(props.item.property_info_list_price)} </span>
                        <span className="property_tag ml-auto"> {propertyType}  </span>
                    </div>
                    <div className="property_address">
                        <p><img alt='...' src="/images/locate.png" /> {props.item.address}</p>
                    </div>
                    <div className="property_address">
                        {(props.item.offers && props.item.offers.length > 0 )? 
                            <p className="offer-link-text" onClick={() => props.viewOffersModal(props.item.offers)}><img alt='...' src="/images/offer.png" /> Sent Offers: {props.item.offers.length}</p> :  <p>No Offer available. </p>}
                    </div>  
                    <div className="property_specification">
                        <div className="specification-info">
                            <span> <img alt='...' src="/images/bed.png" /> {props.item.property_info_bedroom} </span>
                            <span> <img alt='...' src="/images/bathroom.png" /> {props.item.property_info_bathroom}</span>
                            <span> <img alt='...' src="/images/car-parking.png" /> {props.item.property_info_garage}</span>
                            <span> <img alt='...' src="/images/dimensions%20copy%2027.png" /> {props.item.property_info_land_size} m <sup> 2</sup></span>
                        </div>
                    </div>
                    <ul className="price-list">
                        <li> <span className="price-category"> <img alt='...' src="/images/dollar.png" className="icon-width" /> Projected Price </span>  <span> {priceFormat(props.item.property_info_list_price)}</span> </li>
                        <li> <span className="price-category"> <img alt='...' className="icon-width" src="/images/rental-income.png" /> Rental Income </span>  <span className="price_txt"> {priceFormat(props.item.property_info_rental)}</span> </li>
                        <li> <span className="price-category"> <img alt='...' className="icon-width" src="/images/median.png" /> Median Price </span>  <span> {priceFormat(props.item.property_info_median_price)}</span> </li>
                    </ul>
                </div>
            </div>
    </Fragment>)
}