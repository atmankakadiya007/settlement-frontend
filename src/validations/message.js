import microValidator from 'micro-validator' 

export const validateMessage  = (data) => {
    const errors = microValidator.validate({
        name : {
            required: {
                errorMsg: `Your Name is required`
            },
        },
        message : {
            required: {
                errorMsg: `Message is required`
            },
        }, 
    }, data)
    
    return errors
}
