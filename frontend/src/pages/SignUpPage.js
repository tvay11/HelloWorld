import React,{useState} from "react";
import {Grid} from "@mui/material";
import {Paper} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {auth, firestore} from '../firebase/Firebase.js'
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc } from "firebase/firestore";

function SignUpPage() {

    const paperStyle={padding:30,height:'65vh',width:'50vh'}
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
                background: 'url(https://images.unsplash.com/photo-1606768666853-403c90a981ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80)',
                backgroundSize: "cover",
                height: "95vh",
            }}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <Grid aligh='center' >
                    <Paper style={paperStyle}>
                        <h2> Please Sign Up Here</h2>
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
                    </Paper>
                </Grid>
            </div>
        </div>
    )
}
export default SignUpPage