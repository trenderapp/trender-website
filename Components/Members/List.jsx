import React from "react";
import MemberDescriptions from "./DisplayDescriptions";
import styles from "../../Style/All.module.scss";
import Loader from "../Others/Loader";

function MemberList({ list, description, full_width, loader }) {

    return (
        <div style={{
            width: "100%"
        }} className={styles.column}>
            {
                list.map((user, index) => 
                    user && <MemberDescriptions full_width={full_width} description={description} key={index} user={user} />
                )
            }
            {
                loader && list.length > 25 && <Loader />
            }
        </div>
    )
}

export default MemberList;