import { Box, Button } from '@mui/material'
import { RowFlex } from './../../style_extensions/Flex';
import { AddCircleOutline, Notifications, Settings } from '@mui/icons-material';

function Appbar() {
  return (
    <Box
    sx={{
      ...RowFlex,
      justifyContent:"flex-end",
      backgroundColor: "white",
      width: "100%",
      border: "",
      height: "10%",
      borderRadius: "150px",
      gap:"30px",
      pr:"15px"
    }}
  >
    <Notifications sx={{width:"30px", height:"30px"}}/>
    <Settings sx={{width:"30px", height:"30px"}}/>
    <Button sx={{backgroundColor:"text.primary", color:"white", borderRadius:"100px", px:2.5}} variant='contained' startIcon={<AddCircleOutline/>}>Schedule Route</Button>
  </Box>
  )
}

export default Appbar