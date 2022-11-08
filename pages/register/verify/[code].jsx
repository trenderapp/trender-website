import React from "react"
import { useRouter } from "next/router";
import { apibaseurl } from "../../../Services/constante";
import RegisterVerifyHome from "../../../Views/LoginPages/Register/CheckCode";

function RegisterVerify(props) {
    
    const history = useRouter();

    setTimeout(() => {
        history.push(props?.data?.success ? "/login" : "/register")
    }, 15000)

    return (
        <RegisterVerifyHome response={props} />
    )
}

export const getServerSideProps = async ({ query }) => {

    const { code } = query;
    
    const request = await fetch(`${apibaseurl}/users/me/verify/email?code=${code}`, { method: "POST" });
    const response = await request.json();

    return {
        props: response
    }
}

export default RegisterVerify;