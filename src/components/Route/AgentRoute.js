import React, { useEffect, useState } from 'react'
import { Route } from "react-router-dom";
import Home from '../../containers/Home';
import { verifyUserRole } from '../../Apis/auth'

function AgentRoute(props) {
    const [ loggedIn, setLoginStatus] = useState(false)
    const [ role, setRole] = useState('')
    
    useEffect(() => {
        let res = JSON.parse(sessionStorage.getItem('user')) ||  {}
		if(res && res.user_information_uuid){
            setLoginStatus(true)
            verifyRole(res.user_information_uuid)
        }
    }, [])

    const verifyRole = (id) => {
        verifyUserRole({ 'user_id': id })
            .then(res => {
                setRole(res.user_role_mapping_role)
            })
    }
    
    if((role === 'AGENT')){
        return <Route path={props.path} component={props.component}/>
    }
    else{
        return <Route path={'/default'} component={Home}/> 
    }
    
}

export default AgentRoute
