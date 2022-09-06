import React from "react";
import { useTranslation } from "../../../Context/Localization";

function Security() {
    
    const { t } = useTranslation();
    
    return (
        <div id="connexions">
            <h3>{t("security")}</h3>
            <div className="user-connexions">
                <div>
                </div>
            </div>
        </div>
    )
}

export default Security;