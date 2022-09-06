import Image from "next/image";
import React from "react";

function UserBadges({ url }) {
    return <Image width={20} height={20} src={url} alt="Trender Badges" />
}

export default UserBadges;