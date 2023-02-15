import microValidator from 'micro-validator' 

export const validateLogin  = (data) => {
    const errors = microValidator.validate({
        email: {
            required: {
                errorMsg: `Email is required`
            },
            email: {
                errorMsg: `Enter a valid email`
            }
        },
        password: {
            required: {
                errorMsg: `Password is required`
            }
        }, 
        // user_role_mapping_role: {
        //     required: {
        //         errorMsg: `Role is required`
        //     }
        // }
    }, data)
    
    return errors
}
