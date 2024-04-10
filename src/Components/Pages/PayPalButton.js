import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"; // Import Firestore methods
import { useAuth } from "../../Context/AuthorizationContext";
import { db } from "../../Config/firebase";
import { CLIENT_ID } from '../../Config/config'; // Ensure this path is correct


const PayPalButton = ({ description, amount, listingId, totalHours}) => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState("");
    const { currentUser } = useAuth();


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
            /*if (!startDate || !endDate) {
                console.error("Start date or end date is undefined.");
                setErrorMessage("Cannot save payment record without valid dates.");
                return;
            }*/
            const paymentDetails = {
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: details.id,
                paymentToken: details.purchase_units[0].payments.captures[0].id,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                description: description,
    
                // Additional fields
                status: "COMPLETED",
                createdAt: new Date(),
                listingId, // Captured from props
                totalHours, // Calculated total hours
            };

            // Attempt to save the payment details to Firestore and update user's paymentsMade
            try {
                // Save the payment details to the 'payments' collection
                await setDoc(doc(db, "payments", paymentDetails.paymentToken), paymentDetails);
                console.log("Payment record saved successfully");

                if (currentUser) {
                    // Update the user's document with the new paymentToken
                    const userRef = doc(db, "user", currentUser.uid);
                    await updateDoc(userRef, {
                        paymentsMade: arrayUnion(paymentDetails.paymentToken),
                    });
                    console.log("User record updated successfully with payment reference");
                } else {
                    throw new Error("User not found.");
                }

                setSuccess(true);
            } catch (error) {
                console.error("Error saving payment record: ", error);
                setErrorMessage("Payment was successful, but we encountered an error saving the record. Please contact support.");
                // Handle any additional error operations here
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

