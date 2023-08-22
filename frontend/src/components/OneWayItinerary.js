import React from "react";
import Itinerary from "../components/ui/Itinerary";

export default function OneWayItinerary({outbound, price})
{
	return (
        
		<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>     
        	<Itinerary info={outbound} price={price} oneWay={true} widthSpec={"60%"}/>			
		</div>
	);
};



            