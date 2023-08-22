import { Grid, Avatar, Stack } from "@mui/material";
import React from "react";
import amadeus from "../icons/amadeus-logo.png";
import firebase from "../icons/firebase.png";
import react from "../icons/reactjs.png";
import node from "../icons/nodejs.png";
import mui from "../icons/materialUI.png";
import gitlab from "../icons/gitlab.png";
import Ahn from "../icons/nguyena3.png"
import Thomas from "../icons/thomas.png"
import Anna from "../icons/profile(Anna).png"
import Rhett from "../icons/profile(Rhett).png"

/**
 * AboutUS Page
 * @returns 
 */

var colors = { "Default": "#81b71a",
	"Blue": "#1441d2",
	"Orange": "#e57b37",
};

// eslint-disable-next-line require-jsdoc
function AboutUs() 
{
	return (
		<div>
			<div className = "titleName">About Us</div>
			<div className = "TeamInfoTitle"> 
				<h1 style={{color: colors.Blue}}>
					Team
				</h1>
			</div>

			<div className = "TeamMembers">
				
				<div className = "Anh">
					<Stack direction="row" spacing={2}>
						<Avatar alt="Ahn Nguyen" src={Ahn}/>
						<h1> Anh Nguyen </h1>
					</Stack>
					<p>I am a senior majoring in CS and Stats. I was born in Hanoi Vietnam and live in St. Louis for way too long.</p>

				</div>

				<div className = "Thomas">
					<Stack direction="row" spacing={2}>
						<Avatar alt="Thomas McGuigan" src={Thomas}/>
						<h1> Thomas McGuigan </h1>
					</Stack>
					<p>I am originally from Madison, WI and am currently a senior studying Computer Science at Saint Louis University. My main interests in the field are web development and embedded systems. Outside of school I enjoy outdoor activities such as hiking, camping, running, etc. I am also a big fan of soccer and would love to have the opportunity to travel to see a Champions League game.</p>
				</div>

				<div className = "Anna">
					<Stack direction="row" spacing={2}>
						<Avatar alt="Anna Kidwell" src={Anna} />
						<h1> Anna Kidwell </h1>
					</Stack>
					<p>Hi! My name is Anna Kidwell, and I am a junior at Saint Louis University. My major is Computer Science, and my minor is Finance. I am from Jasper, IN.</p>
				</div>

				<div className = "Thang">
					<Stack direction="row" spacing={2}>
						<Avatar sx={{ bgcolor: colors.Orange}}> TV </Avatar>
						<h1> Thang Vay </h1>
					</Stack>
					<p>I am a senior at Saint Louis University majoring in Computer Science. I am from Saint Louis, MO. My hobbies are hiking, photography, and gardening.</p>
				</div>

				<div className = "Rhett">
					<Stack direction="row" spacing={2}>
						<Avatar alt="Rhett Schlabach" src={Rhett}/>
						<h1> Rhett Schlabach </h1>
					</Stack>
					<p>Hi! My name is Rhett Schlabach, and I am a senior at Saint Louis University. My major is Data Science, and my minors are Computer Science and Mathematics. I am from Monticello, IL.</p>
				</div>
				
			</div>

			<div className = "Technologies">
				<h1 style={{color: colors.Blue}}>
					Technologies
				</h1>
				
				<img src = {amadeus} width = "500" height = "75"/>
				<img src = {firebase} width = "300" height = "75"/>
				<img src = {react} width = "350" height = "175"/>
				<img src = {node} width = "300" height = "150"/>
				<img src = {mui} width = "250" height = "250"/>
				<img src = {gitlab} width = "250" height = "150"/>

			</div>
		</div>
	);
}

export default AboutUs;
