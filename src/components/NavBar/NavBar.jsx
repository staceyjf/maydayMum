import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service" // importing users-service

function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return(
        <nav>
            {/* React Router implements an event handler to ensures that there is not HTTP request */}
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
            &nbsp;&nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;
            <Link to="" onClick={handleLogOut}>Log out</Link>
            
        </nav>
    )
}
export default NavBar