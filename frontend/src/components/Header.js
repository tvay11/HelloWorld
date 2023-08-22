import React, {useEffect, useState} from "react";
import logo from "../icons/Logo.png";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import {auth} from '../firebase/Firebase.js';
import {signOut} from "firebase/auth"
import {AppBar, Toolbar} from "@mui/material";
/**
 * Renders Header
 * @returns {JSX} returns JSX elem
 */
function Header() 
{

	const [loggedIn, setLoggedIn] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [elevation,setElevation] = useState(0)
	/**
 * MenuonClick Event
 * @returns {JSX} returns JSX elem
 */
	const menuClick = () => 
	{
		if (isOpen) 
		{
			setOpen(false);
		}
		else 
		{
			setOpen(true);
		}
	};

	const logOut = async () =>{
		try{
			await signOut(auth)
			window.location.reload();

		}catch (error){
			console.log(error.message)
		}
	}
	const handleClose = () => {
		setOpen(false)
}

	useEffect(() => {
		 auth.onAuthStateChanged((user) => {
			if (user) {
				setLoggedIn(true);
				setUser(auth.currentUser)
			} else {
				setLoggedIn(false);
			}
			})

		const checkScroll = () => {
			if (window.scrollY > 0) {
				setElevation(2)
			}
			else{
				setElevation(0)
			}

		}

		window.addEventListener('scroll',checkScroll)
		return(()=> {
			window.removeEventListener('scroll', checkScroll);
		})
		},);

	/**
 * Renders Header
 * @returns {JSX} returns JSX elem
 */
	function DropDownItem(props) 
	{
		return(
			<li className = 'dropdownItem'>
				<Button  className = "dropdownText" href = {props.link}  onClick={handleClose} style={{ textDecoration: "none", color: "#1441d2"}}> {props.text}  </Button>
			</li>
		);
	}
  
	return (
		<div>
			<AppBar className="Header" position="fixed" color="default" elevation={elevation}>
				<Toolbar style={{height:"5px", backgroundColor:"white"}}>
				<a href = "/"> 
					<img src = {logo} width = "400" height = "57" style={{marginTop:"2px"}}/>
				</a>
				{loggedIn ? (
					<>
						<div className = 'menuContainer'> 
							<div className = 'menuTrigger' onClick={menuClick} >
								<MenuIcon style={{fontSize: "50px", marginTop:"-15px"}}/>
							</div>
							<div className = {`dropDownMenu ${isOpen? "active" : "inactive"}`} >
								<ul>
									<DropDownItem text = {user.displayName}/>
									<DropDownItem link = "/" text = {"Home"}/>
									<DropDownItem link = "/AccountDetails" text = {"Account Preferences"}/>
									<Button className = "dropdownText" variant="text" onClick={logOut} style ={{color:"#1441d2"}}>sign out</Button>

								</ul>
							</div>
						</div>
					</>
				) : (
					<>
						<div className = 'menuContainer'>
							<div className = 'menuTrigger' onClick={menuClick} >
								<MenuIcon style={{fontSize: "50px", marginTop:"-15px"}}/>
							</div>
							<div className = {`dropDownMenu ${isOpen? "active" : "inactive"}`} >
								<ul>
									<DropDownItem link='SignIn' text={"SIGN IN"}/>
								</ul>
						</div>
						</div>
					</>)}
				</Toolbar>
			</AppBar>
			</div>

	);

}

export default Header;