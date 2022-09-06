import React from "react";
import styles from "../../Style/All.module.scss";

function LoginBottomLinks({ children }) {
    return (
        <div className={`${styles.row} ${styles.space_between}`}>
            { children }
        </div>
    )
}

export default LoginBottomLinks;