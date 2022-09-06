import React, { useContext } from "react";

import { UserContext } from "../../Context/AppContext";
import MessagesHome from "../../Views/Messages";

function Messages() {
    const user = useContext(UserContext)

    return (
        <MessagesHome user={user} />
    );
}

export default Messages;