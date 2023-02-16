import React, { useEffect,useState } from 'react'
import OffersModal from '../components/Modal/OffersModal'
import SignupPlanModal from '../components/Modal/SignupPlanModal'
import Slider from '../components/Detail/DetailPageSlider'
import SuburbStats from '../components/Detail/SuburbStats'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Line } from 'react-chartjs-2';
// import RangeSlider from 'react-rangeslider'
import NeighbourhoodStats from '../components/Detail/NeighbourhoodStats'
import ProjectionView from '../components/Detail/ProjectionView'
import GoogleMapReact from 'google-map-react';
import { 
	getPropertyById, 
	getAllImageIdsOfProperty, 
	getFacilitiesOfProperty, 
	getHighlightsOfProperty, 
	getLocationOfProperty, 
	getProjectionInfo, 
	getProjectionGraphInfo,  
	checkFavoriteProperty, 
	addFavorite, 
	sendPropertyOffers, 
	fetchPropertyOffers, 
	fetchPeopleCountInterested,
	fetchPropertiesByRole,
	deleteProperty,
} from '../Apis/property' ;
import { fetchUserProfile, verifyUserRole, getFavouriteProperties } from '../Apis/auth'
import { getOfferCount } from '../Apis/settings'
import { getPricingPackages } from '../actions/common'
import { connect } from 'react-redux'
import PageLoader from 'react-loader-advanced'
import { toast } from 'react-toastify'
import { priceFormat } from '../utils/common'
import Marker from '../components/Common/Marker'
//import ContactAgentModal from '../components/Modal/ContactAgentModal'
import SocialSharingPopup from '../components/Modal/SocialSharingPopup'
import PricingModal from '../components/Modal/PricingModal'
import LoginModal from '../components/Modal/LoginModal'
import ContactDealerModal from '../components/Modal/ContactDealerModal'

const Detail = props => {
	const [detailItem, setDetailItem] = useState({})
	const [property,setProperty] = useState({})
	const [facilities, setFacilities] = useState([])
	const [highlights, setHighlights] = useState([])
	const [projection, setProjection] = useState([])
 	const [graphData, saveGraphData] = useState({ datasets:[], labels:[] })
	const [loading, setLoading] = useState(false)
	const centerLoc = {
		lat: -33.8744529, 
		lng: 151.2097635
	}
	const [property_images, setImages] = useState([])
	const [range, setRange] = useState(6)
	const [showContact, setShowContact] = useState(false)
	const [isFav, setFav] = useState(false)
	const [user, setUser] = useState({})
	const [openSignup, openSignupModal] = useState(false)
	const [openLogin, openLoginModal] = useState(false)
	const [showSocial, setShowSocial] = useState(false)
	const [offerList, setOfferList] = useState([])
	const [agent, setInfo] = useState({})
	const [offerLimit, saveOfferLimit] = useState(0)
	const [role, setRole] = useState('')
	const [isFavorite, setFavorite] = useState({})
	const [interestedCount, setInterestedCount] = useState(0)
	const [userProfile, saveUserProfile] = useState({})
	const [showOffer, setShowOffer] =  useState(false)
	const [ openPricing, openPricingModal] = useState(false)

	const [ showInfoWindow, setShowInfoWindow ] = useState(false)

	const [isAgentProperty , SetisAgentProperty] = useState([])

	useEffect(() => {
		window.scrollTo(0, 0);
		axiosGet();
		initMap();
		getOffers();
		getOfferLimit();
		let info = JSON.parse(sessionStorage.getItem('user'))
		if(info && info.user_information_uuid){
			setUser(info)
			verifyRole(info.user_information_uuid)
			fetchFavourites(info.user_information_uuid)
			fetchUserDetails(info.user_information_uuid)
			fetchAgentProperties({ 'user_id': info.user_information_uuid })
		}
	},[]);


	const fetchAgentProperties = (data) => {
		fetchPropertiesByRole(data)
		.then((res,err) => {
			if(res && res.length>0){
				let property_uuid_list = [] ;
				res.forEach(item => {
					property_uuid_list.push(item.property_info_uuid)
				})
				SetisAgentProperty(property_uuid_list)
			}
		})
	}


	const fetchFavourites = (userId) => {
        getFavouriteProperties({ 'user_id' : userId })
            .then(res => 
                {
                    if(res && res.length > 0 ){
                        //setfavoriteInfo(res)
						let favs = {}
						res.forEach(item => {
							favs = { ...favs, [item.property_uuid] : true }
						})
						setFavorite(favs)
						setLoading(false)
                    }
                })
    }

	const verifyRole = (id) => {
		verifyUserRole({ 'user_id': id })
			.then(res => {
				setRole(res.user_role_mapping_role)
			})
	}

	const initMap = () => {
		// eslint-disable-next-line no-unused-vars
		let pos = JSON.parse(sessionStorage.getItem('location'))
		// console.log(pos)
		// setCenter(pos)
	}

	const axiosGet = () => {
		setLoading(true)
		const { property_uuid = ''} = props.match.params
		
		getPropertyById({ 'propertyID': property_uuid })
			.then((res, index)=> {
				if( res && res.response ){
					toast.error(res.response)
				}
				else {
					getPropertyInfo(res[0])
					checkFav(property_uuid)
				}
			})
		fetchInterested(property_uuid)
	}


	const fetchInterested = (id) => {
		fetchPeopleCountInterested({ 'property_id': id })
			.then( res => {
				if(res.TOTAL > 0 ){
					setInterestedCount(res.TOTAL)
				}
			})
	}

	const fetchUserDetails = (id) => {
        fetchUserProfile({ 'user_id' : id })
            .then(res => {
                if(res && res.status){
                    toast.error(res.response)
                }
                else {
                    saveUserProfile(res[0])
                }
            })            
    }

	const getOffers = () => {
		const { property_uuid = ''} = props.match.params

		fetchPropertyOffers({ 'property_id': property_uuid })
			.then((res, index)=> {
				if( res && res.response ){
					toast.error(res.response)
				}
				else {
					//let filtered = res && res.filter(offer => )
					setOfferList(res)
				}
			})
	}


	const sendPropertyOffer = (data) => {
		fetchUserProfile({ 'user_id': user && user.user_information_uuid })
			.then(res => {
				if(res && res.status){
					toast.error(res.response)
				}
				else {
					//setInfo(res[0])
					if( res[0] && res[0].plan_uuid !== null){
						sendPropertyOffers({...data, 
							'user_id': user.user_information_uuid, 
							'customerEmail': user.user_information_email_address,
							'property_id': props.match.params.property_uuid })
								.then(res => {
									if(res.message === 'saved'){
										toast.success('Offer sent successfully!')
										getOffers()
									}
								})
					}
					else {
						toast.error('Please buy a plan to send an offer.')
					}
				}
			})  
		
		
	}

	const getOfferLimit = () => {
		getOfferCount()
			.then(res => saveOfferLimit(res.sns_setting_no_of_offers))
	}

	const getPropertyInfo = (existing) => {
		const { property_uuid } = props.match.params
		let info = { ...existing }
		
		getAllImageIdsOfProperty({ 'propertyID': property_uuid })
			.then(images  => {
				if(images && images.status){
					toast.error(images.data)
				}
				else {
					setImages(images)
				}
			})
		
		getFacilitiesOfProperty({ 'propertyID': property_uuid })
			.then(facilities  => {
				if(facilities && facilities.status){
					toast.error(facilities.data)
				}
				else {
					setFacilities(facilities)
				}
			})

		getHighlightsOfProperty({ 'propertyID': property_uuid }) 
			.then(highlights  => {
				if(highlights && highlights.status){
					toast.error(highlights.data)
				}
				else {
					setHighlights(highlights)
					//setDetailItem({ ...existing , ...detailItem, 'highlights': highlights })
				}
			})

		getLocationOfProperty({ 'locationID' : info.property_info_location})
			.then(location  => {
				if(location){
					setDetailItem({ ...existing , ...detailItem, 'location': location })
					// getAgentProfile(info.user_information_uuid)
					setProperty({
						list_price : existing ? existing.property_info_list_price : null ,
						rental : existing ? existing.property_info_rental : null ,
						median_price : existing ? existing.property_info_median_price : null ,
						address : location[0] ? location[0].master_location_street_address  : null ,
					})
				}
				else {
					toast.error(location)
				}
			})

			//getProjectionInfo({ "suburb": "YES", "property_type": "CONDO", "state": "Illinois" } )
		getProjectionInfo({ "suburb": info.suburb, "property_type": info.property_info_type, "state": info.state } )	
			.then(projection  => {
				if(projection && projection.status){
					toast.error(projection.data)
				}
				else if(projection && projection.length > 0 ){
					setProjection(projection)
					getProjectionGraphInfo({ 'projectionID': projection[0].pp_uuid })
						.then(projectionGraph => {
							if(projectionGraph && projectionGraph.status){
								toast.error(projectionGraph.data)
							}
							else {
								updateGraphInfo(projectionGraph)
							}
						})
				}
				else {
					setLoading(false)
				}
		})				
	}


	const openRegister = () => {
		openSignupModal(true)
		openLoginModal(false)
	}


	// eslint-disable-next-line no-unused-vars
	const getAgentProfile = (id) => {
		fetchUserProfile({ 'user_id': id })
			.then(res => {
				if(res && res.status){
					toast.error(res.response)
				}
				else {
					setInfo(res[0])
				}
			})  
	}

	 
	const scrolldiv = (tab) =>  { 
		let splitted = tab.split(' ')
		if(splitted.length > 1) {
			let scrollP =  splitted.join('-')
			window.scrollTo(0, findPosition(document.getElementById(scrollP.toLowerCase()))); 
		}
		else {
			window.scrollTo(0, findPosition(document.getElementById(tab.toLowerCase())));
		} 
	}

	const findPosition = (obj) => { 
		var currenttop = 0; 
		if (obj.offsetParent) { 
			do { 
				currenttop += obj.offsetTop; 
			} while ((obj = obj.offsetParent)); 
			return [currenttop]; 
		} 
	} 


	const updateGraphInfo = (graph_info) => {
		let labels = [], rental = [], price = [] , median_price = []
		if(graph_info && graph_info.length > 0 ){
			graph_info.forEach((graph, index) => {
				labels.push(graph.pp_year)
				rental.push(graph.pp_rental) 
				price.push(graph.pp_price) 
				median_price.push(graph.pp_median_price)
			})
		}
		
		let lineChartData = {
			labels: labels,
			datasets: [
				{	
					label: 'Rental',
					data: rental,
					fill: false,
					borderColor: '#ff385c', 
					borderDash: [8], 
					pointStyle : 'circle', 
					radius: 5, 
					backgroundColor: '#ff385c'
				},
				{
					label: 'Price',
					data: price,
					fill: false,
					borderColor: "#000",
					pointStyle : 'circle', 
					radius: 5, 
					backgroundColor: '#000'
				}, 
				{
					label: 'Median Price',
					data: median_price,
					fill: false,
					pointStyle : 'circle', 
					radius: 5, 
					lineTension: 0.4
				}
			]
		}

		saveGraphData(lineChartData)
		setLoading(false)
	}


	const addItemToFav = (id) => {
		setLoading(true)
		addFavorite({ 
			'user_id' : user && user.user_information_uuid, 
			'property_id' : id })
				.then(res => {
					if(res && res.status){
						toast.error(res.data)
					}
					else {
						//checkFav(id)
						props.history.push('/my_favorites')
					}
				})
	}


	const checkFav = (id) => {
		checkFavoriteProperty({ 
			'user_id' : user && user.user_information_uuid, 
			'property_id' : id })
				.then(response => {
					if( response && response.status){
						toast.error(response.data)
					}
					else {
						if( response && response.length > 0){
							setFav(true)
						}
						else {
							setFav(false)
						}
						setLoading(false)
					}
				})
	}
	
	const goToEdit = (id) => {
		console.log(id, "id")
		props.history.push(`/manage_property/${id}`)
	}

	const onDelete = (id) => {
		const data = {
			'property_id' : id ,
			'user_id' : user && user.user_information_uuid ,
		}
		// let ans = window.confirm('Do You want to delete this property ?')
		// if(ans){
			deleteProperty(data)
			.then((res) => {
				if(res && res.affectedRows) 
				{
					toast.success('Property Deleted Successfully!')
					props.history.push('/')
				}
			})
			.catch((err) => {
				toast.error('Unable to Delete Property!')
			})
		// }
		// else toast.error('Unable to Delete Property!')
	}

	const goToDetail = (id, loc = {}) => {
		
		let pos = {
			lat: parseFloat(loc.lat), 
			lng: parseFloat(loc.long)
		}

		sessionStorage.setItem('location', JSON.stringify(pos))
		return props.history.push(`/detail/${id}`)
	}

	const tabs = [ 
		'Description', 
		'Facilities', 
		'Highlights', 
		'Location', 
		'Suburb', 
		'Projection', 
		'Investor View', 
		'Expert View', 
		'Facts'
	]

	const circleStyles = {
		textSize: '16px',
		pathColor: `#ff385c`,
		textColor: '#000',
		trailColor: '#D3D3D3',
		backgroundColor: '#ff385c'
	}

	const horizontalLabels = {
		3: '3 Year Valuation',
		6: '6 Year Valuation',
		9: '9 Year Valuation', 
		12: '12 Year Valuation'
	}

	// eslint-disable-next-line no-mixed-operators
	const dsrScore = projection && projection.length && projection[0].dsr_score  || 0
	// eslint-disable-next-line no-mixed-operators
	const renters = projection && projection.length && projection[0].renters || 0


	const calculatePer = (value, per) => {
		return parseFloat((value * per)/100)
	}

	const growth = projection && projection.length && calculatePer(detailItem.property_info_list_price, projection[0].rental_yield)
	const cash = projection && projection.length && calculatePer(detailItem.property_info_rental, projection[0].rental_yield)

	return (
		<PageLoader show={loading} message={'Fetching....'}>
			<section id="banner" className="detail-banner">
           		<div className="container-fluid">
					{/* eslint-disable-next-line no-mixed-operators */}
					{/* <Slider images={property_images.length && property_images || []}/> */}
				</div>
       		</section>
       		 
			   	<section className="my-3">
					<div className="container-fluid">
						<div className="detail-page-share-btn d-flex justify-content-end mb-3">
							{(user && user.user_information_uuid && user.role === 'AGENT' && isAgentProperty.includes(detailItem.property_info_uuid)) ? 
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								<a onClick={() => onDelete(props.match.params.property_uuid)} 
									className="btn btn-outline-secondary white-btn border">
										<i className="ri-delete-bin-5-fill"> </i> Delete
								</a> 
								: null
							}
							{(user && user.user_information_uuid && user.role === 'AGENT' && isAgentProperty.includes(detailItem.property_info_uuid)) ? 
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								<a onClick={() => goToEdit(props.match.params.property_uuid)} 
									className="btn btn-outline-secondary white-btn border">
										<i className="ri-edit-2-fill"> </i> Edit
								</a> 
								: null
							}
							{user && user.user_information_uuid ? 
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								<a href="#" 
									className="btn btn-outline-secondary white-btn border" 
									onClick={() => setShowSocial(true)}> 
									<img src="/images/share_icon.png" alt="..."/> 
									<span>Share </span> 
								</a> 
								: null
							}
							{user && user.user_information_uuid ? 
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								<a className="btn btn-outline-secondary white-btn border" 
									onClick={() => addItemToFav(detailItem.property_info_uuid)}> 
									{isFavorite[detailItem.property_info_uuid] ? 
										<img src="/images/fill-heart.png" alt="..."/> 
										: <img src="/images/heart.png" alt="..."/>
									} 
									<span >Save </span> 
								</a> : null
							}
						</div>
						<div className="detail-page-tabs">
							<ul className="detail-tabs-heading d-flex">
								{tabs.map((tab, index) =>  
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
									<li key={index} onClick={() => scrolldiv(tab)}><a >{tab}</a></li> )}       
							</ul>
						</div>
					</div>
				</section>

       		<div className="inner-detail-main">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-8">
							<div className="detail_spec">
								<div className="property_address">
									<p><img alt='...' src="/images/locate.png"/>
									{/* {detailItem.location && detailItem.location[0].master_location_street_address} */}
									<span>{detailItem.location && detailItem.location[0] && detailItem.location[0].master_location_country}</span>
									</p>
								</div>
								<div className="property_specification">
									<div className="specification-info">
										<span> <img alt='...' src="/images/bed.png"/> {detailItem.property_info_bedroom}</span> 
										<span> <img alt='...' src="/images/bathroom.png"/>  {detailItem.property_info_bathroom}</span> 
										<span> <img alt='...' src="/images/car-parking.png"/> {detailItem.property_info_garage} </span> 
										<span> <img alt='...' src="/images/dimensions%20copy%2027.png"/> {detailItem.property_info_land_size}m <sup> 2</sup></span> 
									</div>
								</div>
								{(interestedCount > 0) && <p className="people_inter"><img alt='...' src="/images/person.png"/>There are {interestedCount} people interested in this property.</p>}
							</div>
							<div className="detail_description">
							
								<h3 id="description">Description</h3>
								<div dangerouslySetInnerHTML={{__html: detailItem.property_info_desc}} />
							</div>
							<div  className="detail_facilities">
								<h3 id="facilities" >Facilities</h3>
								<ul>
									{ facilities && facilities.length > 0 ? 
										facilities.map(( fac, index) => {
										return  <li key={index}><img alt='...' src ={`/${fac.master_facility_icon}`}/>{fac.master_facility_label}</li>
									}) : null}
								</ul>
							</div>
							<div className="detail_facilities">
								<h3 id="highlights">Property Highlights</h3>
								<ul>      
									{ highlights && highlights.length > 0 ? 
										highlights.map(( fac, index) => {
											return  <li key={index}> <img alt='...' src={"/images/red-tick.png"} /> {fac.master_highlight_label}</li>
										})
									: null} 
								</ul>
							</div>
							<div className="detail_location">
								<h3 id="location">Locations</h3>
								<div style={{ height: '40vh', width: '100%' }}>
									<GoogleMapReact
										onClick={() => setShowInfoWindow(false)}
										bootstrapURLKeys={{ key : process.env.REACT_APP_G_MAP_KEY }}
										defaultCenter={centerLoc}
										defaultZoom={13}>
											<Marker  
												propertyID={detailItem.property_info_uuid}
												property = {property}
												goToDetail={goToDetail}
												address={(detailItem.location && detailItem.location[0]) ? 
													detailItem.location[0].master_location_street_addres
													: null }
												show={showInfoWindow}
												showInfoWindow={setShowInfoWindow}
												lat={detailItem.property_lat ? detailItem.property_lat : -33.8744529} 
												lng={detailItem.property_long ? detailItem.property_long : 151.2097635}/>
									</GoogleMapReact>
								</div>
									
									{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6855965.144012862!2d-103.20188533379515!3d32.960533141061525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1603282826929!5m2!1sen!2sin" width="100%" height="200" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
								<br/>
								<h3>More details for Google API</h3>
								<ul>
									<li>- 1.2 kms from Train station.</li>
									<li>- 500 mtrs from Shoping Center.</li>
									<li>- 1.2 kms from bus stop.</li>
									<li>- 500 mtrs from school.</li>
								</ul>
								<div className="loca-50">
									<h3>Primary School</h3>
									<ul>               
										<li className="fullwidth">- Suffers Primary School 1.2kms away</li>
										<li className="fullwidth">- Suffers Primary School 1.2kms away</li>
									</ul>
								</div>
								<div className="loca-50">
									<h3>Secondary School</h3>
									<ul>
										<li className="fullwidth">- State hogh School 2.5 away</li>
										<li className="fullwidth">- Rouse high School 2.8kms away</li>
									</ul>
								</div>
							</div> 
							<div className="suburb_profile">
								<h3 id="suburb">Suburb profile</h3>
								<h6 className="median_prof">Median Price</h6>
								<p className="median_price">{priceFormat(detailItem.property_info_median_price)}</p>
								{/* <div className="suburb-img">
									<img src="/images/rating-d.png"/>
								</div> */}
								<div>
									<SuburbStats data={projection && projection[0] }/>
								</div>
								<div className="dsr_block">
									<h4>DSR SCORE <span>(10 YRS)</span></h4>
									{/* <img src="/images/dsr-6.png"/> */}
									<CircularProgressbar  className={'circle-progress'} styles={buildStyles(circleStyles)} value={dsrScore} text={`${dsrScore}%`}/> <b style={{marginLeft:'10px'}}>p.a</b>
								</div>
								<div className="dsr_block">
									<h4>RENTERS % <span>(5 yrs)</span></h4>
									{/* <img src="/images/dsr-8.png"/> */}
									<CircularProgressbar className={'circle-progress'} styles={buildStyles(circleStyles)} value={renters} text={`${renters}%`} /> <b style={{marginLeft:'10px'}}>p.a</b>
								</div>
							</div>
							<div className="projection_detail">
								<h3 id="projection">Projection</h3>
								<div className="suburb-img">
									{/* <img src="/images/graph.png"/> */}
									<Line data={graphData} />
								</div>
							</div> 
							<div className="investor_view box-shadow">
								<h3 id="investor-view">Investor's View <span className="more_det">More Details<span className="fa fa-chevron-right" aria-hidden="true"></span></span></h3>
								<div className="inver_block">
									<div className="inve_btn_block">
										<div className="inve_inner_b">
											<h6>Property Price</h6>
											<a>{priceFormat(detailItem.property_info_list_price)}</a>
										</div>
										<div className="inve_inner_b">
											<h6>rental per year</h6>
											<a>{priceFormat(detailItem.property_info_rental)}</a>
										</div>
									</div>
									<div className="inver_price">
										<h4>Total Growth<span>{priceFormat(growth * range)}</span></h4>
									</div>
									<div className="inver_price">
										<h4>Total Cash<span>{priceFormat(cash * range)}</span></h4>
									</div>
									{/* <img src="/images/in_slider.png"/> */}
									{/* <RangeSlider
										className="range-slider"
										value={range}
										onChange={setRange} 
										labels={horizontalLabels} 
										min={3} 
										step={3}
										max={12}/> */}
								</div>
								<p className="subj_calu"><img src="/images/subject.png"/> "subject to calculation, <a href="#">click here</a> to know more"</p>
							</div> 
							<div className="neighbour_insights box-shadow">
								<h3>Neighbourhood Insights</h3>
									<p className="iner_text">A little bit about who lives locally as provided by government</p>
									{/* <img src="/images/neigroi.png"/> */}
									<NeighbourhoodStats projection={projection && projection[0]}/>		
							</div>
							<div className="experts_view box-shadow">
								<h3 id="expert-view">Our Experts Views</h3>
								<ul className="expert_ul">
									<li><img alt='...' src="/images/indoor-game.png"/>High Yield</li>
									<li><img alt='...' src="/images/security.png"/>Great Value</li>
									<li><img alt='...' src="/images/parking.png"/>Capital Growth</li>
									<li><img alt='...' src="/images/swimming.png"/>Low Price</li>
									<li><img alt='...' src="/images/children.png"/>Unrent Tenants</li>
								</ul>
								<h6 className="our_desc">Description</h6>
								<p className="our_desc_iner_text">{detailItem.expert_description}</p>
							</div>
							<div className="add_facts box-shadow">
								<h3 id="facts">Additional Facts</h3>
								<div className="row">
									{(detailItem.property_info_area_flood !== null) &&
									 <div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Area Flood:</h6>
											<a  className={detailItem.property_info_area_flood === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a  className={detailItem.property_info_area_flood === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_info_council_issues !== null) &&
									<div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Council Issues:</h6>
											<a className={detailItem.property_info_council_issues === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a className={detailItem.property_info_council_issues === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_near_city !== null) &&
									<div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Near City:</h6>
											<a className={detailItem.property_near_city === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a className={detailItem.property_near_city === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_near_school !== null) &&
									<div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Near School:</h6>
											<a  className={detailItem.property_near_school === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a  className={detailItem.property_near_school === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_near_beach !== null) &&
									<div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Near Beach:</h6>
											<a className={detailItem.property_near_beach === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a className={detailItem.property_near_beach === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_info_good_neighbourhood !== null) &&
									<div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Good Neighbourhood:</h6>
											<a className={detailItem.property_info_good_neighbourhood === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a className={detailItem.property_info_good_neighbourhood === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_near_subdivide !== null) &&
									 <div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Subdivide Potential:</h6>
											<a  className={detailItem.property_near_subdivide=== 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a  className={detailItem.property_near_subdivide === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_near_granny !== null) &&
									 <div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Granny Potential:</h6>
											<a  className={detailItem.property_near_granny === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a  className={detailItem.property_near_granny === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
									{(detailItem.property_near_transport !== null) &&
									 <div className="col-6 col-md-6">
										<div className="add_ac_block">
											<h6 className="">Near Transport:</h6>
											<a  className={detailItem.property_near_transport === 'YES' ? "btn_r" : "btn_w" }>Yes</a>
											<a  className={detailItem.property_near_transport === 'NO' ? "btn_r" : "btn_w" }>No</a>
										</div>
									</div>}
								</div>
							</div>
						<div className="box-shadow detail_spec" id="Comparable">
							<h3>Recent Comparable Sales</h3>
							<div className="comparable_box">
								<div className="comparable_img">
									<img src="/images/locate.png"/>
								</div>
								<div className="property_specification">
									<h5>{priceFormat(450000)}</h5>
									<div className="specification-info">
										<span> <img src="/images/bed.png"/>{detailItem.property_info_bedroom} </span> 
										<span> <img src="/images/bathroom.png"/> {detailItem.property_info_bathroom}</span> 
										<span> <img src="/images/car-parking.png"/> {detailItem.property_info_garage}</span> 
										<span> <img src="/images/dimensions%20copy%2027.png"/> {detailItem.property_info_land_size}m <sup> 2</sup></span> 
									</div>
								</div>
							</div>
							<div className="comparable_box">
								<div className="comparable_img">
									<img src="/images/locate.png"/>
								</div>
								<div className="property_specification">
									<h5>{priceFormat(250000)}</h5>
									<div className="specification-info">
										<span> <img src="/images/bed.png"/> {detailItem.property_info_bedroom} </span> 
										<span> <img src="/images/bathroom.png"/> {detailItem.property_info_bathroom} </span> 
										<span> <img src="/images/car-parking.png"/> {detailItem.property_info_garage}</span> 
										<span> <img src="/images/dimensions%20copy%2027.png"/> {detailItem.property_info_land_size}m <sup> 2</sup></span> 
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-12">
						<div className="right_side">
							<div className="rigt_price">
								<p>List Price:</p>
								<h6>{priceFormat(detailItem.property_info_list_price)}</h6>
							</div>
							<div className="rigt_price">
								<p>Median Price :</p>
								<h6>{priceFormat(detailItem.property_info_median_price)}</h6>
							</div>
							<div className="hr"></div>
							<div className="rigt_price">
								<p>Equity Amount :</p>
								<h6>{priceFormat(detailItem.property_info_median_price - detailItem.property_info_list_price)}</h6>
							</div>
							<div className="rigt_price">
								<p>Rental Yield :</p>
								{/* <img className="" src="/images/red5.png"/> */}
								<h6>{projection && projection.length && projection[0].rental_yield}%</h6>
							</div>
							<div className="rigt_price">
								<p>Long term growth :{}</p>
								{/* <img className="" src="/images/red6.png"/> */}
								<h6>{detailItem.property_info_long_term_growth}%</h6>
							</div>	
							<div className="hr"></div>
							<h2 className="pro_head">Projection (in 10yrs)</h2>
							{/* <img className="" src="/images/cash_inc.png"/> */}
							<ProjectionView info={detailItem}  projection={projection && projection.length && projection[0]}/>
							<div className="cont_ag">
								{detailItem.user_information_uuid  != null ? 
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
									<a  className={"btnc_r"} onClick={() => setShowContact(true)}>Contact Agent</a>
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
									: <a  className={"btnc_w"} style={{ margin : 0 }} >Contact Agent</a>}		
								{user && user.user_information_uuid ? 
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
									<a  data-toggle="modal"  onClick={() => setShowOffer(true)} data-target="#offerModal" className="btnc_r" style={{ marginLeft : 10 }}>{(role === 'AGENT') ? 'View' : 'Send'} Offer</a>
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
									:<a 
										data-toggle="modal" 
										onClick={() => openLoginModal(true)} 
										className="btnc_w">
											{(role === 'AGENT') ? 'View' : 'Send'} Offer
										</a>
								}
								<OffersModal 
									show={showOffer}
									onClose={() => setShowOffer(false)}
									userId={user && user.user_information_uuid}
									property={detailItem}
									offerList={offerList}
									offerLimit={offerLimit}
									role={role}
									sendPropertyOffer={sendPropertyOffer}
								/>
							</div>
							<h2 className="pro_head">Unlock Data</h2>
							{user && user.user_information_uuid ?
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								<a  data-toggle="modal" className="btn_red" onClick={() => openPricingModal(true)}>Signup Plan</a>
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								: <a  data-toggle="modal" className="btn_red" onClick={() => openLoginModal(true)}>Signup Plan</a>}
							<SignupPlanModal show={openSignup} onClose={() => openSignupModal(false)}/>
							<PricingModal open={openPricing} onClose={() => openPricingModal(false)} fetchUserDetails={fetchUserDetails} userProfile={userProfile}
								user={user} getPackages={props.getPackages} packages={props.packages}/>
							<LoginModal open={openLogin} onClose={() => openLoginModal(false)} openRegister={openRegister}/>
						</div>
					</div>
				</div>
			</div>
			{/* <ContactAgent show={showContact} agent={agent} onClose={() => setShowContact(false)}/> */}
			<ContactDealerModal open={showContact} agent={agent} onClose={() => setShowContact(false)}/> 
			{/* <ContactAgentModal show={showContact} onClose={() => setShowContact(false)}/> */}
			<SocialSharingPopup
				propertyId={detailItem.property_uuid} 
				show={showSocial} onClose={() => setShowSocial(false)}/>		
		</div>
	</PageLoader>
)}






   


const mapStateToProps = state => ({
    packages : state.common.packages 
  })
  
const mapDispatchToProps = dispatch => ({
    getPackages: () => dispatch(getPricingPackages())
})  

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
