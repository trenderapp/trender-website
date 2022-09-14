import React, { lazy, Suspense } from "react";
const Renderer = lazy(() => import("./Renderer"));

export default function Markdown({ content, disallowBigEmoji, info }) {
    return (
        <Suspense fallback={content}>
            <Renderer info={info} content={content} disallowBigEmoji={disallowBigEmoji} />
        </Suspense>
    );
}
