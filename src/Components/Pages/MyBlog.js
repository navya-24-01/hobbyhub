import React, { useState, useEffect } from "react";
import NavbarOnlyBack from "./NavBarOnlyBack";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import "./styles.css";
import { useAuth } from "../../Context/AuthorizationContext";
import { useNavigate } from "react-router-dom";



export default function MyBlog() {
    const [blogs, setBlogs] = useState([]);
    const { currentUser } = useAuth();
    const navigate = useNavigate();



    useEffect(() => {
        const fetchBlogs = async () => {
            if (!currentUser) {
                console.error("No current user. Make sure the user is logged in and try again.");
                return;
            }

            const userPropertyId = currentUser.uid || currentUser.userid;

            const blogsCollection = collection(db, "blog");
            const q = query(blogsCollection, where("userId", "==", userPropertyId));

            const blogsSnapshot = await getDocs(q);
            const blogsList = blogsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setBlogs(blogsList.filter(blog => blog.userId === userPropertyId));
        };

        fetchBlogs();
    }, [currentUser]);

    const handleDeleteBlog = async (blogId) => {
        try {
            await deleteDoc(doc(db, "blog", blogId));
            setBlogs(blogs.filter(blog => blog.id !== blogId));
            navigate("/myBlog"); // Navigate back to MyBlog page
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };
    

    return (
        <div id="layoutDefault">
            <NavbarOnlyBack />
            <div id="layoutDefault_content">
                <main>
                    <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
                        <div className="container px-5 text-center">
                            <h1 className="page-header-ui-title mb-3">My Blogs</h1>
                        </div>
                    </header>

                    <section className="bg-white py-10">
                        <div className="container px-5">
                            <div className="row gx-5">
                                {blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                        <div className="col-lg-4 mb-5" key={blog.id}>
                                            <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <div className="card lift h-100">
                                                    <img
                                                        src={blog.blogPhoto || "https://source.unsplash.com/featured/?blog,post"}
                                                        className="card-img-top"
                                                        alt={blog.title}
                                                        style={{ height: "250px", objectFit: "cover" }}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{blog.title}</h5>
                                                        <p className="card-text">{blog.description || "No summary available."}</p>
                                                        <button
                                                            onClick={() => handleDeleteBlog(blog.id)}
                                                            className="btn btn-danger mx-auto d-block" // Added classes to center the button and make it blue
                                                            style={{ backgroundColor: "blue" }} // Added inline style to make the button blue
                                                        >
                                                            Delete Blog
                                                        </button>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center w-100">
                                        <p>No blogs found. Post one now!</p>
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
