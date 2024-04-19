import React, { useState } from "react";
import "./styles.css"; // Make sure your styles are correctly imported
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore"; // Correct imports for Firebase

const ReviewForm = ({ listingId, renterId, renteeId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      description,
      listingId,
      renterId, // Ensure seller is properly accessed
      renteeId,
      submissionDate: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, "reviews"), reviewData); // Use addDoc to add a document
      console.log("Review submitted successfully!");
      // Reset form and close it
      setRating(0);
      setDescription("");
      if (onClose) onClose(); // Use onClose prop to close the form
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <section className="bg-light pt-15 pb-10">
      <div className="container px-5">
        <div className="row gx-5">
          <div className="col-lg-8 col-xl-9">
            <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
              <h2 className="mb-0">Submit a Review for {renterId}</h2>
            </div>
            <form onSubmit={handleSubmit} className="card mb-5">
              <div className="card-body">
                <div className="rating">
                  <label htmlFor="description">Rating:</label>
                  <br />
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${
                        index + 1 <= rating ? "active" : "inactive"
                      }`}
                      onClick={() => handleStarClick(index + 1)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="review-description">
                  <label htmlFor="description">Review:</label>
                  <br />
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-control mb-2"
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <Link to="/" className="btn btn-light me-2">
                    Back to HomePage
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
            {/* Optional: If you wish to include a cancel button on the form itself */}
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* SVG graphics and other page elements */}
    </section>
  );
};

export default ReviewForm;
