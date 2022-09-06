import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../Others/Loader";

function NotConnected() {

    const router = useRouter();

    useEffect(() => {
        router.push("/login")
    }, [])

    return <Loader />
}

export default NotConnected;