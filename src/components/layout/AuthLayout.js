import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
    const user = useSelector(({ user }) => user.user);
    if (user) return <Navigate to='/' />;
    
    return (
        <div className="container">
            <div className="row justify-content-center vh-100 align-items-center">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title text-muted">Demo Application</h5>
                        </div>
                        <div className="card-body p-3">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;