import microValidator from 'micro-validator' 

export const validate = (data) => {
    const errors = microValidator.validate({
        email: {
            required: {
                errorMsg: `Email is required`
            },
            email: {
                errorMsg: `Enter a valid email`
            }
        },
        name: {
            required: {
                errorMsg: `Name is required`
            }, 
        }, 
        message: {
            required: {
                errorMsg: `Message is required`
            }, 
        }, 
        who_are_you: {
            required: {
                errorMsg: `Please choose one`
            }, 
        }, 
        phone: {
            required: {
                errorMsg: `Phone number is required`
            }, 
            length: {
                min:10,
                max: 10,
                errorMsg: 'Phone number length should be 10'
            }
        }
    }, data)
    
    return errors
}


 