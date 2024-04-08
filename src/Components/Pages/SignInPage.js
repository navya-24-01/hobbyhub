import { useAuth } from '../../Context/AuthorizationContext';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const success = await login(data.get('email'), data.get('password'));
        if (success) {
          navigate('/home'); 
        } else {
          console.log("No success");
        }
      };
    return (<div id="layoutDefault">
    <div id="layoutDefault_content">
        <main>
            <header class="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div class="page-header-ui-content">
    <div class="container px-4">
        <div class="row gx-5 justify-content-center">
            <div class="col-xl-8 col-lg-10 text-center">
                <h1 class="page-header-ui-title">Sign In</h1>
            </div>
        </div>
        <div class="row gx-5 justify-content-center">
            <div class="col-xl-6 col-lg-8 text-center">
                <form class="row g-3 align-items-center mb-3 justify-content-center" onSubmit={handleSubmit}>
                    <div class="col-8">
                        <label for="email" class="visually-hidden">Enter your email</label>
                        <input type="email" class="form-control form-control-solid" id="email" placeholder="Enter your email..." name="email"/>
                    </div>

                    <div class="col-8">
                        <label for="password" class="visually-hidden">Enter your password</label>
                        <input type="password" class="form-control form-control-solid" id="password" placeholder="Enter your password..." name="password"/>
                    </div>

                    <div class="col-8">
                        <button class="btn btn-teal fw-500 w-100" type="submit">Sign In</button>
                    </div>
                    <p class="page-header-ui-text small mb-0">
                    Don't have an account? Click here to <a href="./signup">Sign Up</a>
                </p>
                </form>
                
            </div>
        </div>
    </div>
</div>

                <div class="svg-border-angled text-white">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon points="0,100 100,0 100,100"></polygon></svg>
                </div>
            </header>
           
        </main>
    </div>
    
</div>)
}