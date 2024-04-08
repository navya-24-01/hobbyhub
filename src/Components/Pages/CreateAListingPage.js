import React, { useState } from "react";
import { useAuth } from "../../Context/AuthorizationContext";
import { useListing } from "../../Context/ListingContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function CreateListingPage() {
  const { createListing } = useListing();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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
  
    // Start with image upload if file is selected
    if (imageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `listings/${imageFile.name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Observe state change events such as progress, pause, and resume
        },
        (error) => {
          // Handle unsuccessful uploads, possibly setting an error message in your state
          console.error(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Here you get the download URL of the uploaded image
            // Proceed to save this URL with your listing data in Firestore
            const newListingData = {
              ...listingData,
              url: downloadURL, // Add the URL to listing data
            };
  
            await createListing(newListingData); // Save the listing data, including the image URL
            // Optionally, reset form and preview state here
            setImagePreviewUrl(null);
            setListingData({ category: "", description: "", hourlyrate: "", title: "", url: "" });
          });
        }
      );
    } else {
      // If no image is selected, proceed with listing creation without image URL
      await createListing(listingData);
    }
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
                    <div class="col-8">
                      <input
                        type="file"
                        class="form-control form-control-solid"
                        id="image"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file) {
                            setImageFile(file);
                            const previewUrl = URL.createObjectURL(file);
                            setImagePreviewUrl(previewUrl);
                          } else {
                            setImagePreviewUrl(null); // Clear preview if no file is selected
                          }
                        }}
                      />
                      </div>
                
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

                      {imagePreviewUrl && (
                        <div class="col-8 text-center">
                          <img
                            src={imagePreviewUrl}
                            alt="Preview"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      )}

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
