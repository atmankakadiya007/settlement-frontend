import microValidator from 'micro-validator' 

export const validate = (data) => {
    const errors = microValidator.validate({
        user_information_email_address: {
            required: {
                errorMsg: `Email is required`
            },
            email: {
                errorMsg: `Enter a valid email`
            }
        },
        user_information_fullname: {
            required: {
                errorMsg: `Name is required`
            }, 
        }, 
        user_information_mobile_number: {
            required: {
                errorMsg: `Mobile number is required`
            }, 
            length: {
                min:10,
                max: 10,
                errorMsg: 'Mobile number length should be 10'
            }
        }
    }, data)
    
    return errors
}


 