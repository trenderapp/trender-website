import React, { useContext, useEffect } from "react";
import { RoundedIcon } from "../../../Components/Assets";
import { useTranslation } from "../../../Context/Localization";
import { languageList } from "../../../Context/Localization/languages";
import { ThemeContext } from "../../../Context/ThemeContext";
import { cdnbaseurl } from "../../../Services/constante";
import styles from "../../../Style/All.module.scss"

function Themes() {

    const { t, setLanguage } = useTranslation();
    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        localStorage.setItem("theme", theme);

    }, [theme])

    return (
        <>
        <div className="content">
            <h3>{t("theme")}</h3>
            <div className="list">
                <div className="theme-container">
                    <button onClick={() => setTheme("theme-dark-blue")} className={`${theme === "theme-dark-blue" ? "selected" : ""}`} >{t("dark_blue")}</button>
                </div>
                <div className="theme-container">
                    <button onClick={() => setTheme("theme-white")} className={`${theme === "theme-white" ? "selected" : ""}`} >{t("white")}</button>
                </div>
                <div className="theme-container">
                    <button onClick={() => setTheme("theme-dark")} className={`${theme === "theme-dark" ? "selected" : ""}`} >{t("dark")}</button>
                </div>
            </div>
        </div>
        <div className="content">
            <h3>{t("language")}</h3>
            <div className="list">
                {
                    languageList.map((l, index) =>
                        <div key={index} className={`theme-container`}>
                            <button onClick={() => setLanguage(l)}>
                                <span className={`${styles.row} ${styles.justify_start} ${styles.full_width} ${styles.pointer} ${styles.hover}`}>
                                    <RoundedIcon size={22} src={`${cdnbaseurl}/assets/icons/flags/${l.locale}.png`} />
                                    {l.language}
                                </span>    
                            </button>
                        </div>

                    )
                }
            </div>
        </div>
    </>
    )
}

export default Themes;