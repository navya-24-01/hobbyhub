import { useAuth } from '../../Context/AuthorizationContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const { signup, signupError } = useAuth();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await signup(data.get('email'), data.get('password'));
        navigate('/profile', { state: { useremail: data.get('email'), password:data.get('password') } });

    };

    return (
        <div id="layoutDefault">
            <div id="layoutDefault_content">
                <main>
                    <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
                        <div className="page-header-ui-content">
                            <div className="container px-4">
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-xl-8 col-lg-10 text-center">
                                        <h1 className="page-header-ui-title">Sign Up</h1>
                                        <p className="page-header-ui-text small mb-0">
                                               {signupError}
                                            </p>
                                            <h1></h1>
                                    </div>
                                    
                                </div>
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-xl-6 col-lg-8 text-center">
                                        <form className="row g-3 align-items-center mb-3 justify-content-center" onSubmit={handleSubmit}>

                                      

                                            <div className="col-8">
                                                <label htmlFor="email" className="visually-hidden">Enter your email</label>
                                                <input type="email" className="form-control form-control-solid" id="email" placeholder="Enter your email..." name="email" required />
                                            </div>

                                            <div className="col-8">
                                                <label htmlFor="password" className="visually-hidden">Enter your password</label>
                                                <input type="password" className="form-control form-control-solid" id="password" placeholder="Enter your password..." name="password" required />
                                            </div>

                                            <div className="col-8">
                                                <button className="btn btn-teal fw-500 w-100" type="submit">Sign Up</button>
                                            </div>
                                            <p className="page-header-ui-text small mb-0">
                                                Already have an account? <a href="./signin">Sign In</a>.
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="svg-border-angled text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon points="0,100 100,0 100,100"></polygon></svg>
                        </div>
                    </header>
                </main>
            </div>
        </div>
    );
}