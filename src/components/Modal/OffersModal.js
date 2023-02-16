import React, { useState, useEffect } from 'react'
import { priceFormat } from '../../utils/common'
import moment from 'moment'
import { toast } from 'react-toastify'
import Loader from 'react-loader-spinner'
import { validate } from '../../validations/offerModal'
import { Modal } from 'react-responsive-modal'

const OffersModal = (props) => {
    const [ offer, setOffer] = useState({ 'offer_price' : '0'})
    const { property = {}, offerList = [] } = props
    const [ buttonLoading, setButtonLoading] = useState(false)
    const [ errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({})
        //setOffer({ 'offer_price' : '0'})
    }, [offer])

    const submit = () => {
        let result = validate(offer)
        let ifAccepted = (offerList.length > 0) && offerList.filter(offer => (offer.is_accepted === 'Yes')) || []
        if( ifAccepted.length > 0 ){
            toast.error('One property offer is already accepted.')
            return 0
        } 

        if(offerList.length >= props.offerLimit){
            toast.error('Maximum offer limit reached for sending offers.')
            setOffer({ 
                'offer_price' : '', 
                'comments' : '', 
                'property_price': '', 
                'state': ''
            })
            return 0   
        }
        if(!(Object.keys(result).length > 0)){
           setButtonLoading(true)
            props.sendPropertyOffer({ ...offer, 
                'property_price': property && property.property_info_list_price, 
                'state': property && property.state
            })
            setTimeout(() => {
                setOffer({ 
                    'offer_price' : '', 
                    'comments' : '', 
                    'property_price': '', 
                    'state': ''
                })
                setButtonLoading(false)
                props.onClose()
                //document.getElementById('cancel-btn').click()
            }, 2000)
        }
        else {
                // setOffer({ 
                //     'offer_price' : '', 
                //     'comments' : '', 
                //     'property_price': '', 
                //     'state': ''
                // })
                setErrors(result)
            }
    }   

    const list_price = property && property.property_info_list_price

    const setOfferPrice = (value) => {
        //if( value <= list_price && value > 0 )
            setOffer({...offer, 'offer_price': value})
        // else 
        //     toast.error(`Offer price shouldn't be greater than listed price.`)
    }


    const showAgent = (props.role === "AGENT") 
    return (
        <Modal open={props.show} onClose={() => {
            setOffer({ 'offer_price' : '0'})
            props.onClose()
        }}>
            <div className="modal-header">
                <h5 className="modal-title" id="offerModalLabel">{property.location && property.location[0] ? property.location[0].master_location_street_address : null } </h5>
                {/* <button id="cancel-btn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> */}
            </div> 
            <div className="modal-body">
                <div className="offer-section">
                    {offerList.length > 0 ? <ul>
                        <li className="active">offer available</li>
                        {showAgent ? <li>{`You have ${offerList.length} offer/s available`}</li> : <li>{`You have ${offerList.length} offer/s sent`}</li>}
                    </ul> : null}
                    {!showAgent && <form>
                        <div className="row">
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <label>Offer price :</label>
                                    <input 
                                        type="number" className="form-control" 
                                        value={offer && offer.offer_price} 
                                        onChange={(e) => setOfferPrice(e.target.value)}/>
                                </div>
                                {errors['offer_price'] && errors['offer_price'].length > 0 ? <p className="alert">{errors['offer_price'][0]}</p> : null}
                            </div>
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group list-price">
                                    <label>List price :</label>
                                    <input 
                                        type="number" className="form-control" 
                                        value={list_price}
                                        />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Comments :</label>
                                    <textarea 
                                        cols="4" type="text" 
                                        className="form-control"
                                        value={offer && offer.comments}
                                        onChange={(e) => setOffer({...offer, 'comments': e.target.value })}
                                    />
                                </div>
                            </div>

                        </div>
                        <button 
                            disabled={buttonLoading} 
                            className="btn pink_btn" 
                            type="button" 
                            onClick={submit}>
                                {buttonLoading ? 
                                    <Loader type="ThreeDots" color="#FFFFFF" height={20} width={30}/>
                                    : 'Submit'
                                }
                        </button>
                    </form>}
                    {offerList.length > 0 ? 
                        <div className="offer-list">
                            <ul>
                                {offerList.map((offer, index )=> {
                                    return (
                                        <OfferItem  
                                            key={index} 
                                            data={offer} 
                                            offerNo={(index + 1)}/>)
                                    })}
                            </ul>
                        </div> : 
                        <div className="offer-list">
                            <ul><li>No offer found</li></ul>
                        </div>}
                </div>
            </div>
        </Modal>)
}
export default OffersModal

const OfferItem = (props) => {
    return(
        <li>
            {!((props.data.is_accepted === 'Yes')||( props.data.is_rejected === 'Yes')) ? 
                <div className="row">
                    <div className="col-lg-4 col-7">
                        <span>{`Offer ${props.offerNo}`} <p>sent on <i className="fa fa-check"></i></p></span>
                    </div>
                    <div className="col-lg-4 col-5">
                        <p>{moment(props.data.property_offers_created_date).format('MM/DD/YYYY')}</p>
                    </div>
                    <div className="col-lg-4 col-12">
                        <span>{priceFormat(props.data.property_offers_price)}</span>
                    </div>
                </div>
            : <div className="row">
                <div className="col-lg-4 col-6">
                    <span>{`Offer ${props.offerNo}`} <p>sent on <i className="fa fa-check"></i></p></span>
                </div>
                <div className="col-lg-3 col-4">
                    <p>{moment(props.data.property_offers_created_date).format('MM/DD/YYYY')}</p>
                </div>
                <div className="col-lg-3 col-10">
                    <span>{priceFormat(props.data.property_offers_price)}</span>
                </div>
                <div className="col-lg-2 col-4">
                    <span>{ (props.data.is_accepted === 'Yes') ? 'Accepted' : 
                        (props.data.is_rejected ==='Yes') ? 'Rejected' : 'N/A'}</span>
                </div>
            </div>}
        </li>
    )
}