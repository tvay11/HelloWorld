import React, { useEffect, useState, useRef} from "react";
import {
	TextField,
	IconButton,
	Button,
	styled,
	Typography,
	Grid,
	Paper,
	Link,
	Alert,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import {
	Accordion as MuiAccordion,
	AccordionSummary as MuiAccordionSummary,
	AccordionDetails as MuiAccordionDetails,
} from "@mui/material";
import {ArrowForwardIosSharp as ArrowForwardIosSharpIcon} from "@mui/icons-material";
import LocationList from "../components/LocationList";
import EditIcon from '@mui/icons-material/Edit';

import {auth} from '../firebase/Firebase.js';
import getUserPresets from "../utils/firestore/GetUserPresets";
import editPreset from "../utils/firestore/EditPreset";
import createPreset from "../utils/firestore/CreatePreset";
import deletePreset from "../utils/firestore/DeletePreset";

var colors = { 
	"Default": "#81b71a",
	"Blue": "#1441d2",
	"Orange": "#e57b37",
};

function AccountDetails()
{
	const [presetList, setPresetList] = useState([ {}, {}, {}, {}, {}]); // have to initialize empty at start to prevent number of hooks changing
	const refList = []; // have to initialize ref list at beginning with refs so a different number of hooks isn't loaded in time it takes to check if user is logged in
	for (let i = 0; i < 5; i++) {
		const childRef = useRef(null);
		refList.push(childRef);
	} 
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [unadjustedPresetList, setUnadjustedPresetList] = useState([]);
	const [userUID, setUserUID] = useState(null);

	const [presetTitle, setPresetTitle] = useState('');
	const [listCount, setListCount] = useState('');

	const [presetToBeChanged, setPresetToBeChanged] = useState('');
	const [renamedPresetTitle, setRenamedPresetTitle] = useState('');
	const [childRefToBeChanged, setChildRefToBeChanged] = useState('');
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [renameOpen, setRenameOpen] = React.useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
		   if (user) {
			   setIsLoggedIn(true);
				var uid = user.uid;
				setUserUID(uid);
		   } else {
				setIsLoggedIn(false); // user that isn't signed in can only get to this page if url is explicitly typed in so this is a safeguard
		   }
		   })
	   }, []);

	useEffect(() =>
	{
		if (userUID) {
			getUserPresets(userUID) 
			.then((res) => setUnadjustedPresetList(res)) // grabbed from database but we need to format it how page expects it
			.catch((error) => 
			console.error( `${error.response.data}`));
		}
	}, 
	[userUID]);

	useEffect(() => 
	{
		
	}, [presetList]);

	function adjustPresetList() {
		setListCount(listCount+1);
		if (unadjustedPresetList != null) {
			for (let i = 0; i < unadjustedPresetList.length; i++) { // filling in necessary pre-existing presets with actual data from database
				presetList[i] = unadjustedPresetList[i];
			}
		}
	}
	
	useEffect(() => 
	{
		adjustPresetList();
	}, [unadjustedPresetList]);

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};
	
	function handleRenameOpen(currentPresetTitle, presetChildRef) {
		setRenameOpen(true);
		console.log(currentPresetTitle);
		setPresetToBeChanged(currentPresetTitle);
		setChildRefToBeChanged(presetChildRef);
	}

	const handleRenameClose = () => {
		setRenameOpen(false);
	};

	const sendRename = async(presetIndex, presetChildRef) => {
		const presetCurrentList = await presetChildRef.current.sendCurrentListStatus();
		const editComplete = await editPreset(userUID, presetIndex, renamedPresetTitle, presetCurrentList); 
		return editComplete;
	}

	function renamePreset() {
		const presetIndex = presetList.findIndex(preset => preset.title === presetToBeChanged);
		let uniqueTitle = checkUniqueTitle(renamedPresetTitle);
		if (uniqueTitle) {
			const editComplete = sendRename(presetIndex, childRefToBeChanged);
			if (editComplete != null) {
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		} else {
			handleAlertOpen();
		}
	}

	function renameDone() {
		handleRenameClose();
		renamePreset();
	}

	const sendLocationEdits = async (presetIndex, presetChildRef) => {
		const presetCurrentList = await presetChildRef.current.sendCurrentListStatus();
		const editComplete = await editPreset(userUID, presetIndex, presetList[presetIndex].title, presetCurrentList); 
		return editComplete;
	}

	function savePresetList(presetIndex, presetChildRef) {
		const editComplete = sendLocationEdits(presetIndex, presetChildRef);
		if (editComplete != null) {
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	}

	const sendNewPreset = async(presetTitle) => {
		const editComplete = await createPreset(userUID, presetTitle, []); 
		return editComplete;
	}

	function checkUniqueTitle(newTitle) {
		let uniqueTitle = true;
		for (let j = 0; j < presetList.length; j++) {
			if (presetList[j].title === newTitle) {
				uniqueTitle = false;
			}
		}
		return uniqueTitle;
	}

	function addNewPreset () {
		if (presetTitle !== '') 
		{
			let emptySpace = false;
			for (let i = 0; i < presetList.length; i++) {
				if (presetList[i].title == null && !emptySpace) {
					emptySpace = true;
					let uniqueTitle = checkUniqueTitle(presetTitle);
					if (uniqueTitle) {
						const editComplete = sendNewPreset(presetTitle);
						if (editComplete != null) {
							setTimeout(() => {
								window.location.reload();
							}, 1000);
						}
					} else {
						handleAlertOpen();
					}
				}
			}
			if (!emptySpace) {
				console.log("please delete a preset before adding a new one");
			}

			setPresetTitle('');
			console.log(presetList);
		}
	}

	const sendDeletion = async(presetIndex) => {
		const editComplete = await deletePreset(userUID, presetIndex); 
		return editComplete;
	}

	function deleteSelectedPreset(presetName) {
		console.log(presetName);
		// find index of preset to be deleted
		const presetIndex = presetList.findIndex(preset => preset.title === presetName);
		const editComplete = sendDeletion(presetIndex);
		if (editComplete != null) {
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	}

	function checkSpaceLeft() {
		let spaceLeft = false;
		for (let i = 0; i < presetList.length; i++) {
			if (presetList[i].title == null) {
				spaceLeft = true;
			}
		}
		return spaceLeft;
	}

	const Accordion =
		styled(
			(props) => (<MuiAccordion disableGutters elevation={0} square {...props} />))(
			({ theme }) => ({
			border:
			`1px solid ${theme.palette.divider}`,
			"&:not(:last-child)": {borderBottom: 0},
			"&:before": {display: "none"},
			}));
  
	const AccordionSummary = styled((props) => (
			<MuiAccordionSummary
				expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
				{...props}
			/>
		))(({ theme }) => ({
			backgroundColor:
		theme.palette.mode === "dark" 
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
			flexDirection: "row-reverse",
			"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
				transform: "rotate(90deg)"},
			"& .MuiAccordionSummary-content": {
				marginLeft: theme.spacing(1),
			},
		}));

	const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
		padding: theme.spacing(2),
		borderTop: "1px solid rgba(0, 0, 0, .125)",
		}));

	return (
		<div>
			{!isLoggedIn ? (
				<div style={{height: "100vh"}}>
					<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>
						<Grid aligh='center' >
							<Paper style={{padding:"30px",height:'35vh',width:'50vh'}}>
								<h2> Please Sign In</h2>
								<p>You must be signed in to access this page</p>
								<Link href= '/SignIn' underline="hover" >
									Sign In Here
								</Link>
							</Paper>
						</Grid>
					</div>
				</div>
			) : (
				<div>
				<h1 className="titleName">Account Preference</h1>
				<div className = "LocationPresets">
					<h2 style={{ color: `${colors.Orange}` }}> 
						Location Presets 
					</h2>
					<Alert severity = "info" style={{width:"95vw"}}>
						Create Up to 5 Location Presets
					</Alert>
					
					<div id = "alert message about non-unique names">
						<Dialog open={alertOpen} onClose={handleAlertClose}>
							<DialogTitle>
								{"Presets must have unique names!"}
							</DialogTitle>
							<DialogActions>
								<Button onClick={handleAlertClose}> Close </Button>
							</DialogActions>
						</Dialog>
					</div>

					<div id = "preset rename interface">
						<Dialog open={renameOpen} onClose={handleRenameClose}>
							<DialogTitle>
								Enter New Name for Preset
							</DialogTitle>
							<DialogContent>
								<TextField
									autoFocus
									margin="dense"
									label="New Preset Name"
									fullWidth
									variant="standard"
									onChange={(e) => setRenamedPresetTitle(e.target.value)}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={renameDone}>
									Rename
								</Button>
							</DialogActions>
						</Dialog>
					</div>
					
					<div id = "location presets"> 
						{presetList.map((preset,index) => {
							const presetChildRef = refList[index];
							if (preset.title != null) {
								return (
									<div key={preset.title}>
										<Accordion key = {preset.title} >
											<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
												<Grid container spacing={-5}>
													<Typography> {preset.title} </Typography>
													<IconButton aria-label="delete" size="small" onClick={() => handleRenameOpen(preset.title, presetChildRef)}>
														<EditIcon fontSize="inherit"/>
													</IconButton>
												</Grid>
											</AccordionSummary>
											<AccordionDetails>
												<LocationList displayPresetList = {false} ref={presetChildRef} inputList={preset.locations} />
												<Button 
													sx = {{height: 55}}
													variant="contained"  
													onClick = {() => savePresetList(index, presetChildRef)} // get updated value of editable list to pass to backend
													>
													SAVE PRESET
												</Button>
												<Button 
													sx = {{height: 55}}
													variant="contained"  
													onClick = {() => deleteSelectedPreset(preset.title)} 
													>
													DELETE PRESET
												</Button>
											</AccordionDetails>
										</Accordion>
									</div>
								);
							}
						})}
						
						{checkSpaceLeft() ? (
							<Grid container spacing={-2}>
								<TextField 
									id="outlined-basic" 
									label="Preset Title" 
									variant="outlined" 
									margin="normal"
									value = {presetTitle}
									onChange={(e) => setPresetTitle(e.target.value)} /> 
								
								<Button 
									sx = {{height:40, m:2, p:3.3}}
									variant="contained"  
									color="warning"
									type = "submit"
									onClick={addNewPreset}
								>
									Create New Location Preset 
								</Button>
							</Grid>
						) : (
							<Alert severity="error">You have already reached the maximum number of presets. Delete a pre-existing preset to create a new one.</Alert>
						)}
					</div>
				</div>
				</div>
			)}

		</div>
	);


}

export default AccountDetails;