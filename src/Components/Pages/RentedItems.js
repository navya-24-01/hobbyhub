import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../Context/AuthorizationContext";
import ReviewForm from "./ReviewForm"; // Import ReviewForm

function UserPayments() {
  const [payments, setPayments] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null); // State to hold the current payment for review
  const { currentUser } = useAuth(); // Get current user

  useEffect(() => {
    const fetchUserPayments = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "user", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const paymentIds = userData.paymentsMade || [];
        const paymentsData = [];

        for (const paymentID of paymentIds) {
          const paymentRef = doc(db, "payments", paymentID);
          const paymentSnap = await getDoc(paymentRef);

          if (paymentSnap.exists()) {
            const paymentData = paymentSnap.data();
            const listingRef = doc(db, "listings", paymentData.listingId);
            const listingSnap = await getDoc(listingRef);

            if (listingSnap.exists()) {
              const listingData = listingSnap.data();
              paymentsData.push({
                id: paymentSnap.id,
                ...paymentData,
                listingDetails: listingData,
              });
            } else {
              // In case listing is not found, still push payment info
              paymentsData.push({ id: paymentSnap.id, ...paymentData });
            }
          }
        }

        setPayments(paymentsData);
      } else {
        console.log("No such user document!");
      }
    };

    fetchUserPayments();
  }, [currentUser]);

  const handleReviewClick = (payment) => {
    setCurrentPayment(payment); // Set the current payment for review
    setShowReviewForm(true); // Show the review form
  };

  return (
    <div id="layoutDefault">
      <Navbar />
      <div id="layoutDefault_content">
        <main>
          <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div className="container px-5 text-center">
              <h1 className="page-header-ui-title mb-3">My Payments</h1>
              <p className="page-header-ui-text mb-4">
                Review your payment history.
              </p>
            </div>
          </header>

          <section className="bg-white py-10">
            <div className="container px-5">
              <h2 className="text-center mb-5">Payment Details</h2>
              <div className="row gx-5">
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <div className="col-lg-6 mb-5" key={payment.id}>
                      <div className="card lift h-100">
                        <div className="card-body">
                          <h5 className="card-title">
                            Payment ID: {payment.paymentID}
                          </h5>
                          <button
                            className="btn btn-primary mt-3"
                            onClick={() => handleReviewClick(payment)}
                          >
                            Review
                          </button>
                          <p>
                            <strong>Amount:</strong> {payment.amount}{" "}
                            {payment.currency}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {payment.createdAt?.toDate().toLocaleString()}
                          </p>
                          <p>
                            <strong>Description:</strong> {payment.description}
                          </p>
                          <p>
                            <strong>Status:</strong> {payment.status}
                          </p>
                          {payment.listingDetails && (
                            <>
                              <hr />
                              <h5 className="card-title">
                                {payment.listingDetails.title}
                              </h5>
                              <p>
                                <strong>Category:</strong>{" "}
                                {payment.listingDetails.category}
                              </p>
                              <p>
                                <strong>Description:</strong>{" "}
                                {payment.listingDetails.description}
                              </p>
                              <p>
                                <strong>Rate:</strong> $
                                {payment.listingDetails.hourlyrate}/hour
                              </p>
                              <p>
                                <strong>Seller:</strong>{" "}
                                {payment.listingDetails.seller}
                              </p>
                              {payment.listingDetails.url && (
                                <img
                                  src={payment.listingDetails.url}
                                  alt="Listing"
                                  style={{ width: "100%", height: "auto" }}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <p>No payments found.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {showReviewForm && currentPayment && (
            <ReviewForm
              onSubmit={() => setShowReviewForm(false)} // Hide the form on submit
              renterId={currentPayment.listingDetails.seller}
              renteeUsername={currentUser.username} // Assuming username is part of currentUser
            />
          )}

          <div id="layoutDefault_footer"></div>
        </main>
      </div>
    </div>
  );
}

export default UserPayments;
