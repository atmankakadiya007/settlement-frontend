import React from 'react'
import SuburbStats from './SuburbStats'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressBar from './ProgressBar'

const info = [
    {
        "label":'Under 20',
        "value": '25'
    },
    {
        "label":'20-39',
        "value": '24'
    },
    {
        "label":'40-59',
        "value": '18'
    },
    {
        "label":'60+',
        "value": '10'
    }
]

const circleStyles = {
    textSize: '16px',
    pathColor: `#ff385c`,
    textColor: '#000',
    trailColor: '#D3D3D3',
    backgroundColor: ' #ff385c'
} 


function NeighbourhoodStats (props) {
    return(
        <div className="d-flex neighbourhood-box">
            <div className="w-100">
                <span  className="mb-2" style={{ fontFamily: 'mulibold', color: '#7e8594'}}>AGE</span>
                
                    <div className="d-flex flex-direction-column suburb-profile-bar">
                        <div className="label">Under 20</div>
                        <div className="bar">
                            <ProgressBar value={props.projection && props.projection.age_under_20 }/>
                        </div>
                    </div>
                    <div className="d-flex flex-direction-column suburb-profile-bar">
                        <div className="label">20-39</div>
                        <div className="bar">
                            <ProgressBar value={props.projection && props.projection.age_20_39}/>
                        </div>
                    </div>
                    <div className="d-flex flex-direction-column suburb-profile-bar">
                        <div className="label">40-59</div>
                        <div className="bar">
                            <ProgressBar value={props.projection && props.projection.age_40_59}/>
                        </div>
                    </div>
                    <div className="d-flex flex-direction-column suburb-profile-bar">
                        <div className="label">60+</div>
                        <div className="bar">
                            <ProgressBar value={props.projection && props.projection.age_60_plus}/>
                        </div>
                    </div>
                
                
            </div>
            <div className="w-40 d-flex align-items-center flex-column">
                <span className="mb-2" style={{ fontFamily: 'mulibold', color: '#7e8594'}}>AGE</span>
                <CircularProgressbar 
                    className={'circle-progress'} 
                    styles={buildStyles(circleStyles)} 
                    value={props.projection && props.projection.age_percentage || 0} text={`${props.projection && props.projection.age_percentage || 0 }%`}/>
            </div>
            <div className="w-70 neighbourhood-insite">
                <div className="mb-3 suburb-profile-bar">
                <div className="d-flex head-0">OWNER <span className="ml-auto">RENTER</span></div>
                <ProgressBar value={props.projection && props.projection.owner_percentage}/>
                </div>
                <div className="suburb-profile-bar">
                <div className="d-flex head-0">FAMILY <span className="ml-auto">SINGLE</span></div>
                <ProgressBar value={props.projection && props.projection.family_percentage}/>
                </div>
            </div>
        </div>
    )
}




export default NeighbourhoodStats