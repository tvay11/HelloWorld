import React, { useEffect, useState } from "react";
import logo from "../icons/helloworld.png";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { auth } from "../firebase/Firebase.js";
import { signOut } from "firebase/auth";
import { AppBar, Toolbar } from "@mui/material";
import '../css/Header.css';

function Header() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [elevation, setElevation] = useState(0);

	const menuClick = () => {
		setOpen(!isOpen);
	};

	const logOut = async () => {
		try {
			await signOut(auth);
			window.location.reload();
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setLoggedIn(true);
				setUser(auth.currentUser);
			} else {
				setLoggedIn(false);
			}
		});

	}, []);

	function DropDownItem(props) {
		return (
			<li className="dropdownItem"  style={{ marginLeft: '-2vw' }}>
				<Button
					className="dropdownText"
					href={props.link}
					onClick={handleClose}
					style={{ textDecoration: "none", color: "#36373a" }}
				>
					{props.text}
				</Button>
			</li>
		);
	}

	return (
		<div>
			<AppBar className="Header" position="fixed" elevation={elevation} style={{ background: 'rgba(0,0,0,0.0)' }}>
				<Toolbar style={{ height: "5px", display: 'flex', justifyContent: 'space-between' }}>
					<a href="/" style={{ textDecoration: "none", color: "white", fontSize: "24px", fontWeight: "bold" }}>
						<img
							src={logo}
							alt="Logo"
							style={{
								marginRight: "10px",
								marginTop:'5px',
								verticalAlign: "middle",
								width: "120px",
								height: "120px",
								filter: "brightness(0) invert(1)"
							}}
						/>
					</a>
					<div className='menuTrigger' onClick={menuClick}>
						<MenuIcon style={{ fontSize: "50px", marginTop: "-15px" }} />
					</div>
					<div className={`dropDownMenu ${isOpen ? "active" : "inactive"}`}>
						<ul>
							{loggedIn ? (
								<>
									<DropDownItem text={user.displayName} />
									<DropDownItem link="/" text="Home" />
									<DropDownItem link="/AccountDetails" text="Account Preferences" />
									<li className="dropdownItem">
										<Button className="dropdownText" variant="text" onClick={logOut} style={{ color: "#36373a",marginLeft: '-2vw' }}>
											Sign Out
										</Button>
									</li>
								</>
							) : (
								<>
									<li className="dropdownItem">
										<Button
											onClick={() => window.location.href = "/SignIn"}
											className="dropdownText"
											style={{ color: "#36373a",marginLeft: '-2vw' }}
										>
											Sign In
										</Button>
									</li>
									<li className="dropdownItem">
										<Button
											onClick={() => window.location.href = "/SignUp"}
											className="dropdownText"
											style={{ color: "#36373a",marginLeft: '-2vw' }}
										>
											Sign Up
										</Button>
									</li>

								</>
							)}
						</ul>
					</div>
				</Toolbar>
			</AppBar>
		</div>

	);
}

export default Header;
