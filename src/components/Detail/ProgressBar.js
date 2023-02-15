import React from 'react'


function ProgressBar (props) {
    return(
        <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={props.value}
                aria-valuemin="1" aria-valuemax="100" style={{ width: `${props.value}%` }}>
                {(props.value > 0) ? `${props.value}%` : `0%` }
            </div>
        </div>
    )
}

export default ProgressBar