import React from 'react'

function NotifySettings (){
    return(
        <div className="box notification">
            <h4 className="d-flex align-items-center">Notification Settings</h4>
            <ul>
               <li>Add your work emial to unlock extra perks for business trips.</li>
               <li><button type="button" className="btn fb"><img src="images/social/fb.png" alt=""/> connect</button> Connect with Facebook to complete your profile and make it easy to log in.</li>
               <li>Get references from friends-it’s easier to book a place when hosts know a little about you.</li>
               <li>Invite a friend, earn $100.</li>
            </ul>
        </div>

    )
}

export default NotifySettings