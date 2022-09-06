import React from "react";
import inputStyles from "./Input.module.scss";

function TextInput({ children, label }) {
    return (
        <div className={inputStyles.input}>
            <label>{label} :</label>
            { children }
        </div>
    )
}

export default TextInput;