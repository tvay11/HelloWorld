import React, { useEffect, useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

function SearchBar({addUserItem}) 
{
	const [airports, setAirports] = useState([]);
	const [airportData, setAirportData] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const fetchData = (searchTerm) => {
        console.log(searchTerm)
        fetch(`/airports?keyword=${searchTerm.toUpperCase()}&subType=AIRPORT&page=0`)
				.then((response) => {
					if(response.ok) {
						return response.json();
					} else {
						throw new Error(`Request failed with status code ${response.status}: ${response.statusText}`);
					}
				})
				.then((res) => {
                    setAirportData(res.data);
                    let temp = [];
                    for(let i=0; i<res.data.length; i++) {
                        temp.push(`${res.data[i].iataCode} - ${res.data[i].name} - ${res.data[i].address.cityName}`);
                    }
                    setAirports(temp);
				})
				.catch((error) => {
					console.error(`Request failed with status code ${error.message}`);
				});
    };

	function handleItemSelection(location) 
	{
		console.log(location);
		addUserItem(location); //call function to update items in list connected to search bar
	}

	return (
		<div>
			<Grid container spacing={-2}>
				<Autocomplete
					id="combo-box-demo"
					options={airports}
					onInputChange={(event, newValue) => {
						setInputValue(newValue);
					}}
					onChange={(event, newValue) => {
						if (newValue != null) {
							handleItemSelection(newValue);
						}
					}}
					onKeyPress={(event) => {
						if(event.key === "Enter") {
							fetchData(inputValue);
						}
					}}
					sx={{ width: 350 }}
					renderInput={(params) => <TextField {...params} 
												label="Press Enter to Get Matching Airports" 
												variant="outlined"
                                            	required={true}
											/>}
				/>
			</Grid>
		</div>
	);
}

export default SearchBar;
