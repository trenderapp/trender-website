import React from "react";
import styles from "../../Style/All.module.scss";
import CreateLink from "../Text/Link";

function NavbarLink({ text, href, className }) {

    return (
        <CreateLink href={href} className={`${styles.uppercase} ${className}`}>
            { text }
        </CreateLink>
        
    )
}

export default NavbarLink;