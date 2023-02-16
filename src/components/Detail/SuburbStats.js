import React, {  } from 'react'
import ProgressBar from './ProgressBar'


function SuburbStats (props){
	const { data } = props
    return(
        <div>
			<div className="d-flex flex-direction-column suburb-profile-bar">
				<div className="label">12-Month Growth</div>
				<div className="bar">			
					{/* eslint-disable-next-line no-mixed-operators */}
					<ProgressBar value={data && data.one_yr || 0}/>
				</div>
			</div>
			<div className="d-flex flex-direction-column suburb-profile-bar">
				<div className="label">5 Year Median Growth</div>
				<div className="bar">
					{/* eslint-disable-next-line no-mixed-operators */}
					<ProgressBar value={data && data.five_yrs || 0}/>
				</div>
			</div>
			<div className="d-flex flex-direction-column suburb-profile-bar">
				<div className="label">Rental Yield</div>
				<div className="bar">
					{/* eslint-disable-next-line no-mixed-operators */}
					<ProgressBar value={data && data.rental_yield || 0}/>
				</div>
			</div>
			<div className="d-flex flex-direction-column suburb-profile-bar">
				<div className="label">Vacancy Rate</div>
				<div className="bar">
					{/* eslint-disable-next-line no-mixed-operators */}
					<ProgressBar value={data && data.vacancy_rate || 0}/>
				</div>
			</div>
					
        </div>
    )
}

export default SuburbStats