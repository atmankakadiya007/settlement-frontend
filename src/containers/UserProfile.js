import React, { useEffect, useState } from 'react'
import BasicDetails from '../components/Profile/BasicDetails'
import Transactions from '../components/Profile/Transactions'
import Referrels from '../components/Profile/Referrels'
import NotifySettings from '../components/Profile/NotifySettings'
import PayDetails from '../components/Profile/PayDetails'
import PricingSection from '../components/Home/PricingSection'
import Plans from '../components/Profile/Plans'
import { getPricingPackages } from '../actions/common'
import { connect } from 'react-redux'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from '../components/Modal/PaymentModal';
import { toast } from 'react-toastify'
import { 
    processPayment, 
    fetchUserProfile, 
    updateUserProfile, 
    fetchTransactions 
} from '../Apis/auth';
import { validate } from '../validations/profile'


function UserProfile(props) {
    const stripe =loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)
    const [ show, setShow ] = useState(false)
    const [ seletedPlan, setSelectedPlan ] = useState(1)
    const [ user, setUser] = useState({})
    const [ editMode, setEditMode] = useState(false)
    const [ userInfo, setInfo] = useState({})
    const [ transactions, saveTransactions] = useState([])
    const [ errors, setErrors] = useState({})

    useEffect(() => {
        props.getPackages()
        let info = JSON.parse(sessionStorage.getItem('user'))
        if(info && info.user_information_uuid){
            setUser(info)
            fetchUserDetails({ 'user_id': info.user_information_uuid })
            fetchTransactionHistory({ 'user_id': info.user_information_uuid })
            if( info.plan_uuid === null) {
                scrolldiv('myplan')
            }
        }
        setErrors({})
    }, [])


    const fetchTransactionHistory = (id) => {
        fetchTransactions(id)
            .then(res => {
                if(res && res.status){
                    toast.error(res.response)
                }
                else {
                    saveTransactions(res)
                }
            }) 
    }

    const fetchUserDetails = (id) => {
        fetchUserProfile(id)
            .then(res => {
                if(res && res.status){
                    toast.error(res.response)
                }
                else {
                    setInfo(res[0])
                }
            })            
    }

    const updateUser = () => {
        let validResult = validate(userInfo)
        setErrors(validResult)
        
        if(!Object.keys(validResult).length > 0){
            updateUserProfile({
                "user_id": userInfo && userInfo.user_information_uuid,
                "full_name": userInfo && userInfo.user_information_fullname,
                "email": userInfo && userInfo.user_information_email_address,
                "mobile_number": userInfo && userInfo.user_information_mobile_number
            }).then(res => {
                if( res && res.response){
                    toast.error(res.response.data.response)
                }
                else {
                    fetchUserDetails({ 'user_id': user.user_information_uuid })
                    setEditMode(false)
                    if(res && res.length > 0 ){
                        toast.success('Profile updated successfully')
                    }   
                }
            })
        }        
    }


    const pay = (token) => {
        processPayment({
            "amount": props.packages[seletedPlan]["amount"],
            "description": props.packages[seletedPlan]["plan_description"],
            "token": token, 
            "user_id": user && user.user_information_uuid, 
            "package_id": props.packages[seletedPlan]['plan_uuid']
        }).then(res => {
            if(res && res.status){
                toast.error(res.response)
            }
            else {
                setShow(false)
                fetchUserDetails({ 'user_id': user.user_information_uuid })
                fetchTransactionHistory({ 'user_id': user.user_information_uuid })
                toast.success('Payment Succeeded.')
            }
        })
    }
    const findPosition = (obj) => { 
		var currenttop = 0; 
		if (obj.offsetParent) { 
			do { 
				currenttop += obj.offsetTop; 
			} while ((obj = obj.offsetParent)); 
			return [currenttop]; 
		} 
	} 

    const scrolldiv = (tab) =>  { 
		// let splitted = tab.split(' ')
		// if(splitted.length > 1) {
		// 	let scrollP =  splitted.join('-')
		// 	window.scrollTo(0, findPosition(document.getElementById(scrollP.toLowerCase()))); 
		// }
		// else {
			window.scrollTo(0, findPosition(document.getElementById(tab.toLowerCase())));
	}

    return(
        <section className="profile-main">
            <div className="container">
                <BasicDetails 
                    info={userInfo} 
                    updateInfo={setInfo} 
                    editMode={editMode}
                    updateUser={updateUser} 
                    setEditMode={setEditMode}
                    errors={errors}
                />
                <Transactions transactions={transactions}/>
                <Referrels/>
                {/* <NotifySettings/> */}
                {/* <PayDetails/> */}
                
                {/* <div className="box pricing" id="myplan">
                    <h4 className="d-flex align-items-center">My Plans</h4>
                    <h4 className="d-flex align-items-center">My Plans</h4>
                    <section className='pricing_section py-0'>
                        <PricingSection className="pricing_section" />
                    </section>
                    comment in
                    <Plans setSelectedPlan={setSelectedPlan} selected={userInfo && userInfo.plan_uuid}
                        packages={props.packages} hideRegister={false} setShow={setShow}/>
                </div>   */}
            </div>
            <Elements stripe={stripe}>
                <PaymentModal 
                    show={show} 
                    pay={pay}
                    plan={props.packages[seletedPlan]}
                    onClose={() => setShow(false)}/>
            </Elements>
        </section>
    )
}

const mapStateToProps = state => ({
    packages : state.common.packages 
  })
  
const mapDispatchToProps = dispatch => ({
    getPackages: () => dispatch(getPricingPackages())
})  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);