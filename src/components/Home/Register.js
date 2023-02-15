import React, { useEffect, useState, useRef } from "react";
import 'bs-stepper/dist/css/bs-stepper.min.css';
import { getSinglePackage, registerAPI, processPayment } from '../../Apis/auth';
import { changeLoggedInStatus } from '../../actions/common';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { addProperty, deleteProperty } from '../../Apis/property';
import { deleteUser } from '../../Apis/auth';

const options = {
    componentRestrictions: { country: "au" },
};

const Register = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const formValidationProp = {
        isPropertyPlaceValid: true,
        isFirstNameValid: true,
        isLastNameValid: true,
        isMobileNumberValid: true,
        isEmailValid: true,
        isPasswordValid: true,
    };

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [checkFormValidation, setCheckFormValidation] = useState(formValidationProp),
        [isBtnSubmitted, setIsBtnSubmitted] = useState(false),
        [propertyPlace, setPropertyPlace] = useState(),
        [plan, setPlan] = useState(),
        [isPaymentLoading, setPaymentLoading] = useState(false),
        [isPaymentSuccess, setIsPaymentSuccess] = useState(false),
        [attchedFileData, setAttchedFileData] = useState({}),
        [propertyInfoUuid, setPropertyInfoUuid] = useState(false),
        [user, setUser] = useState();


    const location = useLocation(),
        redirectPath = useHistory();

    const firstName = useRef(),
        lastName = useRef(),
        mobileNumber = useRef(),
        email = useRef(),
        password = useRef(),
        attachFile = useRef(),
        isChecked = useRef(),
        attachedFile = useRef();

    useEffect(() => {
        if (!location.state || !location.state.id) {
            redirectPath.push(`/`);
            return;
        }
        let info = JSON.parse(sessionStorage.getItem('user'))
        if (info && info.user_information_uuid) {
            setUser(info);
        }
        getPackage();
        
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            setPropertyPlace(place);
        });
    }, []);

    const getPackage = () => {
        getSinglePackage(location.state.id).then((res) => {
            if (res.length) {
                setPlan(res[0]);
            } else {
                redirectPath.push(`/`);
            }
        }).catch((e) => {
            console.log(e.message);
        });
    }

    const onValChangeHandler = (evt) => {
        if (evt.target.name === "location") {
            const valLength = evt.target.value.trim().length;
            setCheckFormValidation((prevData) => { return { ...prevData, isPropertyPlaceValid: valLength ? true : false } });
        }
        if (isBtnSubmitted && evt.target.name !== "location") handleInputsValidation();
    }

    const pay = (token) => {
        let info = JSON.parse(sessionStorage.getItem('user'));
        processPayment({
            "amount": plan.amount,
            "description": plan.plan_description,
            "token": token,
            "user_id": info.user_information_uuid,
            "package_id": plan.plan_uuid,
            "property_lat": propertyPlace[0].geometry.location.lat(),
            "property_long": propertyPlace[0].geometry.location.lng()
        }).then(res => {
            if (res && res.status) {
                if (user) {
                    deleteProperty({ user_id: info.user_information_uuid, property_id: propertyInfoUuid });
                } else {
                    deleteUser({ user_id: info.user_information_uuid });
                }
                toast.error(res.response);
            }
            else {
                setTimeout(() => {
                    setPaymentLoading(false);
                    setIsPaymentSuccess(true);
                }, 1000);
            }
        });
    }

    const getInputValues = () => {
        return {
            propertyPlaceVal: propertyPlace,
            firstNameVal: !user && firstName.current.value,
            lastNameVal: !user && lastName.current.value,
            mobileNumberVal: !user && mobileNumber.current.value,
            emailVal: !user && email.current.value,
            passwordVal: !user && password.current.value,
            isFilePdf: undefined
        }
    }

    const handleInputsValidation = () => {
        const { propertyPlaceVal, firstNameVal, lastNameVal, mobileNumberVal, passwordVal, emailVal } = getInputValues();
        setCheckFormValidation((prevData) => {
            return {
                ...prevData,
                isPropertyPlaceValid: propertyPlaceVal !== undefined,
                isFirstNameValid: firstNameVal.length !== 0,
                isLastNameValid: lastNameVal.length !== 0,
                isMobileNumberValid: mobileNumberVal.length !== 0 && mobileNumberVal.length === 10,
                isEmailValid: emailVal.length !== 0 || emailVal.includes('@') === true,
                isPasswordValid: passwordVal.length !== 0 && passwordVal.length >= 9,
                isFilePdf: attchedFileData.file ? attchedFileData.file.type === "application/pdf" ? true : false : undefined,
            }
        });
    }

    const encodeImageFileAsURL = (file) => {
        return new Promise((resolve) => {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result)
            }
            reader.readAsDataURL(file);
        })
    }

    const handleSubmit = async () => {
        const { propertyPlaceVal, firstNameVal, lastNameVal, mobileNumberVal, passwordVal, emailVal } = getInputValues();
        setIsBtnSubmitted(true);
        handleInputsValidation();
        if (user) {
            if (propertyPlaceVal == undefined || !isChecked.current.checked) {
                return;
            }
            createStripeToken();
        } else {
            if (propertyPlaceVal == undefined || !isChecked.current.checked || firstNameVal.length === 0 || lastNameVal.length === 0 || mobileNumberVal.length === 0 || mobileNumberVal.length !== 10 || emailVal.length === 0 || emailVal.includes('@') !== true || passwordVal.length === 0 || passwordVal.length <= 8 || checkFormValidation.isFilePdf === false) {
                return;
            }
            createStripeToken();
        }
    }

    const callRegisterAPI = (token) => {
        const { firstNameVal, lastNameVal, mobileNumberVal, passwordVal, emailVal } = getInputValues();
        const payload = {
            "email": emailVal,
            "firstName": firstNameVal,
            "lastName": lastNameVal,
            "phone": mobileNumberVal,
            "password": passwordVal,
            "user_role_mapping_role": "CUSTOMER"
        }
        registerAPI(payload).then((res) => {
            if (res.length) {
                sessionStorage.setItem('user', JSON.stringify(res[0]));
                addPropertyHandler(token, res[0]);
            } else {
                errorHandler(res);
            }
        });
    }
    const createStripeToken = () => {
        const card = elements.getElement(CardElement);
        stripe.createToken(card).then((data) => {
            if (user) {
                addPropertyHandler(data.token.id);
            } else {
                callRegisterAPI(data.token.id);
            }
        }).catch((e) => {
            setPaymentLoading(false);
            toast.error("Need to insert card details before click on pay button.");
        });
    }

    const addPropertyHandler = async (token, res = {}) => {
        const data = attchedFileData.file ? await encodeImageFileAsURL(attchedFileData.file) : '';
        const { propertyPlaceVal } = getInputValues();
        let property_payload = {
            user_information_uuid: user ? user.user_information_uuid : res.user_information_uuid,
            property_info_location: propertyPlaceVal[0].formatted_address,
            facilities: [],
            highlight: [],
            highlights: '',
            property_images: attchedFileData.file ? [data] : [],
            property_images_name: attchedFileData.file ? [attchedFileData.file.name] : [],
        }
        addProperty(property_payload).then((res) => {
            setPropertyInfoUuid(res.property_info_uuid);
            setPaymentLoading(true)
            pay(token)
        }).catch((e) => {
            !user && deleteUser({ user_id: res.user_information_uuid });
            console.log(e.message);
        });
    }

    const errorHandler = (res) => {
        switch (res.response.status) {
            case 400:
                toast.error(res.response.data.error || res.message);
                break;
            default:
                toast.error(res.message);
                break;
        }
    }

    const goToDashboardHandler = () => {
        setIsPaymentSuccess(true);
        dispatch(changeLoggedInStatus());
        redirectPath.push({
            pathname: '/dashboard',
            state: {
                id: propertyInfoUuid,
            },
        });
    }


    const onFileChange = () => {
        const file = attachFile.current.files[0];
        if (file) {
            attachedFile.current.value = file.name;
            setAttchedFileData({
                isFileAttach: true,
                file
            });
            setCheckFormValidation((prevData) => { return { ...prevData, isFilePdf: file.type === "application/pdf" ? true : false } });
        }
    }

    const onAttachedFileRemove = () => {
        attachedFile.current.value = "";
        setAttchedFileData({
            isFileAttach: false,
        });
        setCheckFormValidation((prevData) => { return { ...prevData, isFilePdf: undefined } })
    }

    return (
        <section className="container mt-5 mb-5">
            <div className="register_custom_card custom-card-border">
                {
                    !isPaymentSuccess && <React.Fragment>
                        <div className="text-center">
                            <h1>Let's get started</h1>
                            <p>Before we can get things moving, we just need you to confirm a few extra details.</p>
                        </div>

                        {
                            !user && <div className="my-5">
                                <h4 className="mb-4">Your details</h4>
                                <p>Primary Purchaser</p>
                                <div className="row custom-reg-input">
                                    <div className="col-md-4 form-group">
                                        <input
                                            type="text"
                                            ref={firstName}
                                            className={`form-control ${!checkFormValidation.isFirstNameValid && 'border-danger'}`}
                                            id="firstName"
                                            onChange={onValChangeHandler}
                                            placeholder="Your first name"
                                        />
                                        {!checkFormValidation.isFirstNameValid && <small className="text-danger">First name is required.</small>}
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <input
                                            type="text"
                                            ref={lastName}
                                            className={`form-control ${!checkFormValidation.isLastNameValid && 'border-danger'}`}
                                            id="firstName"
                                            onChange={onValChangeHandler}
                                            placeholder="Your last name"
                                        />
                                        {!checkFormValidation.isLastNameValid && <small className="text-danger">Last name is required.</small>}
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <input
                                            type="number"
                                            ref={mobileNumber}
                                            className={`form-control ${!checkFormValidation.isMobileNumberValid && 'border-danger'}`}
                                            id="firstName"
                                            onChange={onValChangeHandler}
                                            placeholder="Your mobile number"
                                        />
                                        {!checkFormValidation.isMobileNumberValid && <small className="text-danger">Mobile number is required.</small>}
                                    </div>
                                </div>
                                <div className="row custom-reg-input">
                                    <div className="form-group col-md-6">
                                        <input
                                            type="email"
                                            ref={email}
                                            className={`form-control ${!checkFormValidation.isEmailValid && 'border-danger'}`}
                                            id="email"
                                            onChange={onValChangeHandler}
                                            placeholder="Your email address"
                                        />
                                        {!checkFormValidation.isEmailValid && <small className="text-danger">Email is required.</small>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input
                                            type="password"
                                            ref={password}
                                            className={`form-control ${!checkFormValidation.isPasswordValid && 'border-danger'}`}
                                            id="password"
                                            onChange={onValChangeHandler}
                                            placeholder="Your password"
                                        />
                                        {!checkFormValidation.isPasswordValid && <small className="text-danger">Password is required.</small>}
                                    </div>
                                </div>
                            </div>
                        }

                        <div className={`mb-5 ${user && 'mt-5'}`}>
                            <h4 className="mb-4">Property Details</h4>
                            <label htmlFor="propertyAddress">Property Address</label>
                            <div className="row custom-reg-input">
                                <div className="form-group col-md-6">
                                    <input
                                        ref={inputRef}
                                        name="location"
                                        className={`form-control ${!checkFormValidation.isPropertyPlaceValid && 'border-danger'}`}
                                        onChange={onValChangeHandler}
                                    />
                                    {!checkFormValidation.isPropertyPlaceValid && <small className="text-danger">Property address is required.</small>}

                                </div>
                                <div className="col-md-6">
                                    <div className="row align-items-center">
                                        <div className="form-group col-md-7">
                                            <input
                                                type="text"
                                                ref={attachedFile}
                                                placeholder="Attach file"
                                                disabled
                                                className="form-control"
                                                onChange={onValChangeHandler}
                                            />
                                            {!checkFormValidation.isFilePdf && checkFormValidation.isFilePdf != undefined && <small className="text-danger">File's type must be PDF.</small>}
                                        </div>
                                        <div className="col-md-5">
                                            {
                                                !attchedFileData.isFileAttach && <React.Fragment>
                                                    <label htmlFor="file-upload" className="attach-btn d-flex justify-content-center align-items-center mb-3">
                                                        Attach file
                                                    </label>
                                                    <input id="file-upload" ref={attachFile} onChange={onFileChange} hidden type="file" />
                                                </React.Fragment>
                                            }
                                            {
                                                attchedFileData.isFileAttach && <React.Fragment>
                                                    <button type="button" onClick={onAttachedFileRemove} className={`image-preview-clear d-flex justify-content-center mb-${!checkFormValidation.isFilePdf && checkFormValidation.isFilePdf != undefined ? '5' : '3'}`}>
                                                        Remove File <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </button>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-4">Payment Details</h4>
                            <div className="custom-card-border">
                                <div className="row p-4">
                                    <div className="col-md-6">
                                        <h6>Your quote</h6>
                                        <p>Quote Reference: <span className="color-pink">Q44654</span></p>
                                        <div className="purchase-detail">
                                            <hr />
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Fixed Conveyancing Fee</p>
                                                    <p>${plan && plan.amount}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Disbursement Charges*</p>
                                                    <p>$0</p>
                                                </div>
                                            </div>
                                            <hr className="mt-0" />
                                            <div className="d-md-flex justify-content-between amount-details">
                                                <h5 className="mb-4">TOTAL FIXED FEE</h5>
                                                <h5 className="mb-4"><span className="pr-2">Inc GST</span>${plan && plan.amount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 payment-details">
                                        <h6>To accept this quote, select the box below</h6>
                                        <p>I hearby accept this quotation and authorise conveyonline.com.au to commence the works as outlined in this quotation. I further acknowledge that I have read the <u className="color-pink">terms and conditions</u> that form part of this quotation.</p>
                                        <div className="quote-accept">
                                            <input type="checkbox" ref={isChecked} value="accept" name="accept" id="acceot-quote" />
                                            <label htmlFor="acceot-quote">I, {user ? user.user_information_fullname : ''} Agree</label>
                                            {isBtnSubmitted && !isChecked.current.checked && <div className="text-danger">You must accept terms and conditions</div>}
                                        </div>
                                    </div>
                                </div>
                                <h6 className="mx-4">Initial Payment</h6>
                                <div className="row p-4">
                                    <div className="col-md-8">
                                        <CardElement className="card" id="card"
                                            options={{
                                                style: {
                                                    base: {
                                                        backgroundColor: "white"
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <button type="button" onClick={handleSubmit} className={`init-pay ${isPaymentLoading ? 'background-color-light' : 'background-color-pink'}`} disabled={isPaymentLoading}>
                                            {isPaymentLoading ? "Loading..." : "Pay"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
                {
                    isPaymentSuccess && <React.Fragment>
                        <div className="text-center thankyou-section">
                            <h1 className="mb-5">Thank you for purchase</h1>
                            <div className="custom-card-border">
                                <div className="row p-4">
                                    <div className="col-md-12">
                                        <h6>Your quote</h6>
                                        <p>Quote Reference: <span className="color-pink">Q44654</span></p>
                                        <div className="purchase-detail">
                                            <hr />
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Fixed Conveyancing Fee</p>
                                                    <p>${plan && plan.amount}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Disbursement Charges*</p>
                                                    <p>$0</p>
                                                </div>
                                            </div>
                                            <hr className="mt-0" />
                                            <div className="d-md-flex justify-content-between amount-details">
                                                <h5 className="">TOTAL FEE PAID</h5>
                                                <h5 className=""><span className="pr-2">Inc GST</span>${plan && plan.amount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-3" onClick={goToDashboardHandler}>Go to dashboard</button>
                        </div>
                    </React.Fragment>
                }
            </div>
        </section>
    )
}

export default Register;