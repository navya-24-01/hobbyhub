import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../Context/AuthorizationContext";

function SellerPayments() {
  const [receivedPayments, setReceivedPayments] = useState([]);
  const { currentUser } = useAuth(); // Get current user

  useEffect(() => {
    const fetchSellerPayments = async () => {
      if (!currentUser) {
        console.log("No current user, aborting fetch");
        return;
      }

      // Assuming 'currentUser.uid' corresponds to the user's document ID
      const userRef = doc(db, "user", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const paymentsReceivedIds = userData.paymentsReceived || [];
        const receivedPaymentsData = [];

        for (const paymentID of paymentsReceivedIds) {
          const paymentRef = doc(db, "payments", paymentID);
          const paymentSnap = await getDoc(paymentRef);

          if (paymentSnap.exists()) {
            const paymentData = paymentSnap.data();
            // Add additional data processing if needed
            receivedPaymentsData.push({
              id: paymentSnap.id,
              ...paymentData,
            });
          } else {
            console.log(`Payment data for ID ${paymentID} not found`);
          }
        }

        setReceivedPayments(receivedPaymentsData);
      } else {
        console.log("Seller document does not exist!");
      }
    };

    fetchSellerPayments();
  }, [currentUser]);

  return (
    <div id="layoutDefault">
      <Navbar />
      <div id="layoutDefault_content">
        <main>
          <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div className="container px-5 text-center">
              <h1 className="page-header-ui-title mb-3">Payments Received</h1>
              <p className="page-header-ui-text mb-4">
                Review the payments you have received.
              </p>
            </div>
          </header>
          <section className="bg-white py-10">
            <div className="container px-5">
              <h2 className="text-center mb-5">Received Payment Details</h2>
              <div className="row gx-5">
                {receivedPayments.length > 0 ? (
                  receivedPayments.map((payment) => (
                    <div className="col-lg-6 mb-5" key={payment.id}>
                      <div className="card lift h-100">
                        <div className="card-body">
                          <h5 className="card-title">Payment ID: {payment.id}</h5>
                          <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
                          <p><strong>Date:</strong> {payment.createdAt.toDate().toLocaleDateString()}</p>

              
                          <p><strong>Description:</strong> {payment.description}</p>
                          <p><strong>Status:</strong> {payment.status}</p>
                          {/* Display more payment details if necessary */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <p>No payments received found.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div id="layoutDefault_footer"></div>
        </main>
      </div>
    </div>
  );
}

export default SellerPayments;
