import React from "react";
import styles from "../../Style/All.module.scss";

function NavbarDiv({ children }) {
    return (
        <div className={styles.row}>
            { children }
        </div>
    )
}

export default NavbarDiv;