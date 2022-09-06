import React from "react";
import Avatar from "../Members/Avatar";
import profileStyles from "../../Style/Profile.module.scss"
import styles from "../../Style/All.module.scss"
import Banner from "../Members/Banner";
import Text from "../Text/Text";
import { useTranslation } from "../../Context/Localization";

function ErrorUser({ nickname, code }) {

    const { t } = useTranslation()

    return (
        <div className={profileStyles.profile_section}>
            <div className={`${styles.full_width} ${styles.column} ${styles.space_between}`}>
                <Banner />
            </div>
            <div className={profileStyles.profile_informations}>
                <div className={profileStyles.top}>
                    <Avatar error border size={85} />
                </div>
                <div className={profileStyles.middle}>
                    <span className={`${profileStyles.nickname} ${styles.row} ${styles.align_center} ${styles.gap_5}`}>
                        @{nickname}
                    </span>
                </div>
                <div className={profileStyles.description}>
                    <Text text={t(`${code}`)} />
                </div>
                <div className={profileStyles.bottom}>
                </div>
            </div>
        </div>
    )
}

export default ErrorUser;