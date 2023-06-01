import { useDispatch, useSelector } from "react-redux";
import { 
    Link, 
    NavLink, 
    Navigate, 
    Outlet,
} from "react-router-dom";
import { logoutRequest } from "../../mouldes/Login/actions";

const MainLayout = () => {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user.user);
    if (!user) return <Navigate to='/login' />;

    return (
        <main>
            <header><h3 className="p-3">Demo Application</h3></header>
            <section><Outlet /></section>
            <aside>
                <h3 className="p-3">Menu</h3>
                <div className="list-group list-group-flush">
                    <NavLink className="list-group-item list-group-item-action" to='/'>Dashboard</NavLink>
                    <NavLink className="list-group-item list-group-item-action" to='/students'>Students</NavLink>
                    <Link onClick={() => dispatch(logoutRequest())} className="list-group-item list-group-item-action">Logout</Link>
                </div>
            </aside>
            <footer>
                &copy; {new Date().getFullYear()} Alright Reserve.
            </footer>
        </main>
    );
}

export default MainLayout;
