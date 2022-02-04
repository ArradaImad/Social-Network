import { Link } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import NavItem from "@material-tailwind/react/NavItem";

function Header() {
    const [openNavbar, setOpenNavbar] = useState(false);
    return (
        <Navbar color="lightBlue" navbar>
        <NavbarContainer>
            <NavbarWrapper>
                <NavbarBrand>The Social Network</NavbarBrand>
                <NavbarToggler
                    color="white"
                    onClick={() => setOpenNavbar(!openNavbar)}
                    ripple="light"
                />
            </NavbarWrapper>

            <NavbarCollapse open={openNavbar}>
                <Nav>
                    <NavLink href="/" ripple="light">
                        {/* <Link to="/">Home</Link> */}
                        Home
                    </NavLink>
                    <NavLink href="/login" ripple="light">
                        {/* <Link to="/login">Login</Link> */}
                        Login
                    </NavLink>
                </Nav>
            </NavbarCollapse>
        </NavbarContainer>
    </Navbar>
    );
}

export default Header;