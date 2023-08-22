import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import {Button, FormControl, InputLabel, MenuItem, Select,} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import LocationList from "../components/LocationList";
import Results from '../pages/Results'; 
import BinaryHeap from '../utils/Heap'
import {auth} from "../firebase/Firebase";
import getUserPresets from "../utils/firestore/GetUserPresets";

const SearchFlight = forwardRef((props, ref) => {
    const today = dayjs().startOf('day');

    const [departureDate, setDepartureDate] = useState(today.add(1, 'day'));
    const [arrivalDate, setArrivalDate] = useState(today.add(2,'week'));
    const [numPassengers, setNumPassengers] = useState(1);
    const [type, setType] = useState("roundTrip");
    const [classType, setClassType] = useState("ECONOMY");
    const [arrivalDateVisible, setArrivalDateVisible] = useState(true);
    const [offers, setOffers] = useState([]);
    const [searchDisabled, setSearchDisabled] = useState(false);
    const [verticalHeight, setVerticalHeight] = useState(200)
    const [userUID, setUserUID] = useState(null);
	const [originLocations, setOriginLocations] = useState([]); 
	const [destinationLocations, setDestinationLocations] = useState([]); 
    const [presetCount,setPresetCount] = useState(0)
    const [sortedFlights, setSortedFlights] = useState([]);
	const originChildRef = useRef(null);
	const destinationChildRef = useRef(null);
    const [originCount,setOriginCount] = useState(0)
    const [destCount,setDestCount] = useState(0)

    const handleListCountChange = (count,location) => {
        if (location === "origin") {
            setOriginCount(count)
        }
        else if (location === "destination") {
            setDestCount(count)
        }
        console.log(location)
        let maxHeight = Math.max(originCount,destCount) * 26 + (presetCount* 32);
        setVerticalHeight(maxHeight+100);
    };

	function getCurrentOriginListStatus() {
		// call on location list child component to return everything currently in the list 
		const originCurrentList = originChildRef.current.sendCurrentListStatus();
		return originCurrentList;
	}

	function getCurrentDestinationListStatus() {
		// call on location list child component to return everything currently in the list 
		const destinationCurrentList = destinationChildRef.current.sendCurrentListStatus();
		return destinationCurrentList;
	}

	function sendModalLocations(newLocations) { // takes in locations from modal and sends them to destination location list
		if (destinationChildRef.current) {
			destinationChildRef.current.addLocationsFromModal(newLocations);
		}
	}
	
	useImperativeHandle(ref, () => ({
		sendModalLocations: sendModalLocations
	}));

    useEffect(() => {
        console.log(offers);

    }, [offers])


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                setUserUID(uid);
            } else {
            }
        })
    }, []);

    useEffect(() =>
        {
            if (userUID) {
                getUserPresets(userUID)
                    .then((res) => {
                        setPresetCount(res.length);
                        setVerticalHeight(presetCount* 32 + 100)
                    })
                    .catch((error) =>
                        console.error( `${error.response.data}`));
            }
        },
        [userUID]);


    const maxDate = today.add(11, 'month');

    const handleDepartureDateChange = (date) => {
        setDepartureDate(date);
        if (departureDate < arrivalDate) {
            handleArrivalDateChange(date);
        }
    };

    const handleArrivalDateChange = (date) => {
        setArrivalDate(date);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
        setArrivalDateVisible(event.target.value === 'roundTrip');
    };

    const handleNumPassengersChange = (event) => {
        setNumPassengers(event.target.value);
    };

    function handleClassChange(event) {
        setClassType(event.target.value);
    }

    function handleSearch(originList, destinationList) {
        setSearchDisabled(true)
        let origins = [];
        let destinations = [];

		for (let i = 0; i < originList.length; i++) {
			origins.push(originList[i].substring(0, 3));
		}
	
		for(let i=0; i<destinationList.length; i++) {
			destinations.push(destinationList[i].substring(0, 3));
		}

        let url = '';


        if(type === "roundTrip") {
            url = `/flights?origin=${origins}&destination=${destinations}&departureDate=${dayjs(departureDate).format('YYYY-MM-DD')}&returnDate=${dayjs(arrivalDate).format('YYYY-MM-DD')}&adults=${numPassengers}&flightClass=${classType}`;
            console.log(`Departure date being used ${dayjs(departureDate).format('YYYY-MM-DD')}`)
            console.log(`Departure date being used ${dayjs(arrivalDate).format('YYYY-MM-DD')}`)
        } else {
            url = `/flights?origin=${origins}&destination=${destinations}&departureDate=${dayjs(departureDate).format('YYYY-MM-DD')}&adults=${numPassengers}&flightClass=${classType}`;
        }

        fetch(url)
            .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Request failed with status code ${response.status}: ${response.statusText}`);
            }})
            .then((data) => {
                setSearchDisabled(false);
                setOffers(data.offers);
                sortResults(data.offers);
                console.log(data.offers)
            })
            .catch((error) => {
                console.error(`Request failed with status code ${error.message}`);
            });
    }

	function handleSearchClick() {
		// call on the location list components to give their current status 
		const origins = getCurrentOriginListStatus(); 
		const destinations = getCurrentDestinationListStatus();
		if (origins.length > 0 && destinations.length > 0) { // only allow search if user has completed all required fields
			handleSearch(origins, destinations);
		}
	}

    const sortResults = (flights) => {
        try {
            const flightNodes = [];

            flights.forEach(itinerary => {
                itinerary.forEach(flight => {
                    const node = {
                        price: flight.price.total,
                        flight: flight
                    };
                    flightNodes.push(node);
                });
            });

            setSortedFlights(flightNodes);
            console.log(flightNodes);

            const compFunc = (a, b) => {
                parseFloat(a.price) < parseFloat(b.price);
            }
            
            const minHeap = new BinaryHeap(compFunc);

            for(let i=0; i<flightNodes.length; i++) {
                minHeap.insert(flightNodes[i]);
            }

            console.log(minHeap);

            const cheapestFlights = [];

            while (minHeap.getSize()-4 > 0) {
                cheapestFlights.unshift(minHeap.removeRoot().flight);
                console.log('root removed')
            }
			
            console.log('Cheapest flights:')
            console.log(cheapestFlights)
        } catch (error) {
            console.error(error);
        }

    }

    const Style =
        {
            textStyle: {
                height: '80px',
                paddingLeft: '10px',
                paddingRight:'10px',
                fontSize: '22px',
                width: '190px',
                marginRight: '-20px',

            },
            textStyle2: {
                width: '130px',
                height: '80px',
                paddingLeft: '10px',
                paddingRight:'10px',
                fontSize: '30px',
                marginRight: '-20px',
            },
            textStyle3: {
                opacity:"0.7",
            },
            divStyle: { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding:'5px',marginBottom:"100px"},
            rowStyle: { display: 'flex', flexDirection: 'row', justifyContent: 'center',marginTop:"30px", alignItems: 'center',},
            h1Style: {width: '0vw', fontSize: 50, textAlign:'center'},
            gap: { height: verticalHeight,
            }
        }


    return (
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                    <div style={Style.divStyle}>
                        <div style={Style.rowStyle}>
							<div id = "origin locations" style = {{position:"absolute", left:'275px',top:"170px"}}>
								<h2 style={Style.textStyle3}> Origin </h2>
                                <LocationList displayPresetList={true} ref={originChildRef} inputList={originLocations} handleListCountChange={(count) => handleListCountChange(count, "origin")} />
                            </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleSearchClick}
                                style={{
                                    backgroundColor: searchDisabled ? "" : "#1441d2",
                                    left: "50.1%",
                                    top: "30%",
                                    transform: "translate(-50%, -50%)",
                                    position: "absolute",
                                }}
                                disabled={searchDisabled}
                                size="large"
                            >Search
                            </Button>
                            </div>
							<div id = "destination locations" style = {{position:"absolute", right:'250px',top:"170px"}}>
								<h2 style={Style.textStyle3}> Destination </h2>
                                <LocationList displayPresetList={true} ref={destinationChildRef} inputList={destinationLocations} handleListCountChange={(count) => handleListCountChange(count, "destination")} />
							</div>
                        </div>
                        <div style={Style.rowStyle} className = "QWEQWEQWE">
                        <div style={Style.gap}></div>
                        </div>
                        <div style={ Style.rowStyle}>
                            <div style = {{position:"relative", right:"10px"}}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label = "Departure Day"
                                    defaultValue={today.add(1, 'day')}
                                    onChange= {handleDepartureDateChange}
                                    format="YYYY-DD-MM"
                                    disablePast={true}
                                    sx={Style.textStyle}
                                    minDate={today.add(1, 'day')}
                                    maxDate={maxDate}
                                    required={true}
                                />
                            </LocalizationProvider>

                            <FormControl variant="outlined"   style={Style.textStyle2} required={true}>
                                <InputLabel>Type</InputLabel>
                                <Select value={type}
                                        onChange={handleTypeChange}
								>
                                    <MenuItem value="oneWay">One Way</MenuItem>
                                    <MenuItem value="roundTrip">Round Trip</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined"   style={Style.textStyle2} required={true}>
                                <InputLabel>Passengers</InputLabel>
                                <Select
                                    value={numPassengers}
                                    onChange={handleNumPassengersChange}
								>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined"   style={Style.textStyle} required={true}>
                                <InputLabel>Class</InputLabel>
                                <Select value={classType}
									onChange={handleClassChange}
								>
                                    <MenuItem value="ECONOMY">Economy</MenuItem>
                                    <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
                                    <MenuItem value="BUSINESS">Business</MenuItem>
                                    <MenuItem value="FIRST">First Class</MenuItem>
                                </Select>
                            </FormControl>
                            {arrivalDateVisible ?
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Arrival Day"
                                        defaultValue={today.add(2, "weeks")}
                                        onChange={handleArrivalDateChange}
                                        format="YYYY-DD-MM"
                                        disablePast={true}
                                        sx={Style.textStyle}
                                        maxDate={maxDate.add(2, "weeks")}
                                        minDate={departureDate.add(1, 'day')}
                                        required={true}
                                    />
                                </LocalizationProvider>
                                : <TextField style={Style.textStyle} disabled/>
                            }
                        </div>
                        </div>
                    </div>
            </div>
                {offers.length != 0 ? (
                    <Results offers={sortedFlights} tripType={type} />
                ) : 
                <div style={Style.rowStyle}> 
                No results. 
                </div>
                }
        </div>
    );
});

export default SearchFlight;
