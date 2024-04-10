import React, { useState } from "react";
import { useAuth } from "../../Context/AuthorizationContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function WriteBlog() {
  const { currentUser } = useAuth();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    userId: currentUser?.uid || "", // Initialize with the current user ID if logged in
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    // Proceed to save the blog data in Firestore
    const firestore = getFirestore();
    const blogCollectionRef = collection(firestore, "blog");
    await addDoc(blogCollectionRef, {
      ...blogData,
      userId: currentUser.uid, // Use the current user's ID
    });

    // Reset the blog form state here
    setBlogData({ title: "", content: "", userId: currentUser.uid });
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
                    <h1 class="page-header-ui-title">Post your Blog here!</h1>
                  </div>
                </div>
                <div class="row gx-5 justify-content-center">
                  <div class="col-xl-6 col-lg-8 text-center">
                    <form
                      class="row g-3 align-items-center mb-3 justify-content-center"
                      onSubmit={handleSubmit}
                    >
                      <div class="col-12">
                        <label for="title" class="visually-hidden">
                          Title
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-solid"
                          id="title"
                          placeholder="Title"
                          name="title"
                          value={blogData.title}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div class="col-12">
                        <label for="content" class="visually-hidden">
                          Content
                        </label>
                        <textarea
                          class="form-control form-control-solid"
                          id="content"
                          placeholder="Content"
                          name="content"
                          value={blogData.content}
                          onChange={handleChange}
                          rows="20"
                        ></textarea>
                      </div>

                      <div class="col-12">
                        <button class="btn btn-teal fw-500 w-100" type="submit">
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="svg-border-angled text-white">
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
