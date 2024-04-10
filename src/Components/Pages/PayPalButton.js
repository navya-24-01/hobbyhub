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

    /*// Handle order approval
     const onApprove = (data, actions) => {
         return actions.order.capture().then(function (details) {
             setSuccess(true);
         });
     };*/

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(async function (details) {
            setSuccess(true);

            // Construct the payment details object you want to save
            const paymentDetails = {
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: details.id,
                paymentToken: details.purchase_units[0].payments.captures[0].id,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                description: description,
                status: "COMPLETED",
                createdAt: new Date(),
            };

            // Save the payment details to Firestore
            try {
                await setDoc(doc(db, "payments", paymentDetails.paymentToken), paymentDetails);
                console.log("Payment record saved successfully");
            } catch (error) {
                console.error("Error saving payment record: ", error);
                setErrorMessage("Payment was successful, but we encountered an error saving the record. Please contact support.");
            }
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

