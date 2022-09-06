import React, { useState } from "react";
import { useRouter } from "next/router"

import LoginContainer from "../../../Components/Login/Container";
import LoginButton from "../../../Components/Login/Buttton";
import LoginTextInput from "../../../Components/Login/TextInput";
import Svg from "../../../Components/Svg/Svg";
import { apibaseurl } from "../../../Services/constante";
import { useTranslation } from "../../../Context/Localization";

function NewPasswordHome({ code }) {

    const [showPass, setShowPass] = useState(false);
    const [response, setResponse] = useState({
        is_error: false,
        content: ""
    });
    const [users, setUsers] = useState({
        password: "",
        password2: ""
    });
    const [waiting, setWaiting] = useState(false);

    const history = useRouter();
    const { t } = useTranslation();

    const changePassShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
    }

    const sendCode = async (e) => {

        e.preventDefault();

        if(waiting) return setResponse({ is_error: true, content: t(`sending_form`) });

        if(users.password !== users.password2) return setResponse({ is_error: true, content: t(`different_password`) });
        if(users.password.length < 8) return setResponse({ is_error: true, content: t(`password_security`) });

        setWaiting(true);

        const request = await fetch(`${apibaseurl}/users/me/recovery/verify`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                code: code,
                password: users.password,
                password2: users.password2
            }),
        });
        const response = await request.json();

        setWaiting(false);

        if(!response?.data?.success) return setResponse({ is_error: true, content: t(`${response.error.code}`)})
        
        history.push(response?.data?.success && "/login")
    }

    const onChange = (e) => {
        e.persist();
        setUsers({ ...users, [e.target.name]: e.target.value }); 
    };

    return (
        <LoginContainer error={response.is_error && response.content} title="Set your new password">
            <LoginTextInput label="New password" svg={showPass ? <Svg name="eye" size={20} onClick={changePassShow} /> : <Svg name="eye-close" size={20} onClick={changePassShow} />}>
                <input required type={!showPass && `password`} name="password" autoComplete="current-password" value={users.password} onChange={onChange} id="password" />
            </LoginTextInput>
            <LoginTextInput label="Repeat the password">      
                <input required type={!showPass && `password`} name="password2" autoComplete="new-password" value={users.password2} onChange={onChange} id="password2" />
            </LoginTextInput>
            <LoginButton onClick={sendCode}>
                Change the password
            </LoginButton>
        </LoginContainer>
    )
}

export default NewPasswordHome;