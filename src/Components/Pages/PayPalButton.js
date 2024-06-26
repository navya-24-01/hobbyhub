import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { addDoc, collection, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"; // Import Firestore methods
import { useAuth } from "../../Context/AuthorizationContext";
import { db } from "../../Config/firebase";
import { CLIENT_ID } from '../../Config/config'; // Ensure this path is correct


const PayPalButton = ({ description, amount, listingId, startDate, endDate, totalHours, sellerId }) => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState("");
    const { currentUser } = useAuth();

    console.log("Can u see ne + " + startDate);


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
            // Ensure startDate and endDate are not undefined
            if (!startDate || !endDate) {
                console.error("Start date or end date is undefined.");
                setErrorMessage("Cannot save payment record without valid dates.");
                return;
            }

            const paymentToken = details.purchase_units[0].payments.captures[0].id; // Assuming this is your paymentToken
            const paymentDetails = {
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: details.id,
                paymentToken,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                description: description,
                status: "COMPLETED",
                createdAt: new Date(),
                listingId, // Captured from props
                startDateTime: startDate, // Captured from props
                endDateTime: endDate, // Captured from props
                totalHours, // Calculated total hours
            };

            try {
                // Save the payment details to the 'payments' collection
                await setDoc(doc(db, "payments", paymentToken), paymentDetails);
                console.log("Payment record saved successfully");

                // If currentUser is not defined, this will throw an error.
                if (!currentUser) {
                    throw new Error("User not found.");
                }

                // Update the user's document with the new paymentToken
                const userRef = doc(db, "user", currentUser.uid);
                await updateDoc(userRef, {
                    paymentsMade: arrayUnion(paymentToken),
                });

                if (sellerId) {
                    // Update the seller's document with the new payment transaction
                    const sellerRef = doc(db, "user", sellerId);
                    await updateDoc(sellerRef, {
                        paymentsReceived: arrayUnion(paymentDetails.paymentToken),
                    });
                    console.log("Seller record updated successfully with payment transaction");
                }

                // Define renting details using the paymentToken as the paymentId.
                const rentingDetails = {
                    listingId,
                    sellerId,
                    renterId: currentUser.uid, // currentUser must be defined, hence the check above
                    startDateTime: startDate,
                    endDateTime: endDate,
                    totalHours,
                    paymentId: paymentToken, // Use paymentToken as the paymentId
                    confirmed: true,
                };
                // Attempt to save the payment details to Firestore and update user's paymentsMade

                // Save the renting details to the 'renting' collection
                await addDoc(collection(db, "renting"), rentingDetails);
                console.log("Renting record created successfully");

                setSuccess(true);
            } catch (error) {
                console.error("Error during payment processing: ", error);
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

            //console.log('Order successful. Your order id is:', orderID);

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

