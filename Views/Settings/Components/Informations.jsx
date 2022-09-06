import React from "react";

import Themes from "./Themes";
import Block from "./Block";
import Connexions from "./Connexions";
import Security from "./Security";
import Keyboard from "./Keyboard";
import Legal from "./Legal";

function Informations({ token, user_info }) {

    return (
        <>
            <Themes />
            <Block />
            <Connexions />
            <Security />
            <Keyboard />
            <Legal />
        </>
    )
}

export default Informations;