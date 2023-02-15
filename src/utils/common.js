import { RoleActionsCombo } from '../constants/data'

export const priceFormat = (price) =>  {
    let formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    return formatted
}

export const validateEmail= (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export const hasAccess = (role, actionType) => {
    if(actionType === RoleActionsCombo[role]){
        return true
    }
    else {
        return false
    }
}


/******Base 64 function *******/
export const getBase64 = (file) =>  {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }