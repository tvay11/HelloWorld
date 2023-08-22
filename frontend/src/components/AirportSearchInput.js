import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function AirportSearchInput(props) {
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

    return (
        <div>
            <Autocomplete
                id="combo-box-demo"
                value={props.value}
                options={airports}
                onInputChange={(event, newValue) => {
                    setInputValue(newValue);
                }}
                onChange={(event, newValue) => {
                    props.onChange(newValue);
                }}
                onKeyPress={(event) => {
                    if(event.key === "Enter") {
                        fetchData(inputValue);
                        props.onDataRetrieval(airportData);
                    }
                }}
                sx={{ width: 300 }}
                style={{
                    height: '100px',
                    padding: '10px',
                    fontSize: '22px',
                    maxWidth: '165px',
                    marginRight: '-20px',
                }}
                multiple={true}
                renderInput={(params) => <TextField {...params} 
                                            variant="outlined"
                                            label={props.label}
                                            required={true}
                                        />}
            />
        </div>
    );
}

export default AirportSearchInput;
