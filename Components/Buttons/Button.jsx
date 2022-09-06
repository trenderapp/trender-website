import React from "react";
import ButtonStyle from "./Button.module.scss";

function Button({ label, onClick, disabled }) {
    return (
        <button onClick={disabled ? null : onClick} className={`${ButtonStyle.simple} ${disabled && ButtonStyle.disabled}`}>
            { label }
        </button>
    )
}

export default Button;