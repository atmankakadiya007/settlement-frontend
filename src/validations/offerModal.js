
import microValidator from 'micro-validator' 

export const validate = (data) => {
    const errors = microValidator.validate({
        offer_price: {
            required: {
                errorMsg: `Offer price is required`
            },
            length: {
                min: 2,
                max: 7,
                errorMsg: 'Maximum 7 digits allowed for offer price.'
            }

        },
    }, data)
    
    return errors
}


 