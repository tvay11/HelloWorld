import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import SearchBar from "../components/SearchBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import DisplayPresetList from "../components/DisplayPresetList";
import {Typography} from "@mui/material";

const LocationList = forwardRef(({inputList, displayPresetList, handleListCountChange}, ref) =>
{
	const [list, setList] = useState(inputList);

	useEffect(() => {
		if (typeof handleListCountChange === "function") {
			handleListCountChange(list.length);
		}
	}, [list, handleListCountChange]);

	function addLocation(userItem) {
		// first check to make sure item is unique
		console.log(userItem);
		let uniqueLocation = true;
		for (let j = 0; j < list.length; j++) {
			if (list[j] === userItem) {
				uniqueLocation = false;
			}
		}
		// then add if it is
		if (uniqueLocation) {
			const newItem = userItem;
  			setList([...list, newItem]);
		}
	}

	function deleteLocation(itemToBeDeleted) 
	{
		const locationIndex = list.findIndex(item => item === itemToBeDeleted);
		const newList = [...list];
		newList.splice(locationIndex,1);
		setList(newList);
	}

	function addLocations(newLocations) {
		const newItems = [...list];
		for (let i = 0; i < newLocations.length; i++) {
			const newItem = newLocations[i];
			let duplicateLocation = false;
			for (let j = 0; j < list.length; j++) {
				if (newItem === list[j]) {
					duplicateLocation = true;
				}
			}
			if (!duplicateLocation) {
				newItems.push(newItem);
			}
		}
		setList(newItems);
	}

	function sendCurrentListStatus() {
		return list;
	}

	useImperativeHandle(ref, () => ({
		sendCurrentListStatus: sendCurrentListStatus,
		addLocationsFromModal: addLocations
	}));

	return (
		<div>
			<SearchBar addUserItem={addLocation} />
			{/*<div>*/}
			{/*	{list.map(item => (*/}
			{/*		<ul key={`${item}`}>*/}
			{/*			/!*<Grid container spacing={2}>*!/*/}
			{/*			/!*	<IconButton aria-label="delete" size="small" onClick={() => deleteLocation(item)} style ={{right:"23px",bottom:	"3px"}}>*!/*/}
			{/*			/!*		<DeleteIcon fontSize="inherit" />*!/*/}
			{/*			/!*	</IconButton>*!/*/}
			{/*			/!*	<div >*!/*/}
			{/*			/!*		<Typography  noWrap variant="body1" style={{ position: 'absolute', left:'45px'}}>{item}</Typography>*!/*/}
			{/*			/!*	</div>*!/*/}
			{/*			/!*</Grid>*!/*/}
			{/*		</ul>*/}
			{/*	))}*/}
			{/*</div>*/}
				<div>
					{displayPresetList ? (
						<div>
							<DisplayPresetList addPresetLocations={addLocations} />
						</div>
					) : (
						<div></div>
					)}
				</div>
		</div>
	);

});

export default LocationList;
