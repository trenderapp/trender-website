import React from "react";
import Icon from "../../Components/Assets/RoundedIcon";
import { cdnbaseurl } from "../../Services/constante";
import styles from "../../Style/All.module.scss";

function SplashScreen() {
    return (
        <div style={{
            zIndex: 9999,
            height: "100vh",
            width: "100vw"
        }} className={`${styles.row} ${styles.align_center} ${styles.space_evenly} ${styles.fixed} ${styles.background}`}>
            <Icon size={255} src={`${cdnbaseurl}/assets/icons/circles/trender_255.png`} />
        </div>
    )
}

export default SplashScreen;