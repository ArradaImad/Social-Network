import React, { useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import { Link } from "react-router-dom";
import { register } from "../lib/social-network-library"; // Import de la fonction login

function Login() {

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
            <div className="max-w-lg w-full bg-sky-50 shadow-md rounded-lg">
                <Card>
                    <CardHeader color="lightBlue" size="md">
                        <H5 color="white">Register</H5>
                    </CardHeader>

                    <CardBody>
                        <div className="my-4 px-4">
                            <InputIcon
                                type="text"
                                color="lightBlue"
                                placeholder="Firstname"
                                iconName="account_circle"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="text"
                                color="lightBlue"
                                placeholder="Lastname"
                                iconName="account_circle"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                iconName="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Password"
                                iconName="lock"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center mb-2">
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="lg"
                                ripple="dark"
                                onClick={handleRegister}
                            >
                                Sign up
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-sm text-gray-600">Already have an account? <Link to="/login"><span className="underline font-bold">Sign in</span></Link></p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default Login;