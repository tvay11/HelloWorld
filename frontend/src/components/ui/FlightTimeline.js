import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import TypographyList from './TypographyList';
import AirlinesIcon from '@mui/icons-material/Airlines';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ItemList from './ItemList';
import WebsiteTheme from './WebsiteTheme';

const ColorlibConnector = styled(StepConnector)(({ theme, dir}) => ({
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundImage:
      dir == "outbound" ? 'linear-gradient( 95deg,rgb(229,122,56) 0%,rgb(20,65,210) 50%,rgb(137,198,114) 100%)' : 
      'linear-gradient( 95deg,rgb(137,198,114) 0%,rgb(20,65,210) 50%,rgb(229,122,56) 100%)',
    borderRadius: 1,
  },
}));

const StepperSx = {
    "& .MuiStepConnector-root": {
        left: "calc(-50% + 20px)",
        right: "calc(50% + 20px)"
    },
    "& .MuiStepConnector-line": {
        marginTop: "22px"
    },
    "& .MuiStepIcon-root": {
        margin: "4px 0",
    },

    "& .MuiStepLabel-label": {
        marginTop: "-5%",
        color:'gray',
    },
};




const LabelIcon = (props) => {
    const { active, completed, className } = props;

    const iconStyle = {
        marginTop: '80%',
        zIndex:'2',
    };

    if (active && completed) {
        return <FmdGoodIcon className={className} color="success" style={iconStyle} />
    } else if (!active && completed) {
        return <FmdGoodIcon className={className} color="error" style={iconStyle} />
    }
    return <AirlinesIcon className={className} color="primary" style={iconStyle} />
}


export default function FlightTimeline({info}) {

  const direction = info.dir;
  const isLastStop = (step) => {
    return step === info.times.length-1;
  };



  return (
      <Box sx={{ width: '100%', position: 'relative' }}>
      <TypographyList list={info.durations}/>
          <Box sx={{
              position: 'absolute',
              top:'1vh',
              left: 0,
              right: 0,
              zIndex: 0,
              backgroundColor: 'lightgray',
              height: '105%',
              borderRadius: '8px'
          }} />
      <Stepper alternativeLabel nonLinear 
      activeStep={(direction == "outbound") ? (info.times.length-1): 0}
      connector={<ColorlibConnector dir={direction}/>}
      sx = {StepperSx}>
        {info.times.map((label, index) => (
          <Step key={label}  completed={isLastStop(index)}>
            <StepLabel StepIconComponent={LabelIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}></Box>
      <ItemList list={info.airports} dir={info.dir}/> 
      <Box/>


    </Box>
  );
}