import React from "react";
import { useClient } from "../../Context";

import SettingsSections from "../../Views/Settings";


function Settings({ section }) {

    const { user } = useClient();
    
    return (
        <SettingsSections user={user} section={section} />
    );
}

export const getServerSideProps = async ({ query }) => {
  
    return {
      props: {
        section: query.section
      }
    }
}

export default Settings;