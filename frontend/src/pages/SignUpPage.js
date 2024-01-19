import React,{useState} from "react";
import {Grid} from "@mui/material";
import {Paper} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {auth, firestore} from '../firebase/Firebase.js'
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc } from "firebase/firestore";
import '../css/signin.css'
import backgroundImage from '../images/pexels-sergio-souza-1936936.jpg'
function SignUpPage() {

    const paperStyle = {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        height: '65vh',
        width: '50vh',
        borderRadius:'8px',
    };
    const[registerEmail,setRegisterEmail] = useState("")
    const[registerPassword,setRegisterPassword] =useState("")
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    function handleRegisterEmailChange(event) {
        setRegisterEmail(event.target.value)
    }

    function handleRegisterPasswordChange(event) {
        setRegisterPassword(event.target.value)
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const register= async ()=> {
        try {
            const { user } = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
            await updateProfile(user, {displayName: (firstName+' '+lastName)})
            await setDoc(doc(firestore, 'users', user.uid), {
            	fullName: (firstName+" "+lastName),
				id: user.uid,
                presets: [],
            });
            navigate(('/'))
        } catch (error){
            setErrorMessage(error.message)
        }
    }


    return(
        <div
            style={{
                background: `url(${backgroundImage})`,
                backgroundSize: "cover",
                height: "100vh",
                backgroundRepeat: "no-repeat",
            }}>
            <div className="centeredFlexContainer">
                <Grid align='center'>
                    <Paper className="paperStyle">
                        <div>
                            <h2> Sign Up</h2>
                        <div >
                            <div style={{marginLeft: '10vw'}}>
                            </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                                    <TextField label="First Name" value={firstName} onChange={handleFirstNameChange} variant="standard" required/>
                                    <TextField label="Last Name" value={lastName} onChange={handleLastNameChange} variant="standard" required/>
                                </div>
                                <div>
                            <TextField  label="Email Address" variant="standard" fullWidth required onChange={handleRegisterEmailChange}/>
                            <TextField  label="Password"  variant="standard" type="password" sx={{ mt: 1, mb: 2 }} fullWidth required onChange={handleRegisterPasswordChange}/>
                        <Button type="Submit" fullWidth required  variant="contained" onClick={register}>Sign Up</Button>
                            </div>
                            {errorMessage && <p>{errorMessage}</p>}
                        </div>
                        </div>
                    </Paper>
                </Grid>
            </div>
        </div>
    )
}
export default SignUpPage