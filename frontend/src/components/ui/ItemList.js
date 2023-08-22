import React from 'react';
import { Box } from '@mui/material';
import Item from './Item';

const ItemList = ({ list, dir}) => {
  const locTypes = 
  ["origin", "inflight","destination"];
  
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      {list.map((item, index) => (
        <Item id={
          (index == 0  && dir == "outbound") ? locTypes[0] :
          (index == 0  && dir == "inbound") ? locTypes[2] :  
          (index == list.length-1 && dir == "outbound") ? locTypes[2] : 
          (index == list.length-1 && dir == "inbound") ? locTypes[0] : 
          locTypes[1]
        }>
          {item}
        </Item>
      ))}
    </Box>
  );
};
export default ItemList;