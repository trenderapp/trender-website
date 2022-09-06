import React from "react";
import styles from "./Progress.module.scss";

export default function Loader(){
    return (
        <div className="center">
            <div className={styles["clock-loader"]}></div>
        </div>
    )
}