import React from "react";
import styles from "../../Style/All.module.scss";

import MemberInformations from "./Informations";
import CreateLink from "../Text/Link";
import Text from "../Text/Text";

function MemberDescriptions({ user, description, full_width }) {
    
    return (
        <div style={{
            width: "100%"
        }} className={`${styles.padding_15} ${styles.a} ${styles.full_width} ${styles.radius_8}`}>
            <CreateLink className={`${styles.full_width}`} href={`/${user?.nickname}`}>
                <div className={`${styles.full_width}`}>
                    <MemberInformations info={user} full_width={full_width} />
                </div>
               
                    {
                        description &&  <div style={{
                            maxHeight: "66px",
                            overflow: "hidden"
                        }} className={`${styles.padding_5}`}><Text text={user?.description} /></div>
                        
                    }
            </CreateLink>
        </div>
    )
}

export default MemberDescriptions;