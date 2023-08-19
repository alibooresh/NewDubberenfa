import { AppBar, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <AppBar position="static">
            <Container>
                <div>
                    <ul>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                        <li>
                            <Link to={"/signup"}>Signup</Link>
                        </li>
                        <li>
                            <Link to={"/home"}>Home</Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </AppBar>
    );
}