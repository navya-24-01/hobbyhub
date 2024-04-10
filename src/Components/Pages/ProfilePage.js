import React, { useState } from "react";
import { useAuth } from "../../Context/AuthorizationContext";
import { useProfile } from "../../Context/ProfileContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function ProfilePage() {
  const { setUser, checkUserExists } = useProfile();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [profileData, setProfileData] = useState({
    username: '',
    profilepic: '',
    conversationIds: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (imageFile) {
      const storage = getStorage();
      // Use UUID for file naming, as discussed, for enhanced uniqueness
      const storageRef = ref(storage, `profiles/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress events here
        },
        (error) => {
          console.error(error);
          // Optionally, set an error message in your state
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newProfileData = { username: profileData.username, profilepic: downloadURL };
          await setUser(newProfileData); // Adjust this method according to your actual implementation
          setImagePreviewUrl(null);
          setProfileData({ username: '', profilepic: '' }); // Reset form to initial state
        }
      );
    } else {
      await setUser(profileData);
      // Add logic here for when there's no image file to upload
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
                    <h1 class="page-header-ui-title">Edit Profile</h1>
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
                        <label for="username" class="visually-hidden">
                          Username
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-solid"
                          id="title"
                          placeholder="Username"
                          name="username"
                          value={profileData.username}
                          onChange={handleChange}
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
                          Save
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
