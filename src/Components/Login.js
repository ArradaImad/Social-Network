import React from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="grow flex flex-col justify-center items-center">
            <div className="max-w-lg w-full bg-sky-50 shadow-md rounded-lg">
                <Card>
                    <CardHeader color="lightBlue" size="md">
                        <H5 color="white">Login</H5>
                    </CardHeader>

                    <CardBody>
                        <div className="mt-4 mb-8 px-4">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                iconName="email"
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Password"
                                iconName="lock"
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
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-sm text-gray-600">Don't have an account yet? <Link to="/register"><span className="underline font-bold">Sign up</span></Link></p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default Login;