import React, { useState, useEffect } from 'react'
import { getFavouriteProperties, verifyUserRole } from '../../Apis/auth'
import { 
    getAllImageIdsOfProperty, 
    addFavorite, 
    checkFavoriteProperty, 
    fetchPropertiesByRole, 
	fetchPropertyOffers, 
    getPropertyById
} from '../../Apis/property'
import { toast } from 'react-toastify'
import PageLoader from 'react-loader-advanced'
import ListItem from '../Listing/ListItem'

function FavouriteProperty (props) {
    const [ userInfo, setUserInfo] = useState({})
    const [ favouritesList, setFavList] = useState([])
    const [ propertyImages, setPropertyImages] = useState([])
    const [ loading, setLoading] = useState(false)
    const [ role, setRole] = useState('')
    const [ offersList, setOfferList] = useState([])

    useEffect(() => {
        let info = JSON.parse(sessionStorage.getItem('user'))
            if(info && info.user_information_uuid){
                setUserInfo(info)
                verifyRole(info.user_information_uuid)
            }
    }, [])


    const getOffers = (property_uuid) => {

		fetchPropertyOffers({ 'property_id': property_uuid })
			.then((res, index)=> {
				if( res && res.response ){
					toast.error(res.response)
				}
				else {
					setOfferList({ [property_uuid] : res})
				}
			})
	}

    const verifyRole = (id) => {
        verifyUserRole({ 'user_id': id })
            .then(res => {
                setRole(res.user_role_mapping_role)
                if(res.user_role_mapping_role  === "AGENT"){
                    // setFavList([])
                    //fetchAgentProperties({ 'user_id': id })
                    props.history.push('/agent_dashboard')
                }
                else {
                    fetchFavourites(id)
                }
            })
    }

    const fetchAgentProperties = (data) => {
        fetchPropertiesByRole(data)
            .then(res => {
                if(res && res.length > 0 ){
                    setFavList(res)
                    getAllProperties(res)
                    res.forEach((element, index) => {

                        getOffers(element.property_uuid)
                    })
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
    }

    const fetchFavourites = (userId) => {
        setLoading(true)
        getFavouriteProperties({ 'user_id': userId })
            .then(res => 
                {
                    if(res && res.length > 0 ){
                        setFavList(res)
                        getAllProperties(res)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
    }


    const getAllProperties = (list) => {
		let imagesArr = [ propertyImages ]
		list.forEach((item, index) => {
            getAllImageIdsOfProperty({ 'propertyID' : item.property_uuid })
                .then((images) =>  {
                    if(images && images.status){
                        toast.error(images.data)
                        setLoading(false)
                    }
                    else {
                        imagesArr[index] = images 
                        setPropertyImages([...imagesArr])
                        setLoading(false)
                        return images
                    }
                }) 
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


    const addItemToFav = (id) => {
		setLoading(true)
        setFavList([])
		addFavorite({ 
			'user_id' : userInfo && userInfo.user_information_uuid, 
			'property_id' : id })
			.then(res => {
				if(res && res.status){
					toast.error(res.data)
				}
				else {
                    fetchFavourites(userInfo.user_information_uuid)
				}
			})
	}


    const checkFav = (id) => {
		checkFavoriteProperty({ 
			'user_id' : userInfo && userInfo.user_information_uuid, 
			'property_id' : id })
			.then(response => {
				if( response && response.status){
					toast.error(response.data)
				}
				else {
					if(response && response.length > 0){
                        setLoading(false)
						return true
					}
					else {
                        setLoading(false)
						return false
					}
				}
			})
	}
    
    return(
        <div>
            <div className="product-grid">
                <div className="container-fluid">
                    <div className="directory-header-panel">
                        <div className="left-panel">
                            <h4>Favorites List</h4>
                        </div>
                    </div>
                    <PageLoader show={loading} message={'Fetching....'}>
                        <div className="row">
                            {favouritesList && favouritesList.length > 0 ? 
                                favouritesList.map((item, index) => 
                                    <ListItem
                                        key={index}
                                        item={item}
                                        addFav={addItemToFav}
                                        goToDetail={goToDetail}
                                        favorite={() => checkFav(item.property_uuid)}
                                        hide={true}
                                        offers={offersList[item.property_uuid]}
                                        propertyImages={propertyImages[index] ||  null}
                                    />):	
                                    <div className="col-md-12 text-center"> 
                                        <h4>No data found.</h4>
                                    </div>}
                        </div>
                    </PageLoader>
                </div>
            </div>
        </div>
    )
}

export default FavouriteProperty