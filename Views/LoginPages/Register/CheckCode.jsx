import React from "react";
import LoginContainer from "../../../Components/Login/Container";
import CreateLink from "../../../Components/Text/Link";
import { useTranslation } from "../../../Context/Localization";

function RegisterVerifyHome({ response }) {
    
    const { t } = useTranslation();

    return (
        <LoginContainer title={t(response?.data?.success ? "email_verified" : `${response?.error?.code}`)}>
            <CreateLink underline href={response?.data?.success ? "/login" : "/register"} text={`${t("redirect_secondes", {
                time: 15
            })}`}  />
        </LoginContainer>
    )
}

export default RegisterVerifyHome;