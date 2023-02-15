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
        password: {
            required: {
                errorMsg: `Password is required`
            }, 
            length: {
                min: 8,
                max: 30,
                errorMsg: 'Password should consists of minimum 8 characters and numbers'
            }
        }, 
        user_role_mapping_role: {
            required: {
                errorMsg: `Role is required`
            }
        }
    }, data)
    
    return errors
}


 