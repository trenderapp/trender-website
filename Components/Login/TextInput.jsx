import React from "react";
import loginStyles from "./Login.module.scss"

function LoginTextInput({ children, label, svg }) {
    return (
        <div className={loginStyles.inputstyle}>
            <label>{label && label + ":"} {svg ?? ""}</label>
            { children }
        </div>
    )
}

export default LoginTextInput;