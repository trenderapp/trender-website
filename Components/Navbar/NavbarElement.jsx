import React from "react";
import styles from "../../Style/All.module.scss";

function NavbarElement({ children }) {

    return (
        <header className={`${styles.row} ${styles.space_between} ${styles.wrap}`}>
            { children }
        </header>
    )
}

export default NavbarElement;