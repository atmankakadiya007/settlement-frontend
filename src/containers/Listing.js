import React, { useEffect, useState } from 'react'
import AdvancedFilter from '../components/Common/AdvancedFilter'
import { 
	getAllImageIdsOfProperty, 
	getPropertyList, 
	getPropertyCount, 
	fetchSuburb, 
	fetchPostalCodes, 
	addFavorite, 
	checkFavoriteProperty, 
	fetchIdsOfSuburbs
} from '../Apis/property'
import { getFavouriteProperties } from '../Apis/auth'
import { getPropertyHighlights } from '../actions/common'
import ListItem from '../components/Listing/ListItem'
import Pagination from "react-paginate";
import Loader from 'react-loader-spinner'
import PageLoader from 'react-loader-advanced'
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { propertyTypes } from '../constants/data';
import PricePopup from '../components/Modal/PricePopup'
import Marker from '../components/Common/Marker';
import GoogleMapReact from 'google-map-react';
import { homepagehighlights }  from '../constants/data';


function Listing (props) {
	const [ propertyList, setPropertyList] = useState([])
	const [ filters, setFilters] = useState({ 'pageNumber': 1 , 'pageSize': 10 })
	const [ buttonLoading, setButtonLoading] = useState(false)
	const [ loading, setLoading] = useState(false)
	const [ propertyImages, setPropertyImages] = useState([])
	const [ total, setTotal] = useState(0)
	const [ showPrice, openPricePopup] = useState(false)
	const [ suburbs, setSuburbInfo] = useState([])
	const [ postalCodes, setPostalCodes] = useState([])
	const [ centerLoc, setCenter] = useState({
		lat: 20.59,
		lng: 78.96,
	})
	const [ favoriteInfo, setfavoriteInfo] = useState({})
	const [ isFav, setFavorite] = useState({})
	const [ user, setUser] = useState({})
	const [ showInfoWindow, setShowInfoWindow ] = useState(false)
	const [ viewMap, setMapView] = useState(false)
	
	useEffect(() => {
		
		window.scrollTo(0, 0);
		let path = props.location.pathname.split('/')
		props.getHighlights()
		if( path.length === 3){
			setFilters({ ...filters,'highlight_id': path[path.length - 1] })
			getListOfProperty({ 'highlight_id': path[path.length - 1] })
			fetchTotal({ ...filters,'highlight_id': path[path.length - 1] })
		}
		else if(props.location.search){
			let path = props.location.search.substring('1',).split('=')
			setFilters({ ...filters,'property_filter_type': path[path.length - 1] })
			getListOfProperty({ 'property_filter_type': path[path.length - 1] })
			fetchTotal({ ...filters,'property_filter_type': path[path.length - 1] })
		}
		else {
			fetchTotal()
			getListOfProperty(filters)
		}
		setPropertyImages([])
		setSuburbInfo([])
		setPostalCodes([])
		//initMap()
		let info = JSON.parse(sessionStorage.getItem('user'))
		if(info && info.user_information_uuid){
			setUser(info)
			fetchFavourites(info.user_information_uuid)
		}
	}, [])


	const fetchFavourites = (userId) => {
        getFavouriteProperties({ 'user_id' : userId })
            .then(res => 
                {
                    if(res && res.length > 0 ){
                        setfavoriteInfo(res)
						let favs = {}
						res.forEach(item => {
							favs = { ...favs, [item.property_uuid] : true }
						})
						setFavorite(favs)
						setLoading(false)
                    }
                })
    }

	const initMap = () => {
		const loc = {
			lat: propertyList.length > 0 ? parseFloat(propertyList[0].lat) : 20.59,
			lng: propertyList.length > 0 ? parseFloat(propertyList[0].long) : 78.96
		}
		// setCenter(loc)
	}


	const getAllImages = (list) => {
		let imagesArr = [ ...propertyImages ]
		
		list.forEach((element, index) => {
			getAllImageIdsOfProperty({ 'propertyID' : element.property_uuid })
				.then((images) =>  {
					if(images && images.status){
						toast.error(images.data)
					}
					else {
						imagesArr[index] = images 
						setPropertyImages([...imagesArr])
						return images
					}
				})
			})
		
	}

	const getListOfProperty = (data = {} ) => {
		setPropertyList([])
		setLoading(true)

		getPropertyList(data)
			.then(res => {
				console.log(res);
				if(res && res.status){	
					setLoading(false)
				}
				else {
					getAllImages(res)
					//checkFavorite(res)
					setPropertyList(res)
					setLoading(false)
					setButtonLoading(false)
				}
			})
	}

	const test = () => {
		const item = document.querySelector(
			".restore-" + props.location.state.id
		);
		if(item) {
			item.scrollIntoView();
		}
	}

	const search = () => {
		setButtonLoading(true)
		setLoading(true)
		//fetchTotal(filters)
		getListOfProperty(filters)
	};
	
	const goToDetail = (id, loc = {}) => {
		
		let pos = {
			lat: parseFloat(loc.lat), 
			lng: parseFloat(loc.long)
		}

		sessionStorage.setItem('location', JSON.stringify(pos))
		return props.history.push(`/detail/${id}`)
	}


	const getDataOnPageChange = (e) => {
		setFilters({ ...filters , 'pageNumber': e.selected + 1,  'pageSize': 10 })
		getListOfProperty({ ...filters , 'pageNumber': e.selected + 1, 'pageSize': 10 })
	}


	const getTotal = (data) => {
		setFilters(data)
		setButtonLoading(true)
		fetchTotal(data)
	}


	const fetchTotal = (data = {}) => {
		getPropertyCount(data)
			.then(res => {
				if(res && res.status){
					toast.error(res.data)
					setButtonLoading(false)
				}
				else {
					setButtonLoading(false)
					setTotal(res.total)
				}
			})
	}


	const getInfoByState = (data) => {
		fetchSuburb(data)
			.then(res => {
				if(res && res.status){
					toast.error(res.data)
				}
				else {
					setSuburbInfo(res)
				}
			})
		
		fetchPostalCodes(data)
			.then(res => {
				if(res && res.status){
					toast.error(res.data)
				}
				else {
					setPostalCodes(res)
				}
			})
	}

	const pageTotal = ((total%2) === 0) ?  parseInt(total/10) + 1  : parseInt(total/10) + 1  

	const addFav = (propertyID) => {
		setLoading(true)

		addFavorite({ 
			'user_id': user && user.user_information_uuid, 
			'property_id': propertyID })
			.then(res => {
				if(res && res.status){
					toast.error(res.data)
				}
				else {
					setFavorite([])
					fetchFavourites(user.user_information_uuid)
					//toast.success('Favorited Successfully!')
					//checkFavorite(propertyList)
				}
			})
	}

	const checkFavorite = (list) => {
		list.forEach((element, index) => {
			checkFavoriteProperty({ 
				'user_id' : user && user.user_information_uuid, 
				'property_id' : element.property_uuid })
				.then((res) =>  {
					if(res && res.status){
						toast.error(res.data)
					}
					else {
						if(res && res.length > 0 ){
							setFavorite({ ...isFav , [element.property_uuid] : true })
						}
						else {
							setFavorite({ ...isFav , [element.property_uuid] : false })
						} 
						setLoading(false)
						return res && res[0]
					}
				})
			})
	}

	const onChangeSuburb = (name, id) => {
		//setShowInfoWindow(true)
		fetchIdsOfSuburbs({ 'suburb_name': name })
			.then(res => {
				if( res && res.length > 0 ){
					let ids = res.map(item => item.ps_uuid)
					setFilters({ ...filters, 'suburbIds' : [...ids], 'suburb_name': name, "suburb" : id })
				} 
				else {
					//
				}
			})
	}

	return (
		<div className="sticky-search">
			<div className="search-section">
				<div className="container-fluid">
					<div className="row">
						<div className={"col-md-10"}>
							<div className="search-section-inner">
								<div className="search-feild custom_dropdown">
									<input type="text" className="form-control location-field" name="email" value={filters.address} onChange={(e) => getTotal({ ...filters, 'address' : e.target.value })} placeholder="Sydney (CBD), NSW 200" />
									<i className="fa fa-search" aria-hidden="true"></i>
										{/* <GoogleAutocomplete
												autocompletionRequest={{
													componentRestrictions: {
														country: ['us'],
														regions: ['locality', 'sublocality']
													}, 
												}}
												selectProps={{
													onChange: (e) => console.log(e,'test'),
												}}
												apiKey={process.env.REACT_APP_PLACES_KEY}
											/>  */}
										{/* <GoogleAutocomplete
												autocompletionRequest={{
													bounds: [
														{ lat: 50, lng: 50 },
														{ lat: 100, lng: 100 }
													],
													componentRestrictions: {
														country: ['us', 'ca', 'uy'],
													}
												}}
											/> */}
								</div>
								<div className="custom_dropdown">
									<select className="form-control" id="state-filter" width="75px" value={filters.total_bedroom} onChange={e => getTotal({ ...filters, 'total_bedroom' : e.target.value })}>
										<option value={0} className="menu-btn" id="custom">bed</option>
										<option value={1} className="menu-btn" id="custom">1</option>
										<option value={2} className="menu-btn" id="custom">2</option>
										<option value={3} className="menu-btn" id="custom">3</option>
										<option value={4} className="menu-btn" id="custom">4</option>
										<option value={5} className="menu-btn" id="custom">5+</option>
									</select>
									{/* <input type="number" className="menu-btn" id="custom" value={filters.total_bedroom}  placeholder="bed" onChange={(e) => getTotal({ ...filters, 'total_bedroom' : e.target.value })} style={{ width: 60 }} /> */}
								</div>
								<div className="custom_dropdown">
									<select className="form-control" id="state-filter" value={filters.total_bathroom} onChange={e => getTotal({ ...filters, 'total_bathroom' : e.target.value })}>
										<option value={0} className="menu-btn" id="custom">bath</option>
										<option value={1} className="menu-btn" id="custom">1</option>
										<option value={2} className="menu-btn" id="custom">2</option>
										<option value={3} className="menu-btn" id="custom">3</option>
										<option value={4} className="menu-btn" id="custom">4</option>
										<option value={5} className="menu-btn" id="custom">5+</option>
									</select>
									{/* <input type="number" className="menu-btn" id="custom" value={filters.total_bathroom} placeholder="bath" onChange={(e) => getTotal({ ...filters, 'total_bathroom' : e.target.value })} style={{ width: 80 }}/> */}
								</div>

								<div className="custom_dropdown">
									<select className="form-control" value={filters.type} id="state-filter" width="150px" onChange={e => getTotal({ ...filters, 'type' : e.target.value })}>
										<option value="" className="menu-btn" id="custom"> Property Type</option>
										{propertyTypes.map((prop, index)=> <option value={prop} key={index}>{prop}</option>)}
									</select>
									{/* <input className="menu-btn" id="custom" value={filters.type} onChange={(e) => getTotal({ ...filters, 'type' : e.target.value })} placeholder="Property Type" /> */}
								</div>
								<div className="custom_dropdown">
									<button className="menu-btn priceModal" data-toggle="modal" onClick={() => openPricePopup(true)}>Price</button> 
									<button className="menu-btn" data-toggle="modal" data-target="#moreFilters_poup">More Filters</button>			
								<button className="menu-btn search-button" onClick={search}>
								{buttonLoading ? <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>: `Showing ${total} result/s`}</button>
								{/* {Object.keys(filters) && (Object.keys(filters).length > 1) ? 
									<button className="search-button" onClick={}>X</button> : null} */}
								</div>
								</div>
							</div>
							<div className="col-md-2">
								<div className="search-bar-right">
									<a href="#" className={!viewMap ? "active": ''} onClick={() => setMapView(false)}>
										<i className="fa fa-list" aria-hidden="true"></i>
									</a>
									<a href="#" className={ viewMap ? "active": ''} onClick={() => setMapView(true)}>
										<i className="fa fa-map-o" aria-hidden="true"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="division-main">
					<section className={viewMap ? "pt-5 division-box" : " pt-5 division-box w-100"}>
						<div className="division-inner">
							<div className="listing-page">
								<div className="product-grid">
									<div className="container-fluid">
										<div className="directory-header-panel">
											<div className="left-panel">
												<h4>{ filters.highlight_id ? 
													`${homepagehighlights[filters.highlight_id]} property and real estate` 
													: 'Property and real estate' } 
												</h4>
											</div>
										</div>
										<PageLoader show={loading} message={'Fetching properties....'}>
											<div className="row">
												{propertyList && propertyList.length > 0 ? 
												propertyList
												.map((item, index)=> 
													<ListItem
														key={index}
														item={item}
														user={user || {}}
														addFav={addFav}
														goToDetail={goToDetail}
														viewMap={viewMap}
														favorite={isFav[item.property_uuid]}
														propertyImages={propertyImages[index] ||  null}
													/>
												): 	<div className="col-md-12"> 
														<h4>No data found.</h4>
													</div>}
											</div>
										</PageLoader>
									</div>
									{(total > 10 ) ?  <div className="listing-navigation">
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
									</div> : null}
								</div>
							</div>
							<AdvancedFilter 
								search={getListOfProperty}  
								highlights={props.highlights || []}
								suburbs={suburbs || []}
								postalCodes={postalCodes || []}
								getInfoByState={getInfoByState}
								filters={filters}
								setFilters={setFilters}
								fetchTotal={fetchTotal}
								onChangeSuburb={onChangeSuburb}
							/>
							<PricePopup
								show={showPrice}
								onClose={() => openPricePopup(false)}
								setPriceRange={getTotal}
								filters={filters}
							/>
						</div>
					</section>
					{propertyList && propertyList.length > 0 ? 
						viewMap && <div className="map-listing">
							<GoogleMapReact
								onChange={initMap}
								onClick={() => setShowInfoWindow(false)}
								bootstrapURLKeys={{ key : process.env.REACT_APP_G_MAP_KEY }}
								defaultCenter={centerLoc}
								defaultZoom={13}>
									{propertyList.map((item, index) =>
										{
											return(
												<Marker
													property={item}
													propertyID={item.property_uuid}
													goToDetail={goToDetail}
													address={item.address}
													lat={ item.lat ? parseFloat(item.lat) : parseFloat(20.59)} 
													show={showInfoWindow}
													showInfoWindow={setShowInfoWindow}
													lng={ item.lng ? parseFloat(item.long) : parseFloat(78.96) }/>
											)
										} 
									)}
							</GoogleMapReact>
						</div> : null }
				</div>
			</div>
		)
	}


const mapStateToProps = state => ({
	highlights : state.common.highlights
})

const mapDispatchToProps = dispatch => ({
	getHighlights: () => dispatch(getPropertyHighlights())
})


export default connect(mapStateToProps, mapDispatchToProps)(Listing);









