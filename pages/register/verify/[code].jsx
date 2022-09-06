import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { apibaseurl } from "../../../Services/constante";
import RegisterVerifyHome from "../../../Views/LoginPages/Register/CheckCode";

function RegisterVerify(props) {
    
    const history = useRouter();
    
    const [response, setResponse] = useState();

    useEffect(() => {
        
        async function getData() {
            const request = await fetch(`${apibaseurl}/users/me/verify/email?code=${props.code}`, { method: "POST" });
            const response = await request.json();

            setResponse(response)
            
            setTimeout(() => {
                history.push(props?.data?.success ? "/login" : "/register")
            }, 15000)
        }

        getData()

    }, [])

    return (
        <RegisterVerifyHome response={response} />
    )
}

export const getServerSideProps = async ({ query }) => {

    return {
        props: {
            code: query.code
        }
    }
}

export default RegisterVerify;