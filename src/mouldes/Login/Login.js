import React from 'react';
import { connect } from "react-redux";
import { loginRequest } from "./actions";

const Login = ({ loginRequest, loading, error }) => {
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });
    return (
        <div>
            <input
                autoComplete='false'
                onChange={({target: { value }}) => setCredentials({ ...credentials, email: value })} 
                type="text" 
                className="form-control mb-3" 
                value={credentials.email} />
            <input 
                onChange={({target: { value }}) => setCredentials({ ...credentials, password: value })} 
                type="password" 
                className="form-control mb-3" 
                value={credentials.password} />
            <button onClick={() => loginRequest(credentials)} className="w-100 btn btn-primary">Login</button>
            { error && <p className='mt-3 small text-danger'>{error}</p> }
            { loading && <p className='mt-3 small text-info'>{'Please wait..'}</p> }
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    loading: user.loading,
    error: user.error,
});

const mapDispatchToProps = {loginRequest};
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);