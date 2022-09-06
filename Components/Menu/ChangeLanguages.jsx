import React, { useState } from "react";
import { languageList } from "../../Context/Localization/languages";
import FixedMenu from "./FixedMenu";
import styles from "../../Style/All.module.scss";
import { useTranslation } from "../../Context/Localization";
import { Svg } from "../Svg";
import { RoundedIcon } from "../Assets";
import { cdnbaseurl } from "../../Services/constante";

function ChangeLanguages({ size, displayText }) {

    const { t, setLanguage } = useTranslation();
    const [display, setDisplay] = useState(false);
    return (
        <div>
            <span className={styles.row}><Svg size={size} margin={displayText ? false : true} name="globe" hover pointer onClick={() => setDisplay(true)} /> {displayText && t("language")}</span>
        {
            display && <FixedMenu oustideClick={setDisplay}>
                {
                    languageList.map((l, index) => <span 
                        onClick={() => setLanguage(l)} 
                        key={index} 
                        className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}>
                        <RoundedIcon size={22} src={`${cdnbaseurl}/assets/icons/flags/${l.locale}.png`} /> {l.language}
                        </span>
                    )
                }
                <span onClick={() => setDisplay(false)} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.pointer} ${styles.hover}`}>{t("cancel")}</span>
             </FixedMenu>
        }
        </div>
    )
}

export default ChangeLanguages;