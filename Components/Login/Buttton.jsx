import React from "react";
import loginStyles from "./Login.module.scss"

function LoginButton({ children, onClick }) {
    return (
        <button className={loginStyles.login_button} type="submit" onClick={onClick} >{children}</button>
    )
}

export default LoginButton;