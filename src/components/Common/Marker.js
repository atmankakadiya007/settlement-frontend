import React from 'react'
import { Fragment } from 'react'
import InfoWindow from '../Map/InfoWindow'

const Marker = (props) => {
	return ( 
        <Fragment >
            <div onClick={() => props.showInfoWindow(true)} >
                <i onClick={() => props.showInfoWindow(true)}
                    className="fa fa-map-marker dot" 
                    aria-hidden="true" 
                    title={props.address}/>
                {props.show  && 
                <InfoWindow show={props.show}
                    item={props.property}
                    onClick={() => props.goToDetail(props.propertyID, props.property)}/>}
            </div>

        </Fragment>
    )
}

export default Marker
