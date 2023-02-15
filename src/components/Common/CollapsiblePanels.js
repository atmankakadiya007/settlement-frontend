import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'


const CollapsibleItem = (props) => {
    const rotateArrowHandler = (key) => {
        if(props.stateValue === key){
            props.onArrowClick(0)
        }else{
            props.onArrowClick(key)
        }
    }
    return (<Card>
        <Card.Header className="card-header p-0 custom-card">
            <Accordion.Toggle onClick={() => rotateArrowHandler(props.eventKey)}  as={Button} className="d-flex justify-content-between aling-items-center w-100" variant="link" eventKey={props.eventKey}>
                <div className='d-flex aling-items-center'>
                    <h2 className="mb-0">
                        <span className="btn btn-link p-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {props.title} :
                        </span>
                    </h2>
                    <p className="mb-0">&nbsp;{props.name}</p>
                </div>
                <i className={`fa fa-angle-down rotate-arrow ${props.stateValue === props.eventKey ? 'rotate-180deg' : 'rotate-0deg'}`} ></i>
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={props.eventKey}>
            <Card.Body className="card-body p-0">
                {props.children}
            </Card.Body>
        </Accordion.Collapse>
    </Card>)
}


function CollapsiblePanel(props) {
    const [tempState, setTempState] = useState(1);
    return (
        <div className="buyer-collapse">
            <Accordion defaultActiveKey={1}>
                <CollapsibleItem title={'My Solicitor'}  onArrowClick={setTempState} stateValue={tempState} name={props.solicitor.user_information_fullname} eventKey={1}>
                    <ul>
                        {/* eslint-disable-next-line no-mixed-operators */}
                        <li style={{ width: '35%' }}>{props.solicitor && props.solicitor.user_information_address || ''}</li>
                        <li>Email : {props.solicitor && props.solicitor.user_information_email_address}</li>
                        <li>Ph : {props.solicitor && props.solicitor.user_information_mobile_number}</li>
                        <button className="btn" onClick={() => props.openPopupForMessage(props.solicitor.user_information_email_address)}>message me</button>
                    </ul>
                </CollapsibleItem>

                <CollapsibleItem title={'Building & Pest Inspector'} onArrowClick={setTempState} stateValue={tempState} name={props.inspector.user_information_fullname} eventKey={2}>
                    <ul>
                        {/* eslint-disable-next-line no-mixed-operators */}
                        <li style={{ width: '35%' }}>{props.inspector && props.inspector.user_information_address || ''}</li>
                        <li>{props.inspector && props.inspector.user_information_email_address}</li>
                        <li>{props.inspector && props.inspector.user_information_mobile_number}</li>
                        <button className="btn" onClick={() => props.openPopupForMessage(props.inspector.user_information_email_address)}>message me</button>
                    </ul>
                </CollapsibleItem>
                <CollapsibleItem title={'My Agent'} onArrowClick={setTempState} stateValue={tempState} name={props.agent.user_information_fullname} eventKey={3}>
                    {/* eslint-disable-next-line no-mixed-operators */}
                    <ul>
                        <li style={{ width: '35%' }}>{props.agent && props.agent.user_information_address || ''}</li>
                        <li>{props.agent && props.agent.user_information_email_address}</li>
                        <li>{props.agent && props.agent.user_information_mobile_number}</li>
                        <button className="btn" onClick={() => props.openPopupForMessage(props.agent.user_information_email_address)}>message me</button>
                    </ul>
                    {/* <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aut</p> */}
                </CollapsibleItem>
                <CollapsibleItem title={'My Financial Broker'} onArrowClick={setTempState} stateValue={tempState} name={props.broker.user_information_fullname} eventKey={4}>
                    <ul>
                        {/* eslint-disable-next-line no-mixed-operators */}
                        <li style={{ width: '35%' }}>{props.broker && props.broker.user_information_address || ''}</li>
                        <li>{props.broker && props.broker.user_information_email_address}</li>
                        <li>{props.broker && props.broker.user_information_mobile_number}</li>
                        <button className="btn" onClick={() => props.openPopupForMessage(props.broker.user_information_email_address)}>message me</button>
                    </ul>
                </CollapsibleItem>
            </Accordion>
        </div>
    )

}

export default CollapsiblePanel