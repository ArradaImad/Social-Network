import { TextField, OutlinedInput, Button, Typography  } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { login } from "../lib/social-network-library";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        let result = await login(email, password); // Utilisation de la fonction login
    
        if (!result) {
            throw new Error(`Error while login : ${result}`);
        }

        console.log(result);

        // Redirection vers Home / Page de profil de l'utilisateur
        if (result.success) {
            navigate("/");
        }
    }

    return (
        <div className="grow flex flex-col justify-center items-center">
            <div className="max-w-lg w-full shadow-md rounded-lg p-8">
                <Typography variant="h2" align="center" gutterBottom component="div">
                    Login
                </Typography>
                <div className="flex flex-col space-y-4">
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="email" label="Email"  variant="outlined" />
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="password" label="Password" type="password" autoComplete="current-password"/>
                </div>
                <div className="mt-6 flex flex-col justify-center">
                    <Button variant="text" onClick={handleLogin}>Sign in</Button>
                    <p className="text-sm text-center">Don't have an account yet? <span className="underline font-bold"><Link to="/register">Sign up</Link></span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;