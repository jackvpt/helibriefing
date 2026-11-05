// 🎨 Styles
import "./Header.scss"

// React
import React from "react"
import { Link } from "react-router-dom"

// 🖼️ Image
import logo from "../../assets/images/helibriefing-logo-white.svg"

/**
 * Renders the main navigation header of the application.
 *
 * This component displays the application's logo and a navigation menu with links to the "View" and "Create" pages.
 *
 * @category Components
 * @component
 * @returns {React.Component} A React component displaying the header with navigation links.
 */
const Header = () => {
  return (
    <header>
      <Link to="/">
        <img className="header__logo" src={logo} alt="Helibriefing"></img>
      </Link>
    </header>
  )
}

export default Header
