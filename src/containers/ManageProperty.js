import React, { useState, useEffect } from 'react';
import { states, propertyTypes , suburb } from '../constants/data';
import { validate } from '../validations/addProperty';
import FileUploader from '../components/Common/FileUploader';
import { fetchAllFacilities, fetchAllHighlights } from '../Apis/settings'
import Loader from 'react-loader-spinner';
import { property } from '../schema/propertySchema'
import { toast } from 'react-toastify';
import { 
	getPropertyById, 
	getAllImageIdsOfProperty, 
	getFacilitiesOfProperty, 
	getHighlightsOfProperty, 
	getLocationOfProperty, 
	addProperty, editProperty
} from '../Apis/property' ;
import { getBase64 } from '../utils/common'
import PageLoader from 'react-loader-advanced'

function ManageProperty (props) {
    const [ propertyInfo, setPropertyInfo ] = useState({})
    const [ highlights, saveHighlights ] = useState([])
    const [ facilities, saveFacilities ] = useState([])
    const [ errors, setErrors ] = useState({})
    const [ viewUploader, setUploaderView] = useState(false)
    const [ selectedFacilities, saveSelectedFacilities ] = useState([])
    const [ selectedHighlights, saveSelectedHighlights ] = useState([])
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [ property_imgs, saveImages ] = useState([])
    const [ uploadedFiles, saveUploaded] = useState([])
    const [ loading, setLoading] = useState(false)

    useEffect(() => {
        setErrors({})
        getFacilities()
        getHighlights()
        const loc = props.location.pathname 
        const splitted = loc.split('/')
        // console.log(splitted);
        if( splitted && splitted.length === 3 ){
            fetchPropertyInfo()
        }   
        else {
            setPropertyInfo(property)
        }
        
       // console.log(props.match.params, props.location, "params")
    }, [])


    const fetchPropertyInfo = () => {
        const loc = props.location.pathname 
        const splitted = loc.split('/')
        console.log(splitted.length, "test")
        getPropertyById({ 'propertyID': splitted[splitted.length - 1] })
			.then((res, index)=> {
				if( res && res.response ){
					toast.error(res.response)
				}
				else {
                    setPropertyInfo(res[0])
					getPropertyInfo(res[0])
				}
			})
    }

    const getPropertyInfo = (existing) => {
		const loc = props.location.pathname 
        const splitted = loc.split('/')
		let info = { ...existing }
		
		getAllImageIdsOfProperty({ 'propertyID': splitted[splitted.length - 1] })
			.then(images  => {
				if(images && images.status){
					toast.error(images.data)
				}
				else {
					saveImages(images)
				}
			})
		
		getFacilitiesOfProperty({ 'propertyID': splitted[splitted.length - 1] })
			.then(facilities  => {
				if(facilities && facilities.status){
					toast.error(facilities.data)
				}
				else {
                    let selected = facilities && facilities.map(fac => fac.master_facility_uuid)
                    saveSelectedFacilities(selected)
				}
			})

        getHighlightsOfProperty({ 'propertyID': splitted[splitted.length - 1] }) 
			.then(highlights  => {
				if(highlights && highlights.status){
					toast.error(highlights.data)
				}
				else {
                    let selected = highlights && highlights.map(item => item.master_highlight_uuid)
					saveSelectedHighlights(selected)
					//setDetailItem({ ...existing , ...detailItem, 'highlights': highlights })
				}
			})

		getLocationOfProperty({ 'locationID' : info.property_info_location})
			.then(location  => {
				if(location && location.status){
					toast.error(location.data)
				}
				else {
                    let address = location && location.length > 0 ? 
                        location[0].master_location_street_address :
                        propertyInfo.property_info_location 
					setPropertyInfo({ ...existing , ...propertyInfo, 'property_info_location':address, 'location': location })
				}
			})
        }

    const getFacilities = () => {
        fetchAllFacilities()
            .then(res => {
                if(res && res.length){
                    saveFacilities(res)
                }
            })
    }

    const getHighlights = () => {
        fetchAllHighlights()
            .then(res => {
                if(res && res.length){
                    saveHighlights(res)
                }
            })
    }

    const findIDs = () => {
        let highlightIds = []
        highlights.forEach(item => {
            if(selectedHighlights.includes(item.master_highlight_uuid)){
                highlightIds.push(item.master_highlight_id) 
            }
        })
       // console.log(highlightIds, "ids")
        return highlightIds || []
    }

    const submit = () => {
        //console.log(propertyInfo, "property info")
        let ids = findIDs() 
        let images = uploadedFiles.map(file => file.base64)
        let info = { 
            ...propertyInfo,
            facilities:  selectedFacilities && (selectedFacilities.length > 0) ? [...selectedFacilities] :  [], 
            highlight: selectedHighlights && (selectedHighlights.length > 0) ? [...selectedHighlights] : [],
            highlights: ids.toString(), 
            property_images: uploadedFiles && (uploadedFiles.length > 0) ? [...property_imgs,...images ] : [...property_imgs], 
            property_images_name: uploadedFiles && (uploadedFiles.length > 0) ? uploadedFiles.map(file => file.name) : []
        }
        let result = validate(propertyInfo)
        setErrors(result)
        // console.log(info, "info")
        if(!(Object.keys(result).length > 0)) {
            setButtonLoading(true)
            if(propertyInfo && propertyInfo.property_info_uuid){
                const user = sessionStorage.getItem('user')
                let data = {
                    "property_info_uuid": propertyInfo.property_info_uuid,
                    'user_information_uuid' : user.user_information_uuid, 
                }
                for(let x in info) {
                    if (x in property ){
                        data[x] = info[x] ;
                    }
                }
                editAgentProperty(data)
            } 
            else {
                const user = JSON.parse(sessionStorage.getItem('user'));
                console.log({...info, "property_info_rental_yield": 0 , user_information_uuid : user.user_information_uuid })
                addProperty({...info, "property_info_rental_yield": 0 , user_information_uuid : user.user_information_uuid })
                .then(res => {
                    console.log(res, "response")
                    if(res) {
                        toast.success('Property created successfully!')
                        setButtonLoading(false) 
                        setTimeout(() => {
                            props.history.push('/search')
                        }, 1000);
                    }
                    else {
                        setButtonLoading(false) 
                    }
                })
            }
            
        }
    }


    const editAgentProperty = (data) => {
        editProperty(data)
            .then(res => {
                console.log(res, "response")
                if(res) {
                    toast.success('Property edited successfully!')
                    setButtonLoading(false) 
                    setTimeout(() => {
                        props.history.push('/search')
                    }, 1000);
                }
                else {
                    setButtonLoading(false) 
                }
            })
    }

    const uploadPropertyImages = (file) => {
        
        getBase64(file.file).then(res =>  {
            if(res){
                saveUploaded([...uploadedFiles, {
                    'base64': res, 
                    'name': file.meta.name
                }])

            }
        })  
        setTimeout(() => {
            setUploaderView(false)
        }, 1000)  
    }

    const selectFacilities = ( selected, checked ) => {
        let Facs = [...selectedFacilities ]
        if(checked){
            Facs.push(selected.master_facility_uuid)
        }
        else {
            let facIndex = Facs.findIndex((item) => (item === selected.master_facility_uuid))
            if( facIndex > -1 ){
                Facs.splice(facIndex, 1)
            }
        }
        
        //console.log(Facs, "new facilities")
        saveSelectedFacilities([...Facs])
    }

    const selectHighlights = ( selected, checked ) => {
        let Highlights = [...selectedHighlights ]
        if( checked ){
            Highlights.push(selected.master_highlight_uuid)
        }
        else {
            let dataIndex = Highlights.findIndex((item) => (item === selected.master_highlight_uuid))
            if( dataIndex > -1 ){
                Highlights.splice(dataIndex, 1)
            }
        }
        
       // console.log(Highlights, Highlights.includes(selected.master_highlight_uuid), "new highs")
        saveSelectedHighlights([...Highlights])
    }
    
    //console.log(selectedFacilities, "property info")
    
    // eslint-disable-next-line no-unused-vars
    const allFacilities =  selectedFacilities.length > 0 ? [...selectedFacilities, ...facilities]  :[...facilities]
    // eslint-disable-next-line no-unused-vars
    const allHighlights = selectedHighlights.length > 0 ? [...selectedHighlights, ...highlights]: [...highlights] 
    
    return(
        <PageLoader>
        <section id="property-dashboard" className="get-touch spacing">
            <div className="container">
                <div className="row">
                    <div className="col-lg-11 offset-lg-1 col-xs-12">
                        <h2>{propertyInfo && propertyInfo.property_info_uuid ? 'Edit' : 'Add'} Property</h2>
                        <div className="form-content">
                            <form action="touch">
                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input 
                                                value={
                                                        propertyInfo.property_info_location
                                                        // propertyInfo.location && propertyInfo.location.length > 0 ? 
                                                        // propertyInfo.location[0].master_location_street_address :
                                                        // propertyInfo.property_info_location 
                                                    } 
                                                    onChange={
                                                        (e) => setPropertyInfo(
                                                        { 
                                                            ...propertyInfo, 
                                                            'property_info_location' : e.target.value 
                                                        }
                                                    ) 
                                                } 
                                                type="text" className="form-control" placeholder="Enter a location"/>
                                        </div>
                                        {errors['property_info_location'] && errors['property_info_location'].length > 0 ? <p className="alert">{errors['property_info_location'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Bedrooms</label>                                 
                                            <input value={propertyInfo.property_info_bedroom || ''} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_bedroom' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_bedroom'] && errors['property_info_bedroom'].length > 0 ? <p className="alert">{errors['property_info_bedroom'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Bathrooms</label>                                 
                                            <input value={propertyInfo.property_info_bathroom || ''} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_bathroom' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="text" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_bathroom'] && errors['property_info_bathroom'].length > 0 ? <p className="alert">{errors['property_info_bathroom'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Build Year</label>                                 
                                            <input value={propertyInfo.property_info_year_build || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_year_build' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_year_build'] && errors['property_info_year_build'].length > 0 ? <p className="alert">{errors['property_info_year_build'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Land Size</label>                                 
                                            <input value={propertyInfo.property_info_land_size || ''} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_land_size' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_land_size'] && errors['property_info_land_size'].length > 0 ? <p className="alert">{errors['property_info_land_size'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Median Price</label>                                 
                                            <input value={propertyInfo.property_info_median_price || ''}
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_median_price' : e.target.value }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_median_price'] && errors['property_info_median_price'].length > 0 ? <p className="alert">{errors['property_info_median_price'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>List Price</label>                                 
                                            <input value={propertyInfo.property_info_list_price || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_list_price' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_list_price'] && errors['property_info_list_price'].length > 0 ? <p className="alert">{errors['property_info_list_price'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Equity Amount</label>                                 
                                            <input value={propertyInfo.equity_amount || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'equity_amount' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['equity_amount'] && errors['equity_amount'].length > 0 ? <p className="alert">{errors['equity_amount'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Long Term Growth</label>                                 
                                            <input value={propertyInfo.property_info_long_term_growth || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_long_term_growth' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) } 
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_long_term_growth'] && errors['property_info_long_term_growth'].length > 0 ? <p className="alert">{errors['property_info_long_term_growth'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Cash income</label>                                 
                                            <input value={propertyInfo.property_info_cash_income || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_cash_income' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) }
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_cash_income'] && errors['property_info_cash_income'].length > 0 ? <p className="alert">{errors['property_info_cash_income'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Growth</label>                                 
                                            <input value={propertyInfo.property_info_growth || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_growth' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) }
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_growth'] && errors['property_info_growth'].length > 0 ? <p className="alert">{errors['property_info_growth'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Rental</label>                                 
                                            <input  value={propertyInfo.property_info_rental || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_rental' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) }
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_rental'] && errors['property_info_rental'].length > 0 ? <p className="alert">{errors['property_info_rental'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Ownership Type</label>                                 
                                            <select value={propertyInfo.property_info_ownership_type || ' '} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_ownership_type' : e.target.value }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value=" ">--Select--</option>
                                                <option value="OWNER">Owner</option>
                                                <option value="RENTER">Renter</option>
                                            </select>
                                        </div>
                                        {errors['property_info_ownership_type'] && errors['property_info_ownership_type'].length > 0 ? <p className="alert">{errors['property_info_ownership_type'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Property Type</label>                                 
                                            <select value={propertyInfo.property_info_type || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_type' : e.target.value }) } 
                                                name="property" id="property-location" className="form-control">
                                            <option value="">Select Property</option>
											    {propertyTypes.map((prop,index) => <option key={index} value={prop}>{prop}</option>)}
                                            </select>
                                        </div>
                                        {errors['property_info_type'] && errors['property_info_type'].length > 0 ? <p className="alert">{errors['property_info_type'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>State</label>                                 
                                            <select value={propertyInfo.state || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'state' : e.target.value }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="">Select State</option>
                                                {states.map((state,index) => <option key={index} value={state}>{state}</option>)}
                                            </select>
                                        </div>
                                        {errors['state'] && errors['state'].length > 0 ? <p className="alert">{errors['state'][0]}</p> : null}
                                    </div>
                                    
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>PostCode</label>                                 
                                            <select value={propertyInfo.postcode} 
                                                onChange={
                                                    (e) => setPropertyInfo({ ...propertyInfo, "postcode" : e.target.value }) 
                                                }
                                                name="property" id="property-location" className="form-control">
                                                <option value="1">--Select--</option>
                                                {   
                                                    [...Array(1999)]
                                                    .map((item,index) => 
                                                        <option key={index} value={item = index + 1000}>
                                                            {item = index + 1000}
                                                        </option>
                                                    )
                                                    
                                                }
                                                <option value="3644">3644</option>
                                                <option value="9999">9999</option>
                                            </select>
                                        </div>
                                        {errors["postcode"] && errors["postcode"].length > 0 ? <p className="alert">{errors["postcode"][0]}</p> : null}
                                    </div> 
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Suburb</label>                                 
                                            <select value={propertyInfo.suburb} 
                                                onChange={
                                                    (e) => setPropertyInfo({ ...propertyInfo, "suburb" : e.target.value }) 
                                                }
                                                name="property" id="property-location" className="form-control">
                                                <option value="1">--Select--</option>
											    {suburb.map((prop,index) => <option key={index} value={prop}>{prop}</option>)}
                                            </select>
                                        </div>
                                        {errors["suburb"] && errors["suburb"].length > 0 ? <p className="alert">{errors["suburb"][0]}</p> : null}
                                    </div>

                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Area Flood?</label>                                 
                                            <select value={propertyInfo.property_info_area_flood} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_area_flood' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_info_area_flood'] && errors['property_info_area_flood'].length > 0 ? <p className="alert">{errors['property_info_area_flood'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Council Issue?</label>                                 
                                            <select value={propertyInfo.property_info_counsil_issue} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_counsil_issue' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_info_counsil_issue'] && errors['property_info_counsil_issue'].length > 0 ? <p className="alert">{errors['property_info_counsil_issue'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Good Neighbourhood?</label>                                 
                                            <select value={propertyInfo.property_info_good_neighbourho} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_good_neighbourhood' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_info_good_neighbourhood'] && errors['property_info_good_neighbourhood'].length > 0 ? <p className="alert">{errors['property_info_good_neighbourhood'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Garage</label>                                 
                                            <input value={propertyInfo.property_info_garage} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_garage' : parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }) }
                                                type="number" className="form-control" placeholder=""/>
                                        </div>
                                        {errors['property_info_garage'] && errors['property_info_garage'].length > 0 ? <p className="alert">{errors['property_info_garage'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Status</label>                                 
                                            <select value={propertyInfo.property_info_status} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_status' : e.target.value }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="ACTIVE" checked>Active</option>
                                                <option value="INACTIVE">InActive</option>
                                            </select>
                                        </div>
                                        {errors['property_info_status'] && errors['property_info_status'].length > 0 ? <p className="alert">{errors['property_info_status'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Near school</label>                                 
                                            <select value={propertyInfo.property_near_school} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_near_school' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_near_school'] && errors['property_near_school'].length > 0 ? <p className="alert">{errors['property_near_school'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Near Transport</label>                                 
                                            <select value={propertyInfo.property_near_transport} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_near_transport' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_near_transport'] && errors['property_near_transport'].length > 0 ? <p className="alert">{errors['property_near_transport'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Near Beach</label>                                 
                                            <select value={propertyInfo.property_near_beach} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_near_beach' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_near_beach'] && errors['property_near_beach'].length > 0 ? <p className="alert">{errors['property_near_beach'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Near City</label>                                 
                                            <select value={propertyInfo.property_near_city} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_near_city' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_near_city'] && errors['property_near_city'].length > 0 ? <p className="alert">{errors['property_near_city'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Granny Potential</label>                                 
                                            <select value={propertyInfo.property_near_granny} 
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_near_granny' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) } 
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_near_granny'] && errors['property_near_granny'].length > 0 ? <p className="alert">{errors['property_near_granny'][0]}</p> : null}
                                    </div>
                                    
                                    
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is Expert Pick</label>                                 
                                            <select value={propertyInfo.is_expert_picks} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_expert_picks" : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_expert_picks"] && errors["is_expert_picks"].length > 0 ? <p className="alert">{errors["is_expert_picks"][0]}</p> : null}
                                    </div> 
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is Most Viewed</label>                                 
                                            <select value={propertyInfo.is_most_view} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_most_view" : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_most_view"] && errors["is_most_view"].length > 0 ? <p className="alert">{errors["is_most_view"][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is New in Market</label>                                 
                                            <select value={propertyInfo.is_new_in_market} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_new_in_market" : (e.target.value === 'NO') ? e.target.value : 'YES' }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_new_in_market"] && errors["is_new_in_market"].length > 0 ? <p className="alert">{errors["is_new_in_market"][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is Promoted</label>                                 
                                            <select value={propertyInfo.is_promoted} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_promoted" : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_promoted"] && errors["is_promoted"].length > 0 ? <p className="alert">{errors["is_promoted"][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is Rare Find</label>                                 
                                            <select  value={propertyInfo.is_rare_find} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_rare_find" : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_rare_find"] && errors["is_rare_find"].length > 0 ? <p className="alert">{errors["is_rare_find"][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is Spacious Home</label>                                 
                                            <select value={propertyInfo.is_spacius_home} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_spacius_home" : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_spacius_home"] && errors["is_spacius_home"].length > 0 ? <p className="alert">{errors["is_spacius_home"][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Is Stress Free</label>                                 
                                            <select value={propertyInfo.is_stress_free} onChange={(e) => setPropertyInfo({ ...propertyInfo, "is_stress_free" : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors["is_stress_free"] && errors["is_stress_free"].length > 0 ? <p className="alert">{errors["is_stress_free"][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Subdivide Potential</label>                                 
                                            <select value={propertyInfo.property_near_subdivide}
                                                onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_near_subdivide' : (e.target.value === 'NO') ? e.target.value : 'YES'  }) }
                                                name="property" id="property-location" className="form-control">
                                                <option value="YES">Yes</option>
                                                <option value="NO">No</option>
                                            </select>
                                        </div>
                                        {errors['property_near_subdivide'] && errors['property_near_subdivide'].length > 0 ? <p className="alert">{errors['property_near_subdivide'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <div className="form-group">
                                            <label>Property Title</label>
                                                {/* <div className="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
                                                    <div className="btn-group">
                                                    <a className="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i className="icon-bold"></i></a>
                                                    <a className="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i className="icon-italic"></i></a>
                                                    <a className="btn" data-edit="strikethrough" title="Strikethrough"><i className="icon-strikethrough"></i></a>
                                                    <a className="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i className="icon-underline"></i></a>
                                                    </div>
                                                    <div className="btn-group">
                                                    <a className="btn" data-edit="insertunorderedlist" title="Bullet list"><i className="icon-list-ul"></i></a>
                                                    <a className="btn" data-edit="insertorderedlist" title="Number list"><i className="icon-list-ol"></i></a>
                                                    <a className="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i className="icon-indent-left"></i></a>
                                                    <a className="btn" data-edit="indent" title="Indent (Tab)"><i className="icon-indent-right"></i></a>
                                                    </div>
                                                    <div className="btn-group">
                                                    <a className="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i className="icon-align-left"></i></a>
                                                    <a className="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i className="icon-align-center"></i></a>
                                                    <a className="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i className="icon-align-right"></i></a>
                                                    <a className="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i className="icon-align-justify"></i></a>
                                                    </div>
                                                    <div className="btn-group">
                                                    <a className="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i className="icon-link"></i></a>
                                                    <div className="dropdown-menu input-append">
                                                        <input className="span2" placeholder="URL" type="text" data-edit="createLink"/>
                                                        <button className="btn" type="button">Add</button>
                                                    </div>
                                                    <a className="btn" data-edit="unlink" title="Remove Hyperlink"><i className="icon-cut"></i></a>
                                                    </div>
                                                </div> */}
                                            <textarea  value={propertyInfo.property_info_desc} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'property_info_desc' : e.target.value }) } 
                                                type="text" className="form-control" placeholder="" rows="8"></textarea>
                                        </div>
                                        {errors['property_info_desc'] && errors['property_info_desc'].length > 0 ? <p className="alert">{errors['property_info_desc'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <div className="form-group">
                                            <label>Expert Description</label>                           
                                            <textarea value={propertyInfo.expert_description || ''} onChange={(e) => setPropertyInfo({ ...propertyInfo, 'expert_description' : e.target.value }) } 
                                                type="text" className="form-control" placeholder="" rows="4"></textarea>
                                        </div>
                                        {errors['expert_description'] && errors['expert_description'].length > 0 ? <p className="alert">{errors['expert_description'][0]}</p> : null}
                                    </div>
                                    <div className="col-lg-12 col-12 text-left">
                                        {viewUploader ?
                                            <div>
                                                <FileUploader
                                                    accept="image/*"
                                                    multiple={false}
                                                    getUploadParams={uploadPropertyImages}
                                                />  
                                            </div>
                                        : null}
                                        <div className="form-group" >
                                            <a className="btn agent-btn text-light" onClick={() => setUploaderView(true)}> 
                                                Upload Images ({uploadedFiles.length})
                                                <img src="/images/upload-icon.png"/> 
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <h3>Facilities</h3>
                                        <div className="row checkbox-row">
                                            {facilities && facilities.map((fac,index) => {
                                                return (<div key={index} className="col-lg-3 col-12">
                                                            <div className="form-group"> 
                                                                <label className="agent-checkbox">{fac.master_facility_label}
                                                                    <input checked={selectedFacilities.includes(fac.master_facility_uuid) ? true : false } type="checkbox" onChange={(e) => selectFacilities(fac, e.target.checked )}/>
                                                                    <span className="checkmark"></span>
                                                                </label> 
                                                            </div>
                                                        </div>)
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <h3>Highlights</h3>
                                        <div className="row checkbox-row">
                                            {highlights && highlights.map((data,index) => {
                                                return (
                                                <div key={index} className="col-lg-3 col-12">
                                                    <div className="form-group"> 
                                                        <label className="agent-checkbox">{data.master_highlight_label}
                                                            <input 
                                                                checked={
                                                                    selectedHighlights.includes(data.master_highlight_uuid) ? 
                                                                    true : false
                                                                } 
                                                                type="checkbox" 
                                                                onChange={(e) => selectHighlights(data, e.target.checked)}/>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            <button onClick={submit} type="button" className="btn btn-primary">
                                {buttonLoading ?  
                                    <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>  
                                    :'Submit'}
                            </button>
                            <p>Powered by <u>SEARCH AND SETTLE </u> | <u>All Rights Reserved © 2021</u></p>
                        </form>
                  </div>
               </div>
            </div>
         </div>
        </section>
        </PageLoader>
    )
}

export default ManageProperty