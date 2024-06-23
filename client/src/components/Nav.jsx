import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { CiLogout } from "react-icons/ci";

const Nav=()=>{
    const { isLogIn } = useAuth();
    return (
      <>
        <div className="nav">
          <div className="nav-manu">
            <NavLink to="/home" className="opn">Home</NavLink>
            <NavLink to="/reviews" className="opn">Your Reviews</NavLink>
          </div>
          <div className="nav-btn">
            {isLogIn ? (
              <NavLink to="/logout" className="nav-menu-btn">
                <CiLogout className="contact_icon" />
                Log Out
              </NavLink>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
};

export default Nav;