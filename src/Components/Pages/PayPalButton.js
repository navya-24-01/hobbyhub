import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../../Config/config';

const PayPalButton = ({ description, amount }) => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState("");

    // Creates a PayPal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                description: description,
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
            }],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // Handle order approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setSuccess(true);
        });
    };

    // Handle errors
    const onError = (data, actions) => {
        setErrorMessage("An error occurred with your payment.");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful. Your order id is:', orderID);
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalButton;

