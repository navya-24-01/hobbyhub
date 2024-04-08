import React, { useState } from "react";
import { useAuth } from "../../Context/AuthorizationContext";
import { useListing } from "../../Context/ListingContext";

export default function CreateListingPage() {
  const { createListing } = useListing();
  const [imageFile, setImageFile] = useState(null);


  const [listingData, setListingData] = useState({
    category: "none",
    description: "",
    hourlyrate: "",
    title: "",
    url: "none",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createListing(listingData);
  };

  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          <header class="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div class="page-header-ui-content">
              <div class="container px-4">
                <div class="row gx-5 justify-content-center">
                  <div class="col-xl-8 col-lg-10 text-center">
                    <h1 class="page-header-ui-title">Create Listing</h1>
                  </div>
                </div>
                <div class="row gx-5 justify-content-center">
                  <div class="col-xl-6 col-lg-8 text-center">
                    <form
                      class="row g-3 align-items-center mb-3 justify-content-center"
                      onSubmit={handleSubmit}
                    >
                      {/* Repeat the structure below for each attribute */}
                      <div class="col-8">
                        <label for="title" class="visually-hidden">
                          Title
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-solid"
                          id="title"
                          placeholder="Title"
                          name="title" 
                          value={listingData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="col-8">
                        <label for="category" class="visually-hidden">
                          Description
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-solid"
                          id="category"
                          placeholder="Category"
                          name="category"
                          value={listingData.category}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="col-8">
                        <label for="description" class="visually-hidden">
                          Description
                        </label>
                        <textarea
                          class="form-control form-control-solid"
                          id="description"
                          placeholder="Description"
                          name="description"
                          value={listingData.description}
                          onChange={handleChange}
                          rows="4" // Set the desired number of rows for your textarea
                        ></textarea>
                      </div>

                      <div class="col-8">
                        <label for="hourlyrate" class="visually-hidden">
                          Hourly Rate
                        </label>
                        <input
                          type="number" // Use 'number' type to get a numeric keyboard on mobile devices
                          class="form-control form-control-solid"
                          id="hourlyrate"
                          placeholder="Hourly Rate"
                          name="hourlyrate"
                          value={listingData.hourlyrate}
                          onChange={handleChange}
                          step="0.01" // Allows decimal values to two decimal places
                        />
                      </div>

                      <div class="col-8">
                        <button class="btn btn-teal fw-500 w-100" type="submit">
                          Create Listing
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="svg-border-angled text-white">
              {/* SVG border as in the sign-in page */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <polygon points="0,100 100,0 100,100"></polygon>
              </svg>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
}
