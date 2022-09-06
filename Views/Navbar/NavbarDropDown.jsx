import React from "react";
import { useRouter } from "next/router";

import styles from "../../Style/All.module.scss";
import DropDown from "../../Components/Others/Dropdown";
import CreateLink from "../../Components/Text/Link";
import Svg from "../../Components/Svg/Svg";
import { useTranslation } from "../../Context/Localization";

function NavbarDropDown({ user, setUser }) {

    const profilePath = user ? `/${user.nickname}` : "trender";
    const history = useRouter();
    const { t } = useTranslation();

    const disconnect = () => {

        if (typeof window !== "undefined") {
            localStorage.removeItem("user_info");
            setUser(null)
            setTimeout(() => {
                history.push("/login")
            }, 500);
        }
    }

    const paths = [
        {
            link: profilePath,
            component: <span className={`${styles.row}`}><Svg size={22} name="profile" /> {t("profile")}</span>,
            click: undefined
        },
        {
            link: "/settings",
            component: <span className={`${styles.row}`}><Svg size={22} name="settings" /> {t("settings")}</span>,
            click: undefined
        },
        {
            link: "/",
            component: <span className={`${styles.row}`}><Svg size={22} name="disconnect" /> {t("disconnect")}</span>,
            click: () => disconnect()
        }
    ]
    return (
        <DropDown>
            {
                paths.map((p, index) => 
                    <CreateLink className={`${styles.full_width}`} onClick={p.click} key={index} href={p.link} text={p.component} />
                )
            }
        </DropDown>
    )
}

export default NavbarDropDown;