import React from "react";
import CreateLink from "../../Components/Text/Link";
import MemberInformations from "../../Components/Members/Informations";

function DisplayMember({ user }) {
    return (
        <CreateLink href={`/${user.nickname}`}>
            <MemberInformations full_width info={user} />
        </CreateLink>
    )
}

export default DisplayMember;