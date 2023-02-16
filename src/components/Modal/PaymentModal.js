import  React, { useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Modal from 'react-responsive-modal'

function PaymentModal(props) {
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const stripe = useStripe()
    const elements = useElements();


    const handleSubmit = async () => {
      const card = elements.getElement(CardElement);

      setPaymentLoading(true)
      const result = await stripe.createToken(card);
      props.pay(result.token.id)
      setTimeout(() => {
        setPaymentLoading(false)
      }, 1000)
    } 

    return (
      <Modal open={props.show} onClose={props.onClose} center>
        <div style={{ padding: "3rem" }}>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <form style={{ display: "block", width: "100%"}}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CardElement className="card"  id="card"
                  options={{
                      style: {
                          base: {
                          backgroundColor: "white"
                        } 
                      },
                    }}
                />
                <button type="button" onClick={handleSubmit} className="pay-button" disabled={isPaymentLoading}>
                  {isPaymentLoading ? "Loading..." : "Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }

  export default PaymentModal