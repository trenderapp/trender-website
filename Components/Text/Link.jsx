import React from "react";
import NextLink from "next/link";
import TextStyles from "./Text.module.scss";

function CreateLink({ children, text, href, className = null, onClick = undefined, locale, underline, noHover }) {
    return (
        <NextLink passHref locale={locale} href={href}>
            <a onClick={onClick} className={`${underline ? TextStyles.underline : ""} ${noHover ? TextStyles.no_hover : ""} ${className ? className : ""}`}>
                { text ?? children }
            </a>
        </NextLink>
    )
}

export default CreateLink;