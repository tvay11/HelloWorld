import React from "react";
import Itinerary from "../components/ui/Itinerary";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function TwoWayItinerary ({outbound, inbound, price})
{
	return (
	<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
	 <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            m: 1,
            backgroundColor: 'background.paper',
            border: 1,
            width: "40vw",
            borderRadius: '32px'
          }}
        >
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexGrow={1}
    height="fit-content"
  >
    <Itinerary info={outbound} oneWay={false} widthSpec="150%" ></Itinerary>
    <Itinerary info={inbound} oneWay={false} widthSpec="150%" ></Itinerary>
	
  </Box>
  <Grid container justifyContent="flex-end">
    <Typography variant="h6" color="#6c6c6c" gutterBottom={true} sx={{m:2}}>
      {"$" + price }
    </Typography>
  </Grid> 
  </Box>
  </div>

	);
};