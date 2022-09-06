import React from "react";
import styles from "./Progress.module.scss";

function ProgressBar({ progress = 0}) {

    return (
        <div className={styles.progress_container}>
            <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>
    )
}

export default ProgressBar;