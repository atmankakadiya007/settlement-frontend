import React, { useEffect, useState } from 'react';
import BuyerStatus from '../components/Buyer/BuyerStatus'
import CollapsiblePanel from '../components/Common/CollapsiblePanels'
import { getPropertyStatus } from '../Apis/property';
import { useLocation, useHistory } from 'react-router-dom';


const Dashboard = () => {
    const [statusList, setStatusList] = useState([]);
    const [propertyAddress, setPropertyAddress] = useState('');
    const location = useLocation(),
        redirectPath = useHistory();


    const openPopupForMessage = (email) => {
        //console.log( email)
        // saveMessage({ ...messageInfo, "receiver_email": email })
        // openMessageModal(true)
    }

    useEffect(() => {
        if (!location.state || !location.state.id) {
            redirectPath.push(`/`);
            return;
        }
        getPropertyStatus(location.state.id).then((res) => {
            modifyStatusList(res.property_status);
            setPropertyAddress(res.property_address);
        }).catch((e) => {
            console.log(e.message);
        });
    }, []);

    const modifyStatusList = (opt) => {
        let tempStatusList = [];
        opt.forEach(element => {
            tempStatusList.push({
                id: element.id,
                property_info_uuid: element.property_info_uuid,
                description: element.description,
                offer_updated_at: element.created_at,
                marked_as: element.status,
            });
        });
        setStatusList(tempStatusList);
    }
    const managerPersons = [
        {
            title:'solicitor',
            user_information_fullname: "Mr Mark Spencer",
            user_information_email_address: "Heel@gmail.com",
            user_information_mobile_number: '1234567890',
            user_information_address: 'ABC Conveyancing co. ltd Suite 32-A, Level-5 George St, Bella Vista OLD 3200'
        },
        {
            title:'inspector',
            user_information_fullname: "Mr Jony Chaly",
            user_information_email_address: "Heel@gmail.com",
            user_information_mobile_number: '1234567890',
            user_information_address: 'ABC Conveyancing co. ltd Suite 32-A, Level-5 George St, Bella Vista OLD 3200'
        },
        {
            title:'agent',
            user_information_fullname: "Mr Alex Build",
            user_information_email_address: "Heel@gmail.com",
            user_information_mobile_number: '1234567890',
            user_information_address: '76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland.'
        },
        {
            title:'broker',
            user_information_fullname: "Mr Loz Tata",
            user_information_email_address: "Heel@gmail.com",
            user_information_mobile_number: '1234567890',
            user_information_address: '76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland.'
        }
    ];
    const solicitor = {
        user_information_fullname: "Mr Mark Spencer",
        user_information_email_address: "Heel@gmail.com",
        user_information_mobile_number: '1234567890',
        user_information_address: 'ABC Conveyancing co. ltd Suite 32-A, Level-5 George St, Bella Vista OLD 3200'
    };

    const inspector = {
        user_information_fullname: "Mr Jony Chaly",
        user_information_email_address: "Heel@gmail.com",
        user_information_mobile_number: '1234567890',
        user_information_address: 'ABC Conveyancing co. ltd Suite 32-A, Level-5 George St, Bella Vista OLD 3200'

    }

    const agent = {
        user_information_fullname: "Mr Alex Build",
        user_information_email_address: "Heel@gmail.com",
        user_information_mobile_number: '1234567890',
        user_information_address: '76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland.'

    }

    const broker = {
        user_information_fullname: "Mr Loz Tata",
        user_information_email_address: "Heel@gmail.com",
        user_information_mobile_number: '1234567890',
        user_information_address: '76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland. 76 Seninis Road Parkside, Queensland.'
    }

    return (
        <section className='container-fluid dashboard-section'>
            <div className='py-3 px-5 mt-3 address-box d-flex justify-content-between position-relative'>
                <div>
                    <h2>{propertyAddress && propertyAddress}</h2>
                    <div className='d-flex justify-content-between villa-btn'>
                        <p className='m-0'>Sydney NSW</p>
                    </div>
                </div>
                <div className='offer-accepted position-absolute text-white'>
                    <p className='m-0'>Offer Accepted</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6 my-3'>
                    {
                        statusList.length ? <BuyerStatus offerList={statusList} /> : <div className='address-box h-100 d-flex justify-content-center align-items-center'>
                            <h5>No status found</h5>
                        </div>
                    }
                </div>
                <div className='col-lg-6 mt-3'>
                     <CollapsiblePanel solicitor={solicitor} inspector={inspector} agent={agent} broker={broker} openPopupForMessage={openPopupForMessage} />
                </div>
            </div>
        </section>
    )
}

export default Dashboard;