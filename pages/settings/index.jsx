import React from "react";
import { useClient } from "../../Context";

import SettingsSections from "../../Views/Settings";

function Settings() {

    const { user } = useClient();

    return (
        <SettingsSections user={user} />
    );
}

export default Settings;