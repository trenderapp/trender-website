import React from "react";
import Link from "next/link"
import { useTranslation } from "../../../Context/Localization";

function Menu(){

    const { t } = useTranslation();
    return (
        <div className="menu">
            <div className="menu-top">
                <h3>{t("settings")}</h3>
                <div className="link">
                    <Link href="/settings/themes" passHref>{t("lang_and_theme")}</Link>
                    <Link href="/settings/block" passHref>{t("blocked")}</Link>
                    <Link href="/settings/connexions" passHref>{t("connexions")}</Link>
                    <Link href="/settings/security" passHref>{t("security")}</Link>
                    <Link href="/settings/keyboard" passHref>{t("shortcuts")}</Link>
                    <Link href="/settings/patchnote" passHref>{t("patchnote")}</Link>
                </div>
            </div>
        </div>
    )
}

export default Menu;