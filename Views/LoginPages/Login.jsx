import React, { useState, useContext, useRef } from "react";
import { useRouter } from "next/router"
import { detect } from "detect-browser";

import { apibaseurl } from "../../Services/constante";
import { UserContext } from "../../Context/AppContext";

import CreateLink from "../../Components/Text/Link";
import Svg from "../../Components/Svg/Svg";
import LoginTextInput from "../../Components/Login/TextInput";
import LoginContainer from "../../Components/Login/Container";
import LoginButton from "../../Components/Login/Buttton";
import LoginBottomLinks from "../../Components/Login/BottomLinks";
import CaptchaBlock from "../../Components/Security/CaptchaBlock";
import Client from "trender-client";
import { useTranslation } from "../../Context/Localization";

function LoginHome() {

    const router = useRouter();
    const { t } = useTranslation();

    const { setUser } = useContext(UserContext);
    const [users, setUsers] = useState({ 
        email: '',
        password: ''
    });

    const [captcha, setCaptcha] = useState(null);
    const captchaRef = useRef();
    const [response, setResponse] = useState({
        is_error: false,
        content: ""
    });
    const [showPass, setShowPass] = useState(false);
    const [waiting, setWaiting] = useState(false);

    const changePassShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
      }

    const handleSubmit = async e => {
        e.preventDefault();

        if(!captcha) return setResponse({ is_error: true, content: t(`human_verif`) })
 
        if(!users.email || !users.password) return setResponse({ is_error: true, content: t(`verify_fields`) })

        if(typeof navigator !== "undefined" && typeof window !== "undefined") {
            const browser = detect();
            
            let friendly_name;
            if (browser) {
                let { name } = browser;
                const { os } = browser;
                let isiPad;
                if (window.isNative) {
                    friendly_name = `Trender Desktop on ${os}`;
                } else {
                    if (name === "ios") {
                        name = "safari";
                    } else if (name === "fxios") {
                        name = "firefox";
                    } else if (name === "crios") {
                        name = "chrome";
                    }
                    if (os === "Mac OS" && navigator.maxTouchPoints > 0)
                        isiPad = true;
                    friendly_name = `${name} on ${isiPad ? "iPadOS" : os}`;
                }
            } else {
                friendly_name = "Unknown Device";
            }

            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    email: users.email.toLowerCase(),
                    password: users.password,
                    device_name: friendly_name,
                    code: captcha
                })
            };
    
            setWaiting(true);
    
            const request = await fetch(`${apibaseurl}/login`, requestOptions);
            const response = await request.json();
            
            setWaiting(false)
            
            captchaRef.current.resetCaptcha();
    
            if(response.error){
                return setResponse({ is_error: true, content: t(`${response.error.code}`) })
    
            } else {
    
                localStorage.setItem("user_info", JSON.stringify(response));
                
                const client = new Client(response.token)
                const informations = await client.informations();
                
                setUser(informations.data);
    
                router.replace("/home")
            }
        }
    };

    const onChange = (e) => {
        e.persist();
        setUsers({ ...users, [e.target.name]: e.target.value });
    }

    return (
        <LoginContainer error={response.is_error && response.content} title={t("already_account")} seo_title="Login" seo_description="Login to Trender">
            <LoginTextInput label={t("email")}>
                <input type="email" name="email" autoComplete="email" value={users.email.toLowerCase()} onChange={onChange} id="email" />
            </LoginTextInput>
            <LoginTextInput label={t("password")} svg={showPass ? <Svg name="eye" size={20} onClick={changePassShow} /> : <Svg name="eye-close" size={20} onClick={changePassShow} />}>
                <input type={!showPass && "password"} name="password" autoComplete="current-password" value={users.password} onChange={onChange} id="password" />
                <CreateLink href='/recovery/password' children={t("forgot_password")} />
            </LoginTextInput>
            <CaptchaBlock reference={captchaRef} onSuccess={(t) => setCaptcha(t)} />
            <LoginButton onClick={handleSubmit}>
                { t("connect") }
            </LoginButton>
            <LoginBottomLinks>    
                <CreateLink href='/register' text={`${t("no_account")}`} />
            </LoginBottomLinks>
        </LoginContainer>
    )
}

export default LoginHome