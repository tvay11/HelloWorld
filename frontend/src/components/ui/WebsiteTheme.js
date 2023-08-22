import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
/** 
 * this function holds Color Pallete
 * @param {PaletteMode} mode
 */
const WebsiteTheme = () => createTheme({
	palette: {
		primary: {
			main: "#e57b37", //orange
			contrastText: '#ffffff'
		},
		secondary:{
			main: "#1441d2", //blue 
		},
		default:{
			main: "#81b71a", //green
		},
		origin:{
			main: "#de706f", //red
			contrastText: '#ffffff'	
		},
		destination:{
			main: "#89c672", //green
			contrastText: '#ffffff'
		},
		inflight:{
			main: "#7299c6", //blue
			contrastText: '#ffffff'
		}
	},
});


export default WebsiteTheme;

