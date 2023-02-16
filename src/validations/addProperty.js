import microValidator from 'micro-validator' 

export const validate = (data) => {
    const errors = microValidator.validate({
        property_info_location: {
            required: {
                errorMsg: `Location can't be empty`
            }, 
        }, 
        property_info_bedroom: {
            required: {
                errorMsg: `Bedroom can't be empty`
            }, 
        }, 
        property_info_bathroom: {
            required: {
                errorMsg: `Bathroom can't be empty`
            }, 
        }, 
        property_info_land_size: {
            required: {
                errorMsg: `Land size can't be empty`
            }
        }, 
        property_info_list_price : {
            required:{
                errorMsg : `List price can't be empty`
            }
        },
        state : {
            required: {
                errorMsg: `State can't be empty`
            }
        },
        postcode : {
            required: {
                errorMsg: `Postcode can't be empty`
            }
        },
        suburb : {
            required: {
                errorMsg: `Suburb can't be empty`
            }
        },
        property_info_garage: {
            required:{
                errorMsg: `Garage can't be empty`
            }
        }

    }, data)
    
    return errors
}