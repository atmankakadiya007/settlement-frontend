import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import { toast } from 'react-toastify'
import { RoleActionsCombo } from "../../constants/data";


// offer_uuid, changed_by, user_id, offer_status_uuid, current_status

function UpdateStatusModal (props) {
    
    const [ selected, setSelectedStatus ] = useState('')

    const { offerStatusList = [] } = props

    const validateOfferUpdate = (id) => {
        if( id !== ''){

            
            let selectedOfferStatus = offerStatusList.find(offer => (offer.property_offer_status_uuid === id)) 
            console.log(selectedOfferStatus, "selected")
            props.updateOffer(selectedOfferStatus)          
        }
        else {
            toast.error('Please select status.')
        }
    }


    const findInterSection = (list1 , list2, property) => {
        //console.log( list1, list2, "test")
        let intersectedList = list1.filter(value => list2.includes(value[property]));
        return intersectedList
    }

    let list =  props.userInfo && RoleActionsCombo[props.userInfo.role]
    //console.log(props.userInfo && props.userInfo.role , props.userInfo && RoleActionsCombo[props.userInfo.role], "test" )
    let intersected = (offerStatusList.length > 0) ? findInterSection(offerStatusList, list, 'status') : null
    return(
        <Modal open={props.show} onClose={props.onClose} center>
            <div className="modal-header">
                <h5 className="modal-title" id="pricingModalLabel">Update Status</h5>
            </div>
            <div className="modal-body">
            <select className="form-control" id="state-filter" onChange={e => setSelectedStatus(e.target.value)}>
                <option value="">Select Status</option>
                {intersected && 
                    intersected.map((offer,index) => <option key={index} value={offer.property_offer_status_uuid}>{offer.status}</option>)}		
            </select> 
            </div>
            <div className="modal-footer">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={() => validateOfferUpdate(selected)}
                        type="button" className="btn btn-secondary left-button">Update</button>
                    <button  
                        onClick={props.onClose}
                        type="button" 
                        className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default UpdateStatusModal