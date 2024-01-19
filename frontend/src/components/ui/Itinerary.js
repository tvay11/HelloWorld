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
  const cost = price
    return (

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            p: 1,
            m: 1,
            backgroundColor: 'white',
            border: 1,
            width: '35vw',
            borderRadius: '16px',
            color : tripType === "one-way" ?
                  'black':'#d9d9d9',
          height:'24vh',

          }}
        >
          <Box
            sx={{ display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'background.paper',
                justifyContent: 'space-between',
            }}
          >

              <Item id="primary">{info.journey[0] + " → " + info.journey[1]}</Item>

          </Box>

          <FlightTimeline info={info}/>
          

          
        {
            // oneWay ?
            <Grid container justifyContent="flex-end">
              <Typography variant="h6" color="#6c6c6c" gutterBottom={true} sx={{m:2}}>
                {/*{"$" + {cost}}*/}
              </Typography>
            </Grid>
            // <Grid container justifyContent="flex-end"/>
        } 

          
        </Box>


  );
}




