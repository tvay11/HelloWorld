import React,{useState} from "react";
import {Grid, Link} from "@mui/material";
import {Paper} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../firebase/Firebase.js';
import {useNavigate} from "react-router-dom";



function SignInPage() {


    const paperStyle={padding:30,height:'65vh',width:'50vh'}
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
            window.history.back()

        }catch (error){
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
                        <h2> Please Sign In Here</h2>
                            <TextField label="Email Address" variant="standard" fullWidth required onChange={handleLoginEmailChange} style={{paddingBottom:"20px"}}/>
                            <TextField label="Password" variant="standard" type="password"  fullWidth required onChange={handlePassWordChange} style={{paddingBottom:"20px"}}/>
                        <Button type="Submit" fullWidth required  variant="contained" onClick={signIn} >Sign in</Button>
                        {errorMessage && <p>{errorMessage}</p>}
                        <Link href= '/SignUp' underline="hover" >
                            Sign up Here
                        </Link>
                    </Paper>
                </Grid>
            </div>
        </div>
    )
}
export default SignInPage