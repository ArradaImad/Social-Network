import React, { useState } from "react";
import { TextField, Button, Typography  } from "@mui/material";
import { Link } from "react-router-dom";
import { register } from "../lib/social-network-library"; // Import de la fonction login

function Register() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        let result = await register(firstname, lastname, email, password); // Utilisation de la fonction login

        if (!result) {
            throw new Error(`Error while registering : ${result}`)
        }

        console.log(result);
    }

    return (
        <div className="grow flex flex-col justify-center items-center">
            <div className="max-w-lg w-full shadow-md rounded-lg p-8">
                <Typography variant="h2" align="center" gutterBottom component="div">
                    Register
                </Typography>
                <div className="flex flex-col space-y-4">
                    <TextField onChange={(e) => setFirstname(e.target.value)} value={firstname} id="firstname" label="Firstname" variant="outlined" />
                    <TextField onChange={(e) => setLastname(e.target.value)} value={lastname} id="lastname" label="Lastname" variant="outlined" />
                    <TextField onChange={(e) => setEmail(e.target.value)} value={email} id="email" label="Email"  variant="outlined" />
                    <TextField onChange={(e) => setPassword(e.target.value)} value={password} id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
                </div>
                <div className="mt-6 flex flex-col justify-center">
                    <Button variant="text" onClick={handleRegister}>Sign up</Button>
                    <p className="text-sm text-center">Already have an account? <span className="underline font-bold"><Link to="/login">Sign in</Link></span></p>
                </div>
            </div>
        </div>
    );
}

export default Register;