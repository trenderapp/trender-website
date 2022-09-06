import React, { lazy, Suspense } from "react";
const Renderer = lazy(() => import("./Renderer"));

export default function Markdown({ content, disallowBigEmoji }) {
    return (
        <Suspense fallback={content}>
            <Renderer content={content} disallowBigEmoji={disallowBigEmoji} />
        </Suspense>
    );
}
