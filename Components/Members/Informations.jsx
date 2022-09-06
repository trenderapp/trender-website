import React from "react";
import { displayDate, formatDate } from "../../Services/date";
import UserFlags from "../../Services/Permissions/Flags";
import UserPermissions from "../../Services/Permissions/UserPermissions";

import styles from "../../Style/All.module.scss";
import Svg from "../Svg/Svg";
import Avatar from "./Avatar";

function MemberInformations({ info, chat, avatar, full_width, date }) {

    const username = info?.username ? info.username.substring(0, full_width ? 150 : 15) : "";
    const full_username = username.length >= 15 && !full_width ? username+"..." : username;
    const userFlags = new UserPermissions(info.flags);
    
    // onMouseOverCapture={() => console.log("abort")}
    return (
        <div style={{
            width: "100%"
        }} className={`${styles.row} ${styles.initial} ${styles.space_between}`}>
            <div className={`${styles.row} ${styles.full_width}`}>
                { avatar ?? <Avatar className={styles.full_width} size={48} user_id={info.user_id} avatar={info.avatar} /> }
                <div style={{
                    marginLeft: "5px"
                }} className={`${styles.column} ${styles.full_width}`} >
                    <div className={`${styles.row}`}>
                        <span style={{ maxWidth: full_width ? "100%" : "75%" }} className={`${styles.ellipsis}`}>{full_username}</span>
                        { info?.is_private && <Svg name="lock" size={18} /> }
                        { userFlags.has(UserFlags.VERIFIED_USER) && <Svg name="verified" size={18} /> }
                        { date && <span title={formatDate(date)}>{displayDate(date)}</span> }
                    </div>
                    <div>    
                        { chat ?? <span className={`${styles.nickname} ${styles.ellipsis}`}>@{info.nickname}</span> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberInformations;