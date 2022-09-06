import React, { useRef, useState } from "react";
import { useRouter } from "next/router"
import dayjs from "dayjs";

import CreateLink from "../../Components/Text/Link";
import { apibaseurl } from "../../Services/constante";
import Svg from "../../Components/Svg/Svg";
import { email_regex } from "../../Services/regex";
import LoginContainer from "../../Components/Login/Container";
import LoginTextInput from "../../Components/Login/TextInput";
import LoginButton from "../../Components/Login/Buttton";
import LoginBottomLinks from "../../Components/Login/BottomLinks";
import CaptchaBlock from "../../Components/Security/CaptchaBlock";
import { useTranslation } from "../../Context/Localization";

function RegisterHome() {

    const history = useRouter();
    const { t } = useTranslation();

    const [users, setUsers] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
        birthday: "",
      });
      const [waiting, setWaiting] = useState(false);
      
      const [showPass, setShowPass] = useState(false);
      const [captcha, setCaptcha] = useState(null);
      const captchaRef = useRef();
      const [response, setResponse] = useState({
        is_error: false,
        content: ""
      });
    
      const changePassShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
      }
    
      const max_birthday = dayjs().subtract(13, "years").format("YYYY-MM-DD");
      const min_birthday = dayjs().subtract(120, "years").format("YYYY-MM-DD");
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const birthday = dayjs(users.birthday).format();

        if(!users.email || !users.username || !users.password || !users.birthday) return setResponse({ is_error: true, content: t(`verify_fields`) });

        if(waiting) return setResponse({ is_error: true, content: t(`sending_form`) });
    
        if(!email_regex.test(users.email) || users.username.length > 30 || users.username.length < 3 ) return setResponse({ is_error: true, content: t(`verify_fields`) });

        if (users.password !== users.password2) return setResponse({ is_error: true, content: t(`different_password`) });
        if(users.password.length < 8) return setResponse({ is_error: true, content: t(`password_security`) });

        if (!dayjs(birthday).isBefore(max_birthday) || !dayjs(birthday).isAfter(min_birthday)) return setResponse({ is_error: true, content: t(`4`) });
    
        if(!captcha) return setResponse({ is_error: true, content: t(`human_verif`) })
    
        const requestOptions = {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            code: captcha,
            email: users.email.toLowerCase(),
            username: users.username,
            password: users.password,
            password2: users.password2,
            birthday: birthday
          }),
        };
    
        setWaiting(true);
        
        const request = await fetch(`${apibaseurl}/register`, requestOptions);
        const response = await request.json();

        setWaiting(false)

        captchaRef.current.resetCaptcha();

        if(request.status !== 201) {
          setResponse({ is_error: true, content: t(`${response.error.code}`) })

        } else {
          history.push(`/register/next?email=${users.email}`, `/register/verification?email=${users.email}`, {
            shallow: true
          })
        }
      }
    
      const onChange = (e) => {
        e.persist();
        setUsers({ ...users, [e.target.name]: e.target.value }); 
      };

    return (
      <LoginContainer error={response.is_error && response.content} title={t("no_account")} seo_description="Register to Trender" seo_title="Register">
        <LoginTextInput label={t("email")}>
          <input required type="email" name="email" autoComplete="email" value={users.email.toLowerCase()} onChange={onChange} id="email" />
        </LoginTextInput>
        <LoginTextInput label={t("username")}>
          <input required type="text" name="username" autoComplete="nickname" value={users.nickname} onChange={onChange} id="username" />
        </LoginTextInput>
        <LoginTextInput label={t("password")} svg={showPass ? <Svg name="eye" size={20} onClick={changePassShow} /> : <Svg name="eye-close" size={20} onClick={changePassShow} />}>
          <input required type={!showPass && `password`} name="password" autoComplete="current-password" value={users.password} onChange={onChange} id="password" />
        </LoginTextInput>
        <LoginTextInput label={t("repeat_password")}>
          <input required type={!showPass && `password`} name="password2" autoComplete="new-password" value={users.password2} onChange={onChange} id="password2" />
        </LoginTextInput>
        <LoginTextInput label={t("birthday")}>
          <input required type="date" name="birthday" autoComplete="birthday" value={users.birthday} onChange={onChange} id="birthday" min={min_birthday} max={max_birthday} />
        </LoginTextInput>
        <CaptchaBlock reference={captchaRef} onSuccess={(t) => setCaptcha(t)} />
        <LoginButton onClick={handleSubmit}>
          { t("register") }
        </LoginButton>
        <LoginBottomLinks>
          <CreateLink  href="/login" text={`${t("already_account")}`} />
          <CreateLink underline href="https://cdn.trenderapp.com/assets/legal/T&S.pdf" text={`${t("t_and_s")}`}/>
        </LoginBottomLinks>
      </LoginContainer>
    )
}

export default RegisterHome;