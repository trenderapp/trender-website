import React, { useContext } from "react";

import { UserContext } from "../../Context/AppContext";
import SettingsSections from "../../Views/Settings";

function Settings() {

    const { user } = useContext(UserContext);

    return (
        <SettingsSections user={user} />
    );
}

export default Settings;