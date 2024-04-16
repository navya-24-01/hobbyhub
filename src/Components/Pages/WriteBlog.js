import React, { useState } from "react";
import { useAuth } from "../../Context/AuthorizationContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Navbar from "./Navbar";
import blogBackground from '../assets/img/backgrounds/blogpic.png';
import { useNavigate } from 'react-router-dom';




export default function WriteBlog() {
  const { currentUser } = useAuth();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    userId: currentUser?.uid || "", // Initialize with the current user ID if logged in
  });
  const [blogPhoto, setBlogPhoto] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const navigate = useNavigate();





  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a user is logged in
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    // Start with a copy of the current blog data
    let blogDataToSave = { ...blogData, userId: currentUser.uid };

    // If a photo is included, upload it first
    if (blogPhoto) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `blogs/${blogPhoto.name}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, blogPhoto);

        const snapshot = await new Promise((resolve, reject) => {
          uploadTask.on("state_changed", null, reject, () => resolve(uploadTask.snapshot));
        });

        // Get the download URL and update the blog data to include the photo URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        blogDataToSave.blogPhoto = downloadURL;
        
      } catch (error) {
        console.error("Failed to upload photo:", error);
        return;
      }
    }

    // Save the blog data in Firestore
    try {
      const firestore = getFirestore();
      const blogCollectionRef = collection(firestore, "blog");
      await addDoc(blogCollectionRef, blogDataToSave);

      // Reset the blog form state here
      setBlogData({ title: "", content: "", userId: currentUser.uid });
      setPhotoPreviewUrl(null);
      navigate('/allBlogs'); 
    } catch (error) {
      console.error("Failed to save blog data:", error);
    }
  };






  return (

    <div id="layoutDefault">
      <Navbar />
      <div id="layoutDefault_content">
        <main>



          <header
            className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary"


          >
            <div className="row gx-5 justify-content-center">
              <div className="col-xl-8 col-lg-10 text-center">
                <h1 className="page-header-ui-title mb-3">Post your Blog here!</h1>
                <p className="page-header-ui-text mb-4">
                  Share your interest, find people with the same interest
                </p>
              </div>
            </div>
          </header>




          <div class="page-header-ui-content"

            style={{
              backgroundImage: `url(${blogBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',

            }}>

            <div class="container px-4">

              <div class="row gx-5 justify-content-center">
                <div class="col-xl-6 col-lg-8 text-center">

                  <form
                    class="row g-3 align-items-center mb-3 justify-content-center"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <br /><br />
                    </div>

                    <div class="col-12">

                      <input
                        type="file"
                        class="form-control form-control-solid"
                        id="image"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file) {
                            setBlogPhoto(file);
                            const previewUrl = URL.createObjectURL(file);
                            setPhotoPreviewUrl(previewUrl);
                          } else {
                            setPhotoPreviewUrl(null); // Clear preview if no file is selected
                          }
                        }}
                      />
                    </div>

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
                        required
                      />
                    </div>

                    <div class="col-12">
                      <label for="description" class="visually-hidden">
                        Description
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-solid"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={blogData.description}
                        onChange={handleChange}
                        required
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
                        rows="30"
                        required
                      ></textarea>
                    </div>

                    
                    <div class="col-12">
                    <button
                      class="btn btn-teal fw-500 w-100"
                      type="submit"
                    >
                      Post
                    </button>

                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}