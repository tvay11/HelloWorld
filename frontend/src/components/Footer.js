import React, {useEffect, useState} from "react";
import logo from "../icons/Logo.png";
import {auth} from '../firebase/Firebase.js';
import "../css/Footer.css"

const Footer = () => 
{ 
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	function LinkItem(props) 
	{
		return(
			<li className = 'linkItem'>
				<a href = {props.link} style={{ textDecoration: "none", color: "white" }}> {props.text} </a>
			</li>
		);
	}

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
		   if (user) {
			   setLoggedIn(true);
			   setUser(auth.currentUser)
		   } else {
			   setLoggedIn(false);
		   }
	   });
   	}, );
  
	return (
		<div>
			<div className = 'footerArea'>
				<div className = 'linkMenu'>
					<ul>
						<LinkItem link = "/" text = {"Home"}/>
						<LinkItem link = "/AboutUs" text = {"About Us"}/>
						
						{loggedIn ? ( 
							<div>
								<LinkItem link = "/AccountDetails" text = {"Account Preferences"}/>
							</div>
						) : (
							<LinkItem link = "/SignIn" text = {"Sign In"}/>
						)}
					</ul>
				</div>
				
				<div className = "footerLogo">
					<img src = {logo} width = "300" height = "50"/>
				</div>
			</div>
		</div>
	);
};

  
export default Footer;
