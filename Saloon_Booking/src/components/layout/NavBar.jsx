import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false);

	const handleAccountClick = () => {
		setShowAccount(!showAccount);
	};

	const isLoggedIn = localStorage.getItem("token");
	const userRole = localStorage.getItem("userRole");

	const navbarStyle = {
		backgroundColor: "#f8f9fa", // Light background color
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
	};

	const navLinkStyle = {
		color: "rgb(25, 24, 24)", // Dark text color
		fontWeight: "500", // Slightly bolder text
	};

	const brandStyle = {
		color: "rgb(169, 77, 123)", // Salon brand color
		fontSize: "1.5rem", // Larger font size for brand
	};

	const dropdownItemStyle = {
		color: "rgb(25, 24, 24)", // Dark color for dropdown items
	};

	const buttonStyle = {
		backgroundColor: "rgb(169, 77, 123)", // Button background color
		color: "#fff", // Button text color
		padding: "0.5rem 1rem", // Button padding
		border: "none", // No border
		borderRadius: "4px", // Rounded corners
		cursor: "pointer", // Pointer cursor on hover
		transition: "background-color 0.3s", // Transition for hover effect
	};

	const buttonHoverStyle = {
		...buttonStyle,
		backgroundColor: "rgb(137, 127, 132)", // Button hover color
	};

	return (
		<nav className="navbar navbar-expand-lg" style={navbarStyle}>
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand" style={brandStyle}>
					Glamour Salon
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/services"} style={navLinkStyle}>
								Our Services
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/about-us"} style={navLinkStyle}>
								About Us
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/admin"} style={navLinkStyle}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/find-booking"} style={navLinkStyle}>
								Find My Booking
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"} style={dropdownItemStyle}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
