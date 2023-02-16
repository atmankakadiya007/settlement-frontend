import React, { useEffect } from 'react'
import Slider from 'react-rangeslider';
import { states, propertyTypes } from '../../constants/data'

const active = '#64c3ef'
const inactive = '#dbdbdb'

function AdvancedFilter (props){
	//const [filters, setFilters] = useState(props.filters)
	const { filters } = props

	const setFilters = (data) => {
		props.setFilters(data)
	}


	useEffect(() => {
		props.setFilters({
			...props.filters,
			'near_top_school': 'No', 
			'near_transport': 'No', 
			'near_beach': 'No', 
			'near_city': 'No', 
			'granny_potential':'No',
			'subdivide_potential': 'No'
		})
	}, [])


	const fetchSuburbsAndPostalCodes = (data) => {
		setFilters(data)
		props.getInfoByState({ "state" : data.state })

	}

	const progress = filters && ((filters.price/300) * 100 + '%')

	const styleInput = {
		background: `linear-gradient(90deg, ${active} 0% ${progress}%, ${inactive} ${progress}% 100%)`,
	}


	const searchProperty = () => {
		props.fetchTotal(filters)
		props.search(filters) 	
		// setFilters({
		// 	'near_top_school': 'No', 
		// 	'near_transport': 'No', 
		// 	'near_beach': 'No', 
		// 	'near_city': 'No', 
		// 	'granny_potential':'No',
		// 	'subdivide_potential': 'No'
		// })
		document.getElementById('cancel-btn').click()
	}

	const changeSuburb = (id) => {
		if(props.suburbs && props.suburbs.length > 0 ){
			let selected = props.suburbs.find(item => (item.ps_uuid === id))
			//setFilters({ ...filters, 'suburb': id, 'suburb_name': selected.suburb })
			props.onChangeSuburb(selected.suburb, id )
		}
	}
    
	return (
      	<div className="custom_dropdown">     
			{/* <button className="menu-btn" data-toggle="modal" data-target="#moreFilters_poup">More Filters</button> */}
            <div className="modal fade" id="moreFilters_poup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      			<div className="modal-dialog modal-dialog-centered" role="document">
        			<div className="modal-content">					   
        				<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">More Filters</h5>
							<div className="cross_btn_filter">
								<button id="cancel-btn" type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</div>
          				<div className="modal-body">
							<form className="more_filter_form">
								<div className="filter-block">
									<div className="filter-block-left">
										<label className="dropdown-advance-search-title">Bedrooms</label>
										{/* <div className="input-group">
											<input type="number" id="quantity" name="quantity" className="gurv"  value={filters.total_bedroom} onChange={(e) => setFilters({...filters, 'total_bedroom' : e.target.value })} min={200} max={400}/>
										</div> */}
										<select className="form-control" id="state-filter" width="75px" value={filters.total_bedroom} onChange={e => setFilters({ ...filters, 'total_bedroom' : e.target.value })}>
											<option value={0} className="menu-btn" id="custom">bed</option>
											<option value={1} className="menu-btn" id="custom">1</option>
											<option value={2} className="menu-btn" id="custom">2</option>
											<option value={3} className="menu-btn" id="custom">3</option>
											<option value={4} className="menu-btn" id="custom">4</option>
											<option value={5} className="menu-btn" id="custom">5+</option>
										</select>
									</div> 
                					<div className="filter-block-right">
										<label className="dropdown-advance-search-title">State</label>
										<select className="form-control" id="state-filter" onChange={e => fetchSuburbsAndPostalCodes({ ...filters, 'state' : e.target.value })}>
											<option value="">Select State</option>
											{states.map((state,index) => <option key={index} value={state}>{state}</option>)}		
										</select>    
									</div> 
								</div> 
              					<div className="filter-block">
									<div className="filter-block-left">
										<label className="dropdown-advance-search-title">Bathrooms</label>
										{/* <div className="input-group">
											<input type="number" id="quantity" name="quantity" className="gurv" value={filters.total_bathroom} onChange={(e) => setFilters({ ...filters, 'total_bathroom': e.target.value })}  min={1} max={100}/>
										</div> */}
										<select className="form-control" id="state-filter" width="75px" value={filters.total_bathroom} onChange={e => setFilters({ ...filters, 'total_bathroom' : e.target.value })}>
											<option value={0} className="menu-btn" id="custom">bath</option>
											<option value={1} className="menu-btn" id="custom">1</option>
											<option value={2} className="menu-btn" id="custom">2</option>
											<option value={3} className="menu-btn" id="custom">3</option>
											<option value={4} className="menu-btn" id="custom">4</option>
											<option value={5} className="menu-btn" id="custom">5+</option>
										</select>
									</div> 
									{props.suburbs && props.suburbs.length > 0 ?  
										<div className="filter-block-right">
											<label className="dropdown-advance-search-title">Suburb</label>
											<select value={filters.suburb} className="form-control" id="state-filter" onChange={e => changeSuburb(e.target.value)}>
												<option value="">Select Suburb</option>
												{props.suburbs.map(prop => <option value={prop.ps_uuid} >{prop.suburb}</option>)}
											</select>    
										</div> : null} 
                				</div>
                				<div className="filter-block">
									<div className="filter-block-left">
										<label className="dropdown-advance-search-title">Garage</label>
										{/* <div className="input-group">
											<input type="text" id="quantity" name="quantity" className="gurv" value={filters.total_garage} onChange={(e) => setFilters({...filters, 'total_garage': e.target.value })} min={1} max={100}/>
										</div> */}
										<select className="form-control" id="state-filter" width="75px" value={filters.garage} onChange={e => setFilters({ ...filters, 'garage' : e.target.value })}>
											<option value={0} className="menu-btn" id="custom">garage</option>
											<option value={1} className="menu-btn" id="custom">1</option>
											<option value={2} className="menu-btn" id="custom">2</option>
											<option value={3} className="menu-btn" id="custom">3</option>
											<option value={4} className="menu-btn" id="custom">4</option>
											<option value={5} className="menu-btn" id="custom">5+</option>
										</select>
									</div> 
									{props.postalCodes && props.postalCodes.length > 0 ? 
										<div className="filter-block-right">
											<label className="dropdown-advance-search-title">Postal Code</label>
											{/* <div className="input-group">
												<input type="text" id="quantity" name="quantity" style={{ width: '100%' }} value={filters.postcode} onChange={(e) => setFilters({...filters, 'postcode': e.target.value })} min={1} max={999999}/>
											</div> */}
											<select className="form-control" id="state-filter" onChange={e => setFilters({ ...filters, 'postcode' : e.target.value })}>
												<option value="">Postal Code</option>
												{props.postalCodes.map(prop => <option value={prop.pc_uuid}>{` ${prop.suburb} (${prop.postcode})`}</option>)}
										</select>
									</div>  : null}
								</div>
								
								<div className="filter-block">
									<div className="filter-block-left">	
										<label className="dropdown-advance-search-title">Property Type</label>
										<select className="form-control"  value={filters.type} id="state-filter" onChange={e => setFilters({ ...filters, 'type' : e.target.value })}>
											<option value="">Select Property</option>
											{propertyTypes.map((prop,index) => <option key={index} value={prop}>{prop}</option>)}
										
										</select>  
									</div>
								</div>
								<div className="filter-block">
									<div className="filter-block-left">
										<label className="dropdown-advance-search-title">Price Range</label>
										<Slider
											min={0}
											max={100000}
											value={filters.price_range}
											onChange={e => setFilters({ ...filters, 'price_range': e })}
											orientation='horizontal'
											style={styleInput}
										/>
										<label className="slide-val">Price: $
											<input type="text"  id="amount1" value={filters.price_range} className="slide-val" readOnly style={{ width:60 }}/>
										</label>
									</div>
									<div className="filter-block-right">
										<label className="dropdown-advance-search-title">Year Built</label>
										<input value={filters.year_built} onChange={(e) => setFilters({ ...filters, 'year_built': e.target.value })}
											type="text" id="recipient-name" className="form-control" placeholder="Year Built"/> 
									</div> 
              						<div className="filter-block">
										<div className="filter-block-left">
											<label className="dropdown-advance-search-title">Property Highlights</label>
											<select value={filters.highlight_id} className="form-control" id="state-filter" onChange={e => setFilters({ ...filters, 'highlight_id' : e.target.value })}>
												<option value="">Select highlight</option>
												{props.highlights  && (props.highlights.length > 0)?
													props.highlights.map((data,index) => <option key={index} value={data.master_highlight_id}>{data.master_highlight_label}</option>) : null}		
										</select> 
										</div> 
										<div className="filter-block-right">
											<label className="dropdown-advance-search-title">Land Size</label>
											<input value={filters.land_size} onChange={(e) => setFilters({...filters, 'land_size': e.target.value }) }
												type="text" className="form-control" id="recipient-name" placeholder="Land Size"/> 
										</div> 
									</div> 
									<div className="filter-hr"></div>
									<div className="filter-block">
										<div className="filter-block-left">
											<label className="dropdown-advance-search-title">Rental Income(Yearly)</label>
											<Slider
												min={0}
												max={5000}
												value={filters.rental_income}
												onChange={(e) => setFilters({...filters, 'rental_income' : e })}
												orientation='horizontal'
												style={styleInput}
											/>
											<label className="slide-val">Rental Income: $
												<input type="text"  id="amount1" value={filters.rental_income} className="slide-val" readOnly style={{ width:60 }}/>
											</label>
										</div> 
                						<div className="filter-block-right">
											<label className="dropdown-advance-search-title" id="">Project Growth(%)</label>
											<Slider
												min={0}
												max={100}
												value={filters.project_growth}
												onChange={e => setFilters({...filters, 'project_growth': e })}
												orientation='horizontal'
												style={styleInput}
											/>
											<label className="slide-val">Growth: 
												<input type="text"  id="amount1" value={filters.project_growth} className="slide-val" readOnly style={{ width:60 }}/>%
											</label>
										</div>
              							<div className="filter-block">
											<div className="filter-block-left">
												<label className="dropdown-advance-search-title">Median Price</label>	
												<Slider
													min={0}
													max={5000}
													value={filters.median_price}
													onChange={e => setFilters({...filters, 'median_price': e })}
													orientation='horizontal'
													style={styleInput}
												/>
												<label className="slide-val">Median Price: $
													<input type="text"  id="amount1" value={filters.median_price} className="slide-val" readOnly style={{ width:60 }}/>
												</label>
											</div>
											<div className="filter-block-right">
												<label className="dropdown-advance-search-title">Underlist Price</label>		
												<Slider
													min={0}
													max={5000}
													value={filters.underlist_price}
													onChange={(e) => setFilters({ ...filters, 'underlist_price' : e })}
													orientation='horizontal'
													style={styleInput}
												/>
												<label className="slide-val">Underlist Price: $
													<input type="text"  id="amount1" value={filters.underlist_price} className="slide-val" readOnly style={{width:60 }}/>
												</label>
											</div>
							
											<div className="filter-block">
												<div className="filter-block-left">
													<label className="dropdown-advance-search-title">Near Top School</label>
													<div className="filter-checkbox">
														<span className="no_val">No</span>
														<label className="switch">
															<input type="checkbox" checked={(filters.near_top_school === 'YES')} onChange={(e) => setFilters({...filters, 'near_top_school': e.target.checked  ? 'YES' : 'NO' })}/>
															<span className="slider round"></span>
														</label>
														<span className="no_val">Yes</span>
													</div> 
												</div>
							
												<div className="filter-block-right">
													<label className="dropdown-advance-search-title">Near Transport</label>
													<div className="filter-checkbox">
														<span className="no_val">No</span>
														<label className="switch">
															<input type="checkbox" checked={(filters.near_transport === 'YES')} onChange={(e) => setFilters({...filters, 'near_transport': e.target.checked  ? 'YES' : 'NO' })}/>
															<span className="slider round"></span>
														</label>
														<span className="no_val">Yes</span>
													</div> 
												</div> 
							
												<div className="filter-block">
													<div className="filter-block-left">
														<label className="dropdown-advance-search-title">Near Beach</label>
														<div className="filter-checkbox">
															<span className="no_val">No</span>
															<label className="switch">
																<input type="checkbox" checked={(filters.near_beach === 'YES')} onChange={(e) => setFilters({...filters, 'near_beach': e.target.checked ? 'YES' : 'NO'})}/>
																<span className="slider round"></span>
															</label>
															<span className="no_val">Yes</span>
														</div> 
													</div> 
													<div className="filter-block-right">
														<label className="dropdown-advance-search-title">Near City</label>
														<div className="filter-checkbox">
															<span className="no_val">No</span>
															<label className="switch">
																<input type="checkbox" checked={(filters.near_city === 'YES')} onChange={(e) => setFilters({...filters, 'near_city': e.target.checked ? 'YES' : 'NO' })}/>
																<span className="slider round"></span>
															</label>
															<span className="no_val">Yes</span>
														</div> 
													</div> 
												</div>
												<div className="filter-block">
													<div className="filter-block-left">
														<label className="dropdown-advance-search-title">Granny Potential</label>
														<div className="filter-checkbox">
															<span className="no_val">No</span>
															<label className="switch">
																<input type="checkbox" checked={(filters.granny_potential === 'YES')} onChange={(e) => setFilters({...filters, 'granny_potential': e.target.checked ? 'YES' : 'NO'})}/>
																<span className="slider round"></span>
															</label>
															<span className="no_val">Yes</span>
														</div> 
													</div> 
													<div className="filter-block-right">
														<label className="dropdown-advance-search-title">Subdivide Potential</label>
														<div className="filter-checkbox">
															<span className="no_val">No</span>
															<label className="switch">
																<input type="checkbox" checked={(filters.subdivide_potential === 'YES')} onChange={(e) => setFilters({...filters, 'subdivide_potential': e.target.checked  ? 'YES' : 'NO'})}/>
																<span className="slider round"></span>
															</label>
															<span className="no_val">Yes</span>
														</div>
													</div> 	
							 					</div>
											</div>
										</div>
									</div>
								</div>
							</form>
							<div className="modal-footer">
								<a className="clear-all-filter" onClick={() => setFilters({})}>Clear all</a>
								<button type="button" onClick={searchProperty} 
									className="btn pink_btn btn_search_filter">SEARCH</button>
							</div>
          				</div>	
					</div>
				</div>
			</div>
		</div>            
    )
}
export default AdvancedFilter