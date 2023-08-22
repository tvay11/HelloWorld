import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const TypographyList = ({ list }) => {
  const typographyStyles = [
    { fontWeight: 'bold' },
    { fontStyle: 'italic' },
    { textDecoration: 'underline' },
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
      {list.map((item, index) => (
        <Typography key={index} variant="body1" color="black">
          {item}
        </Typography>
      ))}
    </Box>
  );
};
export default TypographyList;