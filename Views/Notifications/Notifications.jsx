import React, { useState } from "react";
import FixedMenu from "../../Components/Others/FixedMenu";
import styles from "../../Style/All.module.scss";
import NotificationsAll from "./All/All";
import NotificationsFollows from "./Follows/Follows";
import Svg from "../../Components/Svg/Svg";
import { useTranslation } from "../../Context/Localization";
import { useClient } from "../../Context";

function Notifications({ setPreview }) {
    const [section, setSection] = useState("all");
    const { t } = useTranslation()
    const { token } = useClient();

    return (
        <div className="notifications">
            <FixedMenu width={800} oustideClick={() => setPreview()}>
                <div className={`${styles.row} ${styles.align_center} ${styles.space_between} ${styles.fixed_menu_title}`}>
                    <div className={`${styles.row} ${styles.align_center} ${styles.space_between}`}>
                        <Svg className={styles.pointer} name="circle-close" size={24} onClick={() => setPreview()} />
                        <h2>{t("notifications")}</h2>
                    </div>
                </div>
                <div>
                    <button className="section-button" onClick={() => setSection("all")}>Tous</button>
                    <button className="section-button" onClick={() => setSection("follow")}>Abonnement</button>
                </div>
                { token && section === "all" ? <NotificationsAll /> : <NotificationsFollows  /> }
            </FixedMenu>
        </div>
    )
}

export default Notifications;