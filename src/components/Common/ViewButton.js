import React from 'react'
import { Link } from 'react-router-dom'

function ViewButton (props){
    return(
        <div className="right-panel ml-auto">
            <Link to={props.redirect} className="btn btn-outline-secondary"> View More  </Link>
        </div>
    )
}

export default ViewButton