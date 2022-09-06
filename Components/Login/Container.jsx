import React from "react";
import loginStyles from "./Login.module.scss"
import globalStyles from "../../Style/Main.module.scss";
import Seo from "../../Views/Seo";

function LoginContainer({ children, title, error, seo_description, seo_title }) {
    
    return (
        <div className={loginStyles.login_style}>
            <Seo description={seo_description} title={seo_title} />
            <div className={loginStyles.login_page}>
                <div className={loginStyles.form}>
                    <form method="POST">
                        <h2 className={loginStyles.title}>{title}</h2>
                        <div className={globalStyles._error}>{error}</div>
                        { children }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginContainer;