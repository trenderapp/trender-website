import React from "react";
import { useClient } from "../../Context";

import MessagesHome from "../../Views/Messages";

function Messages() {
    const { user } = useClient()

    return (
        <MessagesHome user={user} />
    );
}

export default Messages;