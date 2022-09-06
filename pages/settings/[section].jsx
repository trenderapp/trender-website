import React, { useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../../Context/AppContext";
import SettingsSections from "../../Views/Settings";


function Settings({ section }) {

    const { user } = useContext(UserContext);
    
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