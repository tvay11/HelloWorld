import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const TypographyList = ({ list }) => {
  return (
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0
      }}>
        {list.map((item, index) => (
            <Typography key={index} variant="body2" color="gray" sx={{ fontSize: '0.75rem', zIndex:2 }}>
              {item}
            </Typography>
        ))}
      </Box>
  );
};

export default TypographyList;
