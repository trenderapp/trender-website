import React, { useEffect, useState } from "react";

function CircleProgress({ percent = 0, number }) {

    const [circumference] = useState(14 * 2 * Math.PI);
    const [progress, setProgress] = useState(circumference)

    useEffect(() => {
        percent <= 100 && setProgress(circumference - percent / 100 * circumference)
    }, [percent])

    return (
        <div style={{
            width: 30,
            height: 30
        }}>
            <svg height="100%" viewBox="0 0 30 30" width="100%" style={{
                overflow: "visible"
            }}>
                <defs>
                    <linearGradient id="gradient" x1="10%" y1="100%" x2="50%" y2="10%">
                        <stop offset="0%" stopColor="var(--color-green)"/>
                        <stop offset="75%" stopColor="var(--color-yellow)"/>
                        <stop offset="100%" stopColor="var(--color-red)"/>
                    </linearGradient>
                </defs>
                <circle cx="50%" cy="50%" fill="none" strokeWidth="2" r="14" stroke="#2F3336"></circle>
                <circle id="circle" cx="50%" cy="50%" fill="none" strokeWidth="2" r="14" stroke={`${percent >= 100 ? "var(--color-red)" : "url(#gradient)"}`} strokeLinecap="round" style={{
                    transition: `0.35s stroke-dashoffset`,
                    transform: `rotate(-90deg)`,
                    transformOrigin: `50% 50%`,
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: `${progress}`
                }} ></circle>
                { number && <text fill="var(--text-normal)" fontSize={number < 10 ? 14 : 12} x={number < 10 ? 11 : number >= 10 && number < 100 ? 8 : 5 } y="20">{parseInt(number)}</text> }
            </svg>
        </div>
    )
}

export default CircleProgress;