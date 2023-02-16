import React, { useState, useEffect } from 'react'
import UpdateStatusModal from "../components/Modal/UpdateStatusModal";
import { 
    fetchOfferListByRole, 
    updateOfferStatus, 
    fetchOfferStatusById, 
    fetchOfferCount
} from '../Apis/buyer'
import { priceFormat } from '../utils/common';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import PageLoader from 'react-loader-advanced'
import Pagination from "react-paginate";


function PropertyStatusView () {
    const [ show, setStatusModal ] = useState(false)
    const [ userInfo, setUserInfo ] = useState({})
    const [ offerList, setOfferList ] = useState([])
    const [ offerStatus, setOfferStatus ] = useState({})
    const [ buttonLoading, setButtonLoading] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ offerTotal, setOfferTotal ] = useState(0)
    const [ allOfferTotal, setAllOfferTotal ] = useState(0)
    const [ filters, setFilters] = useState({ 'pageNumber' : 1, 'pageSize' :  60})

    useEffect (() => {
        fetchCountOfOffers()    
        fetchOfferList()
    }, [])

    useEffect (() => {
        fetchOfferList()
    },[filters])

    const fetchCountOfOffers = () => {
        let info = JSON.parse(sessionStorage.getItem('user'))
        if(info && info.user_information_uuid){
            setUserInfo(info)
            // fetchOfferCount({ 
            //     'user_type' : info && info.role, 
            //     'user_id': info && info.user_information_uuid
            // }).then(res => {
            //     //console.log(res, "res of total api")
            //     if(res && res.length > 0 )
            //         setOfferTotal(res[0].TOTAL)
            // })
            
            fetchOfferListByRole({ 
                'pageNumber' : 1 ,
                'pageSize' : Number.MAX_SAFE_INTEGER ,
                'user_type' : info && info.role, 
                'user_id': info && info.user_information_uuid
            }).then(res => {
                if(res && res.length > 0 ){
                    setAllOfferTotal(res.length)
                    // if(JSON.parse(sessionStorage.getItem('user')).role === 'BROKER')
                    // {
                        res = res.filter(res => res.current_status !== 'Offer Sent' && res.is_rejected === 'No') 
                    // }
                    setOfferTotal(res.length)
                }
            })
        }
        
    }


    const fetchOfferList = () => {
        let info = JSON.parse(sessionStorage.getItem('user'))
        if(info && info.user_information_uuid){
            setLoading(true)
            fetchOfferListByRole({ 
                ...filters,
                'user_type' : info && info.role, 
                'user_id': info && info.user_information_uuid
            }).then(res => {
                if(res && res.length > 0 ){
                    // if(JSON.parse(sessionStorage.getItem('user')).role === "BROKER")
                    // {
                        res = res
                        .filter(res => res.current_status !== 'Offer Sent' && res.is_rejected === 'No')
                        .slice(((filters.pageSize/60)-1)*10,)
                    // }
                    // else res = res.slice(((filters.pageSize/30)-1)*10,)
                    setOfferList(res)
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
        }
       
    }


    const fetchOfferStatus = (id) => {
        fetchOfferStatusById(id)
            .then(res => {
                if(res){
                    setOfferStatus(res)
                    setButtonLoading({ ...buttonLoading , [id] : false })
                    setStatusModal(true)
                }
                else if( res.status && !(res.status.length > 0)){
                    setButtonLoading({ ...buttonLoading , [id] : false})
                    toast.error('No status available for the offer.')
                }
            })
    }


    const openStatusModal = (id) => {
        setButtonLoading({ ...buttonLoading , [id] : true })
        fetchOfferStatus({ 'offer_uuid': id })        
    }


    const updateOffer = (status_info) => {
        // console.log( status_info, "offer status")
        setLoading(true)
        updateOfferStatus({
            'changed_by': userInfo && userInfo.role, 
            'user_id': userInfo && userInfo.user_information_uuid, 
            'offer_uuid': status_info && status_info.property_offer_uuid, 
            'offer_status_uuid': status_info && status_info.property_offer_status_uuid,
            'current_status': status_info && status_info.status
        }).then (res => {
            setLoading(false)
            //console.log(res.response,   "response")
            if(res){
                // fetchOfferList()
                let tempOfferList = offerList ;
                offerList.map((item,index) => {
                    if(item.property_offers_uuid === status_info.property_offer_uuid ){
                        tempOfferList[index].current_status = status_info.status
                    }
                })
                setOfferList( tempOfferList )
                setStatusModal(false)
                toast.success('Offer status updated.')
            }
        })
    }


    const getDataOnPageChange = (e) => {
        // console.log(filters.pageSize * (e.selected+1))
        setFilters({ ...filters , 'pageSize' : (60 * (e.selected+1)) } )
        //fetchCountOfOffers()
    }


    let pageTotal = ((offerTotal%2) === 0) ?  parseInt(offerTotal/10) + 1  : parseInt(offerTotal/10) + 1
    // const pagesize = Math.ceil(allOfferTotal / pageTotal) 

    // console.log( ((filters.pageSize/60)-1)*10 , offerTotal , allOfferTotal )

    return(
        <div className="propery-tabs-box spacing">
            <div className="container-fluid">
                <div className="box table-box">
                    <h4 className="d-flex align-items-center">
                        Property Status
                    </h4>
                    <PageLoader show={loading} message={'Fetching....'}>
                        <table className="table"> 
                            <thead>
                                <tr>
                                    <th>Property Name</th>
                                    <th>Offer Price</th>
                                    <th>Listed Price</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {offerList && offerList.length > 0 ?     
                                    offerList
                                    // .filter(offer => (offer.current_status !== 'Offer Sent' && offer.is_rejected === 'No' ))
                                    .slice(0,10)
                                    .map((offer, index) => { 
                                        let accepted = (offer.is_accepted === 'Yes') ? 'Accepted' : (offer.is_rejected === 'Yes') ? 'Rejected' : 'N/A' 
                                        return(
                                            <tr key={index}>
                                                <td>{offer.address}</td>
                                                <td>{priceFormat(offer.property_offers_price)}</td>
                                                <td>{priceFormat(offer.list_price)}</td>
                                                <td>{offer.current_status}</td>
                                                <td>{
                                                    (offer.is_rejected === 'No' && offer.is_accepted === 'Yes') ? 
                                                    <button className="btn pink_btn width_100"
                                                        onClick={() => openStatusModal(offer.property_offers_uuid)}>
                                                        {buttonLoading[offer.property_offers_uuid] ? 
                                                        <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>
                                                        : 'Update'}
                                                    </button> 
                                                    : accepted 
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }) : null}
                            </tbody>
                        </table>
                    </PageLoader>
                </div>
                {(offerTotal > 10 ) ? <div className="d-flex pagination-box">
                    <Pagination
                        activePage={filters.pageNumber}
                        pageCount={pageTotal}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={getDataOnPageChange}
                    />
                </div>: null }
            </div>
            <UpdateStatusModal 
                userInfo={userInfo}
                updateOffer={updateOffer}
                offerStatusList={offerStatus.status || []} 
                show={show} 
                onClose={() => setStatusModal(false)}/>
        </div>

    )
}

export default PropertyStatusView
