import React, { useState, useEffect } from 'react'
import RangeSlider from 'react-rangeslider'


function ProjectionView (props){
    const [range, setRange] = useState(2)

    
    const horizontalLabels = {
        0  : '2021',
        2  : '2023',
        4  : '2025',
        6  : '2027',
        8  : '2029', 
        10 : '2031'
    }
    
    const cash = parseFloat((props.info.property_info_cash_income * props.projection.rental_yield) / 100) || 0
    const growth = parseFloat((props.info.property_info_growth * props.projection.rental_yield) / 100) || 0
    
    return(
        <div className="projection_box">
            <div className="inver_price">
                <h4>Cash Income<span>{(range > 0) ? `$${(cash * range).toFixed(2)}` : `$${cash}` }</span></h4>
            </div>
            <div className="inver_price">
                <h4>Growth<span>{(range > 0) ? `$${(growth * range).toFixed(2)}` : `$${growth}` }</span></h4>
            </div>
            <RangeSlider
                className="range-slider"
                value={range}
                onChange={setRange} 
                labels={horizontalLabels} 
                min={0} 
                max={10}
                step={2}
            />
        </div>
    )
}

export default ProjectionView