import React from "react";
import { useRouter } from "next/router";
import LoginContainer from "../../../Components/Login/Container";
import { useTranslation } from "../../../Context/Localization";

function RegisterNextHome() {
    
    const { t } = useTranslation();
    
    const { query } = useRouter();

    return (
        <LoginContainer title={t("email_verif_link_send", {
            email: query.email
        })} />
    )
}

export default RegisterNextHome;