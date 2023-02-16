import React, { useState, useEffect } from 'react'
import PropertyInfoBlock from '../components/Buyer/PropertyInfoBlock'
import { 
    fetchPurchasedProperties, 
    fetchRejectedProperties,
    fetchSentOffers , 
    fetchPropertiesWithOffers
} from '../Apis/buyer' 
import { getFavouriteProperties } from '../Apis/auth'
import PageLoader from 'react-loader-advanced'
import Pagination from "react-paginate";


function BuyerProperties (props) {
    const [ activeTab, setActiveTab ] = useState('all')
    const [ purchasedList, setPurchaseList ] = useState([])
    const [ rejectedList, setRejectList ] = useState([])
    const [ sentOffersList, setSentOffersList ] = useState([])
    const [ favouritesList, setFavList] = useState([])
    const [ user_id, setUserId ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ propertyList, setPropertyList] = useState([])

	const [ total, setTotal] = useState(0)
    const [ filters, setFilters] = useState({ 'pageNumber': 1 , 'pageSize': 9 })

    useEffect(() => {
        let info = JSON.parse(sessionStorage.getItem('user'))
            if(info && info.user_information_uuid){
                setUserId(info.user_information_uuid)
                fetchPropertiesWithOffers({
                    ...filters, 
                    'user_id': info.user_information_uuid, 
                    'pageSize' : Number.MAX_SAFE_INTEGER
                })
                .then(res => setTotal(res.length))
                fetchAllProperties({...filters , 'user_id': info.user_information_uuid });
            }
    }, [])


    useEffect(()=>{
        let data = {...filters, 'user_id': user_id }
        switch (activeTab) {
            case 'all': 
                fetchAllProperties(data);
                break;
            case 'purchased':
                fetchPurchased(data);
                break;
            case 'rejected':
                fetchRejected(data);
                break;
            case 'saved': 
                fetchFavourites(data)
                break;
            case 'offer':
                fetchOffersSent(data);
                break;
            default: 
                fetchAllProperties(data);
        }
        // setLoading(false);
    },[filters])

    useEffect(()=>{
        let data = {...filters, 'user_id': user_id }
        switch (activeTab) {
            case 'all': 
                fetchPropertiesWithOffers({...data , 'pageSize' : Number.MAX_SAFE_INTEGER}).then(res => setTotal(res.length))
                fetchAllProperties(data);
                break;
            case 'purchased':
                fetchPurchasedProperties({...data , 'pageSize' : Number.MAX_SAFE_INTEGER}).then(res => setTotal(res.length))
                fetchPurchased(data);
                break;
            case 'rejected':
                fetchRejectedProperties({...data , 'pageSize' : Number.MAX_SAFE_INTEGER}).then(res => setTotal(res.length))
                fetchRejected(data);
                break;
            case 'saved': 
                getFavouriteProperties({...data , 'pageSize' : Number.MAX_SAFE_INTEGER}).then(res => setTotal(res.length))
                fetchFavourites(data)
                break;
            case 'offer':
                fetchSentOffers({...data , 'pageSize' : Number.MAX_SAFE_INTEGER}).then(res => setTotal(res.length))
                fetchOffersSent(data);
                break;
            default: 
                fetchPropertiesWithOffers({...data , 'pageSize' : Number.MAX_SAFE_INTEGER}).then(res => setTotal(res.length))
                fetchAllProperties(data);
        }
    },[activeTab])

    const fetchPurchased = (data) => {
        setLoading(true)
        fetchPurchasedProperties(data)
            .then(res => {
                if( res && res.length > 0 ){
                    setPurchaseList(res)
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
    }

    const fetchRejected = (data) => {
        fetchRejectedProperties(data)
            .then(res => {
                if(res && res.length > 0){
                    setRejectList(res)
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
    }

    const fetchOffersSent = (data) => {
        fetchSentOffers(data)
            .then(res => {
                if(res && res.length > 0){
                    setSentOffersList(res)
                    setLoading(false)
                } 
                else {
                    setLoading(false)
                }
            })
    }

    const fetchFavourites = (data) => {
        getFavouriteProperties(data)
            .then(res => 
                {
                    if(res && res.length > 0 ){
                        setFavList(res)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
    }

    const fetchAllProperties = (data) => {
        fetchPropertiesWithOffers(data)
            .then(res => 
                {
                    if(res && res.length > 0 ){
                        setPropertyList(res)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
    }


    const setActive = (active) => {
        setFilters({...filters , 'pageNumber' : 1 })
        setActiveTab(active)
        setLoading(true)
        
    }

    const getDataOnPageChange = (e)  => {
        setLoading(true)
        // console.log(e.selected+1)
        setFilters({...filters , 'pageNumber' : e.selected+1 })
    } 

    const goToOfferDetail = (id) => {
        props.history.push(`/buyer_dashboard/${id}`)
    }

    const gotoPropertyDetail = (id) => {
        props.history.push(`/detail/${id}`)
    }

    const pageTotal = ((total%2) === 0) ?  parseInt(total/10) + 1  : parseInt(total/10) + 1  
    // console.log( propertyList, "list")
    return (
        // <PageLoader show={loading} message={'Fetching .....'}>
        <div className="propery-tabs-box spacing">
            <div className="container-fluid">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" onClick={() => setActive('all')}>
                        <a className={activeTab === 'all' ? "nav-link active" : "nav-link" } id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all">All Properties(with offer)</a>
                    </li>
                    <li className="nav-item" onClick={() => setActive('purchased')}>
                        <a className={activeTab === 'purchased' ? "nav-link active" : "nav-link" } id="added-tab" data-toggle="tab" href="#added" role="tab" aria-controls="added">purchased property</a>
                    </li>
                    <li className="nav-item" onClick={() => setActive('saved')}>
                        <a className={activeTab === 'saved' ? "nav-link active" : "nav-link" } id="saved-tab" data-toggle="tab" href="#saved" role="tab" aria-controls="saved">saved property</a>
                    </li>
                    <li className="nav-item" onClick={() => setActive('offer')}>
                        <a className={activeTab === 'offer' ? "nav-link active" : "nav-link" } id="offer-tab" data-toggle="tab" href="#offer" role="tab" aria-controls="offer">sent/received offer</a>
                    </li>
                    <li className="nav-item" onClick={() => setActive('rejected')}>
                        <a className={activeTab === 'rejected' ? "nav-link active" : "nav-link" } id="rejected-tab" data-toggle="tab" href="#rejected" role="tab" aria-controls="rejected">rejected offer</a>
                    </li>
                </ul>
                <PageLoader show={loading} message={'Fetching .....'}>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">            
                            {(propertyList && propertyList.length > 0) ? 
                                propertyList.map((item,index) => 
                                    <PropertyInfoBlock key={index} item={item} goToDetail={goToOfferDetail} showDetail={false}/>
                                ) 
                                : <p className="text-center">No Property Found.</p>}
                        </div>
                        <div className="tab-pane fade" id="added" role="tabpanel" aria-labelledby="added-tab">            
                            {(purchasedList && purchasedList.length > 0) ? 
                                purchasedList.map((item,index) => <PropertyInfoBlock key={index}  item={item} goToDetail={gotoPropertyDetail} showDetail={true}/>) : <p className="text-center">No Property Found.</p>}
                        </div>
                        <div className="tab-pane fade" id="saved" role="tabpanel" aria-labelledby="saved-tab">
                            {(favouritesList && favouritesList.length > 0 ) ? 
                                favouritesList.map((item,index) => <PropertyInfoBlock key={index} item={item} goToDetail={gotoPropertyDetail} showDetail={true}/>) : <p className="text-center">No Property Found.</p>}
                        </div>
                        <div className="tab-pane fade" id="offer" role="tabpanel" aria-labelledby="offer-tab"> 
                            {(sentOffersList && sentOffersList.length > 0) ?  
                                sentOffersList.map((item,index) => <PropertyInfoBlock key={index} item={item} goToDetail={goToOfferDetail} showDetail={false}/>) 
                                : <p className="text-center">No Offer Found.</p>}
                        </div>
                        <div className="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">               
                            {(rejectedList && rejectedList.length > 0) ? 
                                rejectedList.map((item,index) => <PropertyInfoBlock key={index} item={item} goToDetail={goToOfferDetail} showDetail={false} />) : <p className="text-center">No Offer Found.</p>}
                        </div>
                    </div>
                </PageLoader>
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
        // </PageLoader>
    )
}

export default BuyerProperties