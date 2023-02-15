import React, { useEffect, useState } from 'react'
import { fetchUserProfile } from '../Apis/auth'
import { fetchOfferStatusById, rolesWithProperty } from '../Apis/buyer'
import { fetchDocumentList, uploadDocument, sendMessage } from '../Apis/settings'
import BuyerStatus from '../components/Buyer/BuyerStatus'
import DocumentListView from '../components/Buyer/DocumentListView'
import PropertyInfoBlock from '../components/Buyer/PropertyInfoBlock'
import CollapsiblePanel from '../components/Common/CollapsiblePanels'
import FileUploader from '../components/Common/FileUploader'
import { toast } from 'react-toastify';
import SendMessagePopup from '../components/Modal/sendMessagePopup'
import PageLoader from "react-loader-advanced";

import { priceFormat } from '../utils/common'
import { validate } from '../validations/offerModal'
import { fetchPropertyOffers, sendPropertyOffers,getPropertyById } from '../Apis/property'
import { validateMessage } from '../validations/message'
import OfferHistory from '../components/Buyer/OfferHistory'

function BuyerDashboard(props){
    const [ basicDetail, saveBasicOffer ] = useState({})
    const [ offerList, saveOfferList ] = useState([])
    const [ rolesInfo, saveRoleInfo ] = useState({})
    const [ viewOfferHistory , setViewOfferHistory ] = useState(true);
    const [ viewDocuments, setDocumentDisplay ] = useState(true)
    const [ documentList, saveDocumentList ] = useState([])
    const [ broker, saveBrokerProfile] = useState({})
    const [ agent, saveAgentProfile ] = useState({'user_information_email_address' : 'agent100@gmail.com'})
    const [ solicitor, saveSolicitorProfile] = useState({})
    const [ inspector, saveInspectorProfile] = useState({})
    const [ open, openMessageModal] = useState(false)
    const [ messageInfo, saveMessage] = useState({})
    const [ buttonLoading, setButtonLoading] = useState(false)
    const [ loading, setLoading] = useState(false)
    const [ loaded, setLoaded] = useState(false)

    const [ offer, setOffer] = useState({ 'offer_price' : '0' , 'comments' : ''})
    const [ errors, setErrors] = useState({})
    const [ errorsMsg , setErrorsMsg ] = useState({})
    const [ propertyOffers , setpropertyOffers ] = useState({}) ;
    const [ offerCount , setOfferCount ] = useState(0);

    useEffect(() => {
        let path = props.location.pathname.split('/') 
        let offerId = path && path[path.length - 1]

        fetchOfferById(offerId)
        if(viewDocuments){
            fetchListOfDocuments(offerId)
        }
        // .then(res => console.log(res))
    }, [viewDocuments])


    const fetchOfferById = (id) => {
        setLoaded(true)
        fetchOfferStatusById({ 'offer_uuid' : id })
            .then(res => {
                if(res && res.offer){
                    saveBasicOffer({
                        ...res.offer[0], 
                        'type': res.offer[0] && res.offer[0].property_info_type, 
                        'total_bedroom':res.offer[0] && res.offer[0].property_info_bedroom,
                        'total_bathroom': res.offer[0] && res.offer[0].property_info_bathroom,
                        'total_garage': res.offer[0] && res.offer[0].property_info_garage,
                        'total_area': res.offer[0] && res.offer[0].property_info_land_size,
                        'state': res.offer[0] && res.offer[0].property_state
                    })
                    //console.log( userInfo, "user info")
                    fetchPropertyRoles(res.offer[0] && res.offer[0].property_info_uuid)
                    saveOfferList(res.status)
                    fetchPropertyOffers({ 'property_id': res.offer[0] && res.offer[0].property_info_uuid })
                    .then(res =>  {
                        setpropertyOffers(res) 
                        setOfferCount(res.length)
                    })
                    setLoaded(false)
                }
                else {
                    setLoaded(false)
                }
            })
    }

    const fetchPropertyRoles = (property_id) => {
        let info = JSON.parse(sessionStorage.getItem('user'))
        rolesWithProperty({
            'user_id': info && info.user_information_uuid,  
            'property_id': property_id
        }).then(res => {
                if( res && (res.length > 0)){
                    saveRoleInfo(res)
                    if(res && res[0].broker_uuid){
                        getProfile(res[0].broker_uuid, 'broker')
                    }
                    if(res && res[0].building_inspector_uuid){
                        getProfile(res[0].building_inspector_uuid, 'inspector')
                    }
                    if(res && res[0].solicitor_uuid){
                        getProfile(res[0].solicitor_uuid, 'solicitor')
                    }
                    //setLoaded(false)
                }
            })
        
    }


    const getProfile = (id, role) => {
        fetchUserProfile({ 'user_id': id })
            .then(res => {
                if(res && res.status){
                    toast.error(res.response)
                }
                else {
                    // eslint-disable-next-line default-case
                    switch (role) {
                        case 'broker':
                            saveBrokerProfile(res[0])
                            break;
                        case 'agent' :
                            saveAgentProfile(res[0])
                            break;
                        case 'inspector':
                            saveInspectorProfile(res[0])
                            break; 
                        case 'solicitor':
                            saveSolicitorProfile(res[0])
                            break;
                    }
                    //setLoaded(false)
                }
            })
    }


    const fetchListOfDocuments = (id) => {
        fetchDocumentList({ 'offer_uuid' : id })
            .then(res => {
                //console.log(res, "response")
                if(res && res.length > 0){
                    saveDocumentList(res)
                }
            })
    }

    const uploadOfferDocument = (file, info) => {
        setLoading(true)
        //console.log(file, info, "test")
        let user = JSON.parse(sessionStorage.getItem('user'))
        uploadDocument({
                "user_id": user && user.user_information_uuid,
                "uploaded_by_role": user && user.role,
                "offer_uuid": basicDetail && basicDetail.property_offers_uuid,
                "property_uuid": basicDetail && basicDetail.property_info_uuid,
                "master_document_name": file.meta.name,
                "master_document_mime": file.meta.type,    
                "master_document_data": file
        }).then((res,err) => {
            if( res.saved){
                setLoading(false)
                setDocumentDisplay(!viewDocuments)
                toast.success('Document is uploaded.')
            }
            else {
                toast.error("Document can't be uploaded")
            }
        })
    }


    const openPopupForMessage = (email) => {
        //console.log( email)
        saveMessage({ ...messageInfo, "receiver_email": email })
        openMessageModal(true)
    }

    const sendMessageInMail = () => {
        //sendMessage
        //console.log(messageInfo, "message info")
        console.log(messageInfo)
        let result = validateMessage(messageInfo)
        console.log(result)
        if(!(Object.keys(result).length > 0)){
            setButtonLoading(true)
            sendMessage(messageInfo)
            .then(res => {
                if(res.send){
                    toast.success('Your message has been sent.')
                    openMessageModal(false)
                    setButtonLoading(false)
                    saveMessage({})
                }
                else {
                    saveMessage({})
                    console.log(res, "response")
                    setButtonLoading(false)
                }
            })
        }
        else {
            setErrorsMsg(result)
        }
    }   

    const submit = () => {
        let result = validate(offer)

        if( basicDetail && basicDetail.current_status!=='Offer Sent' ){
            toast.error('One property offer is already accepted.')
            return 0
        } 

        if( offerCount >= 10){
            toast.error('Maximum offer limit reached for sending offers.')
            setOffer({ 
                'offer_price' : '', 
                'comments' : '', 
            })
            return 0   
        }

        if(!(Object.keys(result).length > 0)){
            setButtonLoading(true)
            let user = JSON.parse(sessionStorage.getItem('user'))
            let data = {...offer, 
                'property_price': basicDetail.property_price , 
                'state': basicDetail.state ,
                'user_id': user.user_information_uuid, 
                'customerEmail': user.user_information_email_address ,
                'property_id': basicDetail.property_info_uuid ,
            }
            console.log(data)
            sendPropertyOffers(data)
            .then(res => {
                if(res.message === 'saved'){
                    toast.success('Offer sent successfully!')
                }
            })
            setTimeout(() => {
                setOffer({ 
                    'offer_price' : '', 
                    'comments' : '', 
                })
                setButtonLoading(false)
            }, 2000)
        }
        else {
            setErrors(result)
        }
    }
    
    // console.log(  basicDetail , offerList ) 
    return(
        <PageLoader show={loaded} message={'Fetching....'}>
        <div className="spacing">
            <div className="propery-tabs-box">
                <div className="container-fluid">
                    <PropertyInfoBlock item={basicDetail}/>
                </div>
            </div>
            <div className="review-request mt-3 mb-3">
                <div className="container-fluid">
                    <p className="m-0">
                        We have reviewed these requests and believe they are valid. We would like to get them fixed, please proceed below.
                    </p>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        {offerList && offerList.length > 0 ? 
                            <BuyerStatus offerList={offerList}/>
                        : <h4>No offer available.</h4>}
                    </div>
                    <div className="col-lg-6">
                        {rolesInfo && rolesInfo.length > 0 ?
                            <CollapsiblePanel
                                openPopupForMessage={openPopupForMessage}
                                broker={broker}
                                agent={agent}
                                inspector={inspector}
                                solicitor={solicitor} 
                            /> 
                        : <div className="buyer-collapse">
                            <h4> No roles assigned to property.</h4>
                        </div> }
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="buyer-offer-section offer-section">
                            <div className="offer-button-box">
                                <ul>
                                    <li><button className="btn" onClick={()=>setViewOfferHistory(true)}>send offers</button></li>
                                    <li><button className="btn offer_history" onClick={()=>setViewOfferHistory(false)}>offers history</button></li>
                                </ul>
                            </div>
                            {viewOfferHistory ? 
                                <React.Fragment>
                                    <ul>
                                        <li className="active">offer available</li>
                                        <li>You have {10 - offerCount } offers left</li>
                                    </ul>
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-6 col-xs-12">
                                                <div className="form-group">
                                                    <label>offer price :</label>
                                                    <input 
                                                        type="number" 
                                                        value={offer.offer_price}
                                                        onChange={(e) => setOffer({ ...offer , 'offer_price' : e.target.value })}
                                                        className="form-control"/>
                                                </div>
                                                {errors['offer_price'] && errors['offer_price'].length > 0 ? 
                                                    <p className="alert">{errors['offer_price'][0]}</p> 
                                                    : null
                                                }
                                            </div>
                                            <div className="col-lg-6 col-xs-12">
                                                <div className="form-group list-price">
                                                    <label>list price :</label>
                                                    <span>{priceFormat(basicDetail.property_price)}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>comments :</label>
                                                    <textarea 
                                                        cols="4" 
                                                        type="text" 
                                                        placeholder = {'Enter Your comments here.'}
                                                        value = {offer.comments}
                                                        onChange={(e) => setOffer({ ...offer , 'comments' : e.target.value })}
                                                        className="form-control">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            disabled={buttonLoading}
                                            type="button" 
                                            onClick={submit}
                                            className="btn">
                                                submit
                                        </button>
                                    </form>
                                </React.Fragment>
                                : <OfferHistory
                                    propertyOffers={propertyOffers}>
                                </OfferHistory> 
                            }
                        </div> 
                    </div> 
                    <div className="col-lg-6">
                        <div className="buyer-offer-section offer-section">
                            <div className="offer-button-box">
                                <ul>
                                    <li><button className="btn" onClick={() => setDocumentDisplay(true)}>Documents</button></li>
                                    <li><button className="btn offer_history" onClick={() => setDocumentDisplay(false)}>document upload</button></li>
                                    {!viewDocuments ? <h5> <br/> Only (.jpeg , .png) are allowed. </h5> : null } 
                                </ul>
                            </div>
                            {!viewDocuments ? 
                               <PageLoader show={loading} message={'Uploading....'}>
                                    <FileUploader 
                                            accept="*/images"
                                            multiple={false}
                                            getUploadParams={uploadOfferDocument}
                                        /> 
                                </PageLoader>
                                : null }
                            {viewDocuments ? <DocumentListView list={documentList}/> : null }
                        </div>
                    </div>
                </div>
            </div>
            <SendMessagePopup  
                buttonLoading={buttonLoading}
                sendMessage={sendMessageInMail}
                open={open} 
                errors = {errorsMsg}
                onClose={() => openMessageModal(false)} 
                messageInfo={messageInfo}
                saveMessage={saveMessage}
            />
         </div>
         </PageLoader>
    )
}

export default BuyerDashboard