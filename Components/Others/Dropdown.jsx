import React from "react";
import styles from "../../Style/All.module.scss";

function DropDown({ children, margin = -135, top = 20, nofixe }) {
    return (
        <div style={{
            gap: "15px",
            padding: "10px",
            marginTop: `${top}px`,
            marginLeft: `${margin}px`,
            borderRadius: "8px",
            alignItems: "flex-start",
            zIndex: 8
        }} className={`${nofixe ?? styles.fixed} ${styles.column} ${styles.second_background}`}>
            { children }
        </div>
    )
}

export default DropDown;