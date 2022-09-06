import React, { useState } from "react";
import { useRouter } from "next/router"
import LoginButton from "../../../Components/Login/Buttton";
import LoginContainer from "../../../Components/Login/Container";
import LoginTextInput from "../../../Components/Login/TextInput";
import { apibaseurl } from "../../../Services/constante";
import { email_regex } from "../../../Services/regex";
import { useTranslation } from "../../../Context/Localization";

function RecoveryPasswordHome() {

    const [email, setEmail] = useState("");
    const [response, setResponse] = useState({
        is_error: false,
        content: ""
    });

    const history = useRouter();
    const { t } = useTranslation();

    const sendCode = async (e) => {

        e.preventDefault();
        
        if(!email_regex.test(email)) return setResponse({ is_error: true, content: t(`verify_fields`) });
        
        const request = await fetch(`${apibaseurl}/users/me/recovery?type=password&query=${email}`, { method: "POST" });
        const response = await request.json();

        if(!response?.data?.code) return setResponse({ is_error: true, content: t(`${response.error.code}`)})
        
        history.push(`/register/next?email=${email}`, `/password/verification?email=${email}`, {
            shallow: true
        })
    }

    return (
        <LoginContainer error={response.is_error && response.content} title="Recover your password">
            <LoginTextInput label="Email">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
            </LoginTextInput>
            <LoginButton onClick={sendCode}>
                Send recovery link
            </LoginButton>
        </LoginContainer>
    )
}

export default RecoveryPasswordHome;