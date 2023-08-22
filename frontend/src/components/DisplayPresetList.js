import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {auth} from '../firebase/Firebase.js';
import getUserPresets from "../utils/firestore/GetUserPresets";
import {Button} from "@mui/material";

function DisplayPresetList({addPresetLocations})
{
	const list = [];

	const Style =
		{
			grid: {
				padding: '20px',
			},
		};

	const [unadjustedPresetList, setUnadjustedPresetList] = useState([]);
	const [userUID, setUserUID] = useState(null);
	const [listCount, setListCount] =  useState("");
	const [presetList, setPresetList] = useState([]);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				var uid = user.uid;
				setUserUID(uid);
				console.log(uid);
			} else {
				// if user not signed in or doesn't have account, simply don't load presets
			}
		})
	},);

	useEffect(() =>
		{
			if (userUID) {
				getUserPresets(userUID)
					.then((res) => setUnadjustedPresetList(res))
					.catch((error) =>
						console.error( `${error.response.data}`));
			}
		},
		[userUID]);

	function adjustPresetList() {
		for (let i = 0; i < unadjustedPresetList.length; i++) {
			presetList[i] = unadjustedPresetList[i];
		}
		setListCount(listCount+1)
	}

	useEffect(() =>
	{
		console.log(unadjustedPresetList);
		adjustPresetList();
	}, [unadjustedPresetList]);

	function updateList(clickedPreset) {
		// find properpreset they clicked
		const presetIndex = presetList.findIndex(preset => preset.title === clickedPreset);

		// add those locations to list
		for (let i = 0; i < presetList[presetIndex].locations.length; i++) {
			list.push(presetList[presetIndex].locations[i]);
		}

		// call parent function to update LocationList state
		addPresetLocations(list);
	}

	return (
		<div>
			<div style = {Style.grid}>
				{presetList.map((preset) => {
					if (preset.title != null) {
						return (
							<div key = {preset.title}>
								<Grid container spacing = {12}>
									<Grid item xs={2}>
									</Grid>
									<Grid item xs={2}>
										<div style ={{paddingBottom:"10px"}}>
										<Button variant="outlined" size="small" onClick = {() => updateList(preset.title)} style={{zIndex:"0"}}>
											{preset.title}
										</Button>
										</div>
									</Grid>
								</Grid>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default DisplayPresetList;
