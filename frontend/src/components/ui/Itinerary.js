import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import EastIcon from '@mui/icons-material/East';
import { Box, ThemeProvider} from '@mui/system';
import FlightTimeline from './FlightTimeline';
import Item from './Item';
import { Button } from '@mui/material';

export default function Itinerary({info, price, oneWay, widthSpec})
{
  const tripType = info.trip;
  const dir = info.dir;
  
    return (
      
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            border: 1,
            width: widthSpec,
            borderRadius: '32px',
            color : tripType === "one-way" ? 
                  'black':'#d9d9d9',
          }}
        >
          <Box
            sx={{ display: 'flex', 
              flexDirection: 'row', 
              bgcolor: 'background.paper' 
            }}
          >
            <Item id = {dir === "outbound" ? "origin" : "destination"}>
              {dir === "outbound" ? "Origin" : "Destination"}
              </Item>
            <EastIcon style={{color: 'black',
                              marginTop: '10px' }}/>
            <Item id = {dir === "inbound" ? "origin" : "destination"}> {dir === "inbound" ? "Origin" : "Destination"}</Item>
            <Item id="primary">{info.journey[0] + " → " + info.journey[1]}</Item>

          </Box>

          <FlightTimeline info={info}/>
          
          <Grid container justifyContent="flex-end">
            <Typography variant="h6" color="#6c6c6c" gutterBottom={true} sx={{m:2}}>
              {"Flight Numbers: " + info.flightNumbers}
            </Typography>
          </Grid> : 
          <Grid container justifyContent="flex-end"/>
          
        {
            oneWay ? 
            <Grid container justifyContent="flex-end">
              <Typography variant="h6" color="#6c6c6c" gutterBottom={true} sx={{m:2}}>
                {"$" + price + " per ticket"}
              </Typography>
            </Grid> : 
            <Grid container justifyContent="flex-end"/>
        } 

          
        </Box>


  );
}




