import React, { useState } from "react";
import FixedMenu from "../../Components/Others/FixedMenu";
import styles from "../../Style/All.module.scss";
import NotificationsAll from "./All/All";
import NotificationsFollows from "./Follows/Follows";
import Svg from "../../Components/Svg/Svg";
import { user_token } from "../../Services/client";
import { useTranslation } from "../../Context/Localization";

function Notifications({ setPreview }) {
    const [section, setSection] = useState("all");
    const { t } = useTranslation()

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
                { user_token && section === "all" ? <NotificationsAll /> : <NotificationsFollows  /> }
            </FixedMenu>
        </div>
    )
}

export default Notifications;