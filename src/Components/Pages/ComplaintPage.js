// ComplaintPage.js
import React from "react";
import Navbar from './Navbar'; // Adjust the import path according to your file structure
import './styles.css'; // Ensure this path matches your CSS file location

export default function ComplaintPage() {
    return (
        <div id="layoutDefault">
            <Navbar />
            <div id="layoutDefault_content">
                <main>
                    <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
                        <div className="container px-5 text-center">
                            <h1 className="page-header-ui-title mb-3">Complaint Submission</h1>
                            <p className="page-header-ui-text mb-4">
                                We take your concerns seriously. Please let us know if you have any complaints.
                            </p>
                        </div>
                    </header>

                    <section className="bg-white py-10">
                        <div className="container px-5 text-center">
                            <p>
                                For any complaints, please email us at:
                                <a href="mailto:hobbyhub@gmail.com" className="fw-bold"> hobbyhub@gmail.com</a>
                            </p>
                        </div>
                    </section>

                    <div id="layoutDefault_footer"></div>
                </main>
            </div>
        </div>
    );
}

