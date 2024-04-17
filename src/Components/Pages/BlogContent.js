import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../Config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import './styles.css';
import defaultprofile from '../assets/img/backgrounds/defaultprofile.png';
import { Timestamp } from "firebase/firestore";




export default function BlogContents() {

    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const [author, setAuthor] = useState('');
    const [profile, setProfile] = useState('');


    useEffect(() => {
        const fetchBlogAndUser = async () => {
            // Fetch the blog
            const blogDocRef = doc(db, "blog", id);
            const blogSnapshot = await getDoc(blogDocRef);
            if (blogSnapshot.exists()) {
                const blogData = blogSnapshot.data();
                setBlog(blogData);

                // Fetch the user using the userId from the blog data
                const userDocRef = doc(db, "user", blogData.userId);
                const userSnapshot = await getDoc(userDocRef);
                if (userSnapshot.exists()) {
                    setAuthor(userSnapshot.data().username);
                    setProfile(userSnapshot.data().profilepic);
                } else {
                    console.error("User not found!");
                }
            } else {
                console.error("Blog not found!");
            }
        };

        fetchBlogAndUser();
    }, [id]);


    if (!blog) {
        return null;
    }

    const wordCount = blog.content ? blog.content.trim().split(/\s+/).length : 0;
    const readTime = Math.ceil(wordCount / 200); // Using Math.ceil to round up to the nearest minute
    const blogTime = blog.time ? new Timestamp(blog.time.seconds, blog.time.nanoseconds).toDate() : new Date();
    const day = blogTime.getDate();
    const month = blogTime.toLocaleString('default', { month: 'long' });
    const year = blogTime.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;


    return (
        <div id="layoutDefault">
            <Navbar />
            <div id="layoutDefault_content">
            <main>
                <section className="bg-light py-10">
                    <div className="container px-5">
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-10 col-xl-8">
                                <div className="single-post">
                                    <h1>{blog.title}</h1>
                                    <p className="lead">{blog.description}</p>
                                    <div className="d-flex align-items-center justify-content-between mb-5">

                                        <div className="single-post-meta me-4">
                                            {/* Add author's profile picture if available */}
                                            <img className="single-post-meta-img" src={profile|| defaultprofile} alt="User Profile" />
                                            <div className="single-post-meta-details"  >
                                                <div className="single-post-meta-details-name" style={{ fontSize: '1.2em' }}>{author}</div>
                                                <div className="single-post-meta-details-date" style={{ fontSize: '1.0em' }}>{formattedDate} &middot; {readTime} min read</div>
                                            </div>
                                        </div>

                                        <div className="single-post-meta-links">
                                            {/* Social links can be dynamically created or you can choose to remove them if not needed */}
                                            <a href="#!"><i className="fab fa-twitter fa-fw"></i></a>
                                            <a href="#!"><i className="fab fa-facebook-f fa-fw"></i></a>
                                            <a href="#!"><i className="fas fa-bookmark fa-fw"></i></a>
                                        </div>
                                    </div>


                                    {blog.blogPhoto && (
                                        <>
                                            <img className="img-fluid mb-2 rounded" src={blog.blogPhoto} alt="Blog visual content" />
                                        </>
                                    )}
                                    <div className="single-post-text my-5">
                                        {blog.content.split('\n').map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                    {/* Add a link to go back to the blog overview */}
                                    <hr className="my-5" />
                                    <div className="text-center">
                                        <a className="btn btn-transparent-dark" href="page-blog-overview.html">Back to Blog Overview</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            </div>
        </div>
    );
}
