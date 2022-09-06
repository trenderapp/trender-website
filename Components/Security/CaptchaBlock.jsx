import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { captchasiteKey } from "../../Services/constante";
import LoginTextInput from "../Login/TextInput";

function CaptchaBlock({ onSuccess, reference }) {

    return (
        <LoginTextInput>
            <HCaptcha ref={reference} reCaptchaCompat sitekey={captchasiteKey} onVerify={(token) => onSuccess(token)} />
        </LoginTextInput>
    )
}

export default CaptchaBlock;