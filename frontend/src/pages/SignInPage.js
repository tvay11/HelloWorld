import React,{useState} from "react";
import {Grid, Link} from "@mui/material";
import {Paper} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../firebase/Firebase.js';
import {useNavigate} from "react-router-dom";
import '../css/signin.css'
import backgroundImage from '../images/pexels-anthony-rahayel-19688624.jpg'

function SignInPage() {


    const paperStyle = {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        height: '65vh',
        width: '50vh',
        borderRadius:'8px',

    };
    const[loginEmail,setLoginEmail] = useState("")
    const[loginPassword,setLoginPassword] =useState("")
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    function handleLoginEmailChange(event) {
        setLoginEmail(event.target.value)
    }

    function handlePassWordChange(event) {
        setLoginPassword(event.target.value)
    }

    const signIn = async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
            navigate('/')

        }catch (error){
            setErrorMessage(error.message)
        }
    }


    return (
        <div
            style={{
                background: `url(${backgroundImage})`,
                backgroundSize: "cover",
                height: "100vh",
            }}>
            <div className="centeredFlexContainer">
                <Grid align='center'>
                    <Paper className="paperStyle">
                        <div>
                            <h2> Sign In</h2>
                            <TextField label="Email Address" variant="standard" fullWidth required onChange={handleLoginEmailChange} style={{ paddingBottom: "20px" }} />
                            <TextField label="Password" variant="standard" type="password" fullWidth required onChange={handlePassWordChange} style={{ paddingBottom: "20px" }} />
                            <Button type="Submit" fullWidth required variant="contained" onClick={signIn}>Sign in</Button>
                            {errorMessage && <p>{errorMessage}</p>}
                        </div>
                        <div style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                            <span>Don't have an account? </span>
                            <Button onClick={() => navigate('/SignUp')} color="primary" >
                                Sign up here
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </div>
        </div>
    );
}
export default SignInPage