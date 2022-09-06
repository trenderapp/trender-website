import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

import styles from "../../Style/All.module.scss";

function FixedMenu({ children, oustideClick, width = 400, text_left = false }){
    return (
        <div className={`fixed-menu ${styles.fixed} ${styles.row} ${styles.justify_center} ${styles.blur_background}`} style={{
            zIndex: 999,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }}>   
            <OutsideClickHandler onOutsideClick={() => oustideClick(false)} >
                <div style={{
                    gap: "10px",
                    width: `${width}px`,
                    maxWidth: `100vw`
                }} className={`${styles.shadow} ${styles.column} ${styles.radius_8} ${styles.second_background} ${styles.padding_15} ${text_left ?? styles.align_center}`}>
                    { children }
                </div>  
            </OutsideClickHandler>
        </div>
    )
}

export default FixedMenu;