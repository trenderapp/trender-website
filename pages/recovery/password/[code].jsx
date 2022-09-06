import React from "react";
import NewPasswordHome from "../../../Views/LoginPages/Recovery/NewPassword";

function RecoverPasswordCode(props) {

    return (
        <NewPasswordHome code={props.code} />
    )
}

export const getServerSideProps = async ({ query }) => {

    return {
        props: {
            code: query.code
        }
    }
}

export default RecoverPasswordCode;