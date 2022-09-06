import React from "react";
import LoginButton from "../../../Components/Login/Buttton";

function Provider() {

    return (
        <div id="connexions">
            <h3>Connexions</h3>
            <div className="user-connexions">
                <div>
                    <LoginButton >Connect eth wallet</LoginButton>
                    <LoginButton >Connect binance wallet</LoginButton>  
                </div>
            </div>
        </div>
    )
}


function Connexions() {

    return (
            <Provider />
    )
}

export default Connexions;