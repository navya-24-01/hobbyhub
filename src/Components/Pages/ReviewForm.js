import React, { useState } from 'react';
import './styles.css'; // Import your custom styles
import { Link } from 'react-router-dom';
import { db } from '../../Config/firebase';

const ReviewForm = ({ onSubmit, renterId, renteeUsername }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      description,
      renterId,
      renteeUsername,
      submissionDate: new Date().toISOString()
    };
    try {
      await db.collection('reviews').add(reviewData);
      console.log('Review submitted successfully!');
      setRating(0);
      setDescription('');
      setShowPopup(true);
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  

  return (
    <section class="bg-light pt-15 pb-10">
      <div class="container px-5">
        <div class="row gx-5">
          <div class="col-lg-8 col-xl-9">
            <div class="d-flex align-items-center justify-content-between flex-column flex-md-row">
              <h2 class="mb-0">Submit a Review for {renterId}</h2>
            </div>
            <form onSubmit={handleSubmit} className="card mb-5">
              <div class="card-body">
                <div className="rating">
                  <label htmlFor="description">Rating:</label>
                  <br />
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${index + 1 <= rating ? 'active' : 'inactive'}`}
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
                  <button type="submit" className="btn btn-primary">Submit Review</button>
                </div>
              </div>
            </form>
            {showPopup && (
              <div className="popup">
                <p>Review submitted successfully!</p><br/>
                <Link to="/">Back to HomePage</Link><br /><br />
                <button onClick={() => setShowPopup(false)} className="btn btn-secondary">Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="svg-border-rounded text-dark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
      </div>
    </section>
  );
};

const submitReview = async (reviewData) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Resolve with a mock response
      resolve({ ok: true });
    }, 1000); // Simulating a delay of 1 second
  });
};

export default ReviewForm;