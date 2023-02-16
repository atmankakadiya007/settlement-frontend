import React, { useEffect, useState } from 'react'
import { Route } from "react-router-dom";
import Home from '../../containers/Home';


function PrivateRoute(props) {
    const [ loggedIn, setLoginStatus] = useState(false)
    
    useEffect(() => {
        let res = JSON.parse(sessionStorage.getItem('user')) ||  {}
		if(res && res.user_information_uuid){
            setLoginStatus(true)
        }
    }, [])
    
    if(loggedIn){
        return <Route path={props.path} component={props.component}/>
    }
    else{
        return <Route path={'/'} component={Home}/> 
    }
    
}

export default PrivateRoute
