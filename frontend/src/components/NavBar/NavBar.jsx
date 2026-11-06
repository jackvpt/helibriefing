// 🎨 Styles
import "./NavBar.scss"

// ⚛️ React
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHouse,
  faArrowRightFromBracket,
  faHelicopter,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
  // React initialization
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Store state
  const isAuthenticated = useSelector((state) => state.user.userId !== null)

  /** Log out the current user */
  const handleLogOut = () => {
    localStorage.removeItem("helibriefing_token")
    sessionStorage.removeItem("helibriefing_token")
    dispatch({ type: "user/clearUser" })
    dispatch({ type: "parameters/reset" })
    navigate("/login")
  }

  return (
    <nav className="container__navbar">
      <div className="container__navbar-mainButtons">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "container__navbar-button active"
              : `container__navbar-button ${!isAuthenticated ? "disabled" : ""}`
          }
        >
          <FontAwesomeIcon
            className="container__navbar-button-icon"
            icon={faHouse}
          />
        </NavLink>
        <NavLink
          to="/aircraft"
          className={({ isActive }) =>
            isActive
              ? "container__navbar-button active"
              : `container__navbar-button ${!isAuthenticated ? "disabled" : ""}`
          }
        >
          <FontAwesomeIcon
            className="container__navbar-button-icon"
            icon={faHelicopter}
          />
        </NavLink>
        <NavLink
          to="/weightandbalance"
          className={({ isActive }) =>
            isActive
              ? "container__navbar-button active"
              : `container__navbar-button ${!isAuthenticated ? "disabled" : ""}`
          }
        >
          <FontAwesomeIcon
            className="container__navbar-button-icon"
            icon={faScaleBalanced}
          />
        </NavLink>
      </div>
      <div
        onClick={handleLogOut}
        className={`container__navbar-button ${!isAuthenticated ? "disabled" : ""}`}
      >
        <FontAwesomeIcon
          className="container__navbar-button-icon"
          icon={faArrowRightFromBracket}
        />
      </div>
    </nav>
  )
}

export default Navbar
