import React from "react";
import OneWayItinerary from "../components/OneWayItinerary";
import TwoWayItinerary from "../components/TwoWayItinerary";
import Grid from "@mui/material/Grid";


const Results = (props) => {
	let outboundTrips = [];
	let inboundTrips = [];

	console.log('Offers recieved in results')
	console.log(props.offers.slice(0, 15));

	const numFlights = props.offers.length >= 6 ? 6 : props.offers.length;


	for (let i = 0; i < numFlights; i++) {
		let outboundTrip = props.offers[i].flight.itineraries[0];

		let durations = [];
		for (let j = 0; j < outboundTrip.segments.length; j++) {
			durations.push(outboundTrip.segments[j].duration.slice(2));
		}

		let times = [];
		times.push(outboundTrip.segments[0].departure.at.slice(11, 16));
		times.push(outboundTrip.segments[0].arrival.at.slice(11, 16));
		for (let j = 0; j < outboundTrip.segments.length; j++) {
			const curTime = outboundTrip.segments[j].arrival.at.slice(11, 16);
			const lastTime = times[times.length - 1];
			if (curTime !== lastTime) {
				times.push(curTime);
			}
		}

		let airports = [];
		airports.push(outboundTrip.segments[0].departure.iataCode);
		airports.push(outboundTrip.segments[0].arrival.iataCode);
		for (let j = 0; j < outboundTrip.segments.length; j++) {
			const curAirport = outboundTrip.segments[j].arrival.iataCode;
			const lastAirport = airports[airports.length - 1];
			if (curAirport !== lastAirport) {
				airports.push(curAirport);
			}

		}

		let flightNumbers = [];
		for (let j = 0; j < outboundTrip.segments.length; j++) {
			flightNumbers.push(`${outboundTrip.segments[j].carrierCode}${outboundTrip.segments[j].number}`);
		}

		outboundTrips.push(
			{
				id: i,
				journey: [outboundTrip.segments[0].departure.iataCode, outboundTrip.segments[outboundTrip.segments.length - 1].arrival.iataCode],
				airports: airports,
				flightNumbers: flightNumbers,
				durations: durations,
				times: times,
				price: props.offers[i].price,
				dir: "outbound",
			}
		)
	}

	if (props.tripType === 'roundTrip') {
		for (let i = 0; i < numFlights; i++) {
			let inboundTrip = props.offers[i].flight.itineraries[1];

			let inboundDurations = [];
			for (let j = 0; j < inboundTrip.segments.length; j++) {
				inboundDurations.push(inboundTrip.segments[j].duration.slice(2));
			}

			let inboundTimes = [];
			inboundTimes.push(inboundTrip.segments[0].departure.at.slice(11, 16));
			inboundTimes.push(inboundTrip.segments[0].arrival.at.slice(11, 16));
			for (let j = 0; j < inboundTrip.segments.length; j++) {
				const curTime = inboundTrip.segments[j].arrival.at.slice(11, 16);
				const lastTime = inboundTimes[inboundTimes.length - 1];
				if (curTime !== lastTime) {
					inboundTimes.push(curTime);
				}

			}

			let inboundAirports = [];
			inboundAirports.push(inboundTrip.segments[0].departure.iataCode);
			inboundAirports.push(inboundTrip.segments[0].arrival.iataCode);
			for (let j = 0; j < inboundTrip.segments.length; j++) {
				const curAirport = inboundTrip.segments[j].arrival.iataCode;
				const lastAirport = inboundAirports[inboundAirports.length - 1];
				if (curAirport !== lastAirport) {
					inboundAirports.push(curAirport);
				}
			}

			let inboundFlightNumbers = [];
			for (let j = 0; j < inboundTrip.segments.length; j++) {
				inboundFlightNumbers.push(`${inboundTrip.segments[j].carrierCode}${inboundTrip.segments[j].number}`);
			}

			inboundTrips.push(
				{
					id: i,
					journey: [inboundTrip.segments[0].departure.iataCode, inboundTrip.segments[inboundTrip.segments.length - 1].arrival.iataCode],
					airports: inboundAirports,
					flightNumbers: inboundFlightNumbers,
					durations: inboundDurations,
					times: inboundTimes,
					price: props.offers[i].price,
					dir: "inbound",
				}
			)
		}
	}


	return (
		<Grid container spacing={1}>
			{props.tripType === 'roundTrip' ? (
				outboundTrips.map(trip => (
					<Grid item xs={12} md={6} key={trip.id}>
						<TwoWayItinerary outbound={trip} inbound={inboundTrips[trip.id]} price={trip.price} />
					</Grid>
				))
			) : (
				outboundTrips.map(trip => (
					<Grid item xs={12} md={6} key={trip.id}>
						<OneWayItinerary outbound={trip} price={trip.price} />
					</Grid>
				))
			)}
		</Grid>
	);
};

export default Results;