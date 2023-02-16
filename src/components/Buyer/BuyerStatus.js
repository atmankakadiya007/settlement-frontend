import React from 'react'
import moment from 'moment'

function BuyerStatus(props) {

    const { offerList = [] } = props
    return (
        <div className="buyer-status">
            <ul>
                {offerList && offerList.length > 0 ?
                    offerList.map((offer, index) => {
                        let statusClass = '';
                        switch (offer.marked_as) {
                            case "Pending":
                                statusClass = 'pending';
                                break;
                            case "COMPLETE":
                                statusClass = 'complete';
                                break;
                            case "ASSIGNED":
                                statusClass = 'assigned';
                                break;
                            case "DUE":
                                statusClass = 'due';
                                break;
                            default:
                                break;
                        }
                        return <li key={index} >
                            <div><h5>{moment(offer.offer_updated_at).format('MMM DD, YYYY')}</h5></div>
                            <div><span className={statusClass}>{offer.marked_as}</span></div>
                            <div><h5>{offer.description}</h5></div>
                        </li>
                    }
                    ) :
                    <ul>
                        <li>
                            <div><h5>May 01,2020</h5></div>
                            <div><span className="due">due</span></div>
                            <div><h5>Cooling off Period</h5></div>
                        </li>
                        <li>
                            <div><h5>May 01,2020</h5></div>
                            <div><span className="pending">pending</span></div>
                            <div><h5>Pay inked Deposit</h5></div>
                        </li>
                        <li>
                            <div><h5>May 01,2020</h5></div>
                            <div><span className="assigned">assigned</span></div>
                            <div><h5>Pay inked Deposit</h5></div>
                        </li>
                    </ul>
                }
            </ul>
        </div>
    )
}

export default BuyerStatus