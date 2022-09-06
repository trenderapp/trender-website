import React from "react";
import Navbar from "../Views/Navbar/Navbar";

function NotFoundPage() {

    return (
        <div>
            <Navbar />
            <div className="not-found">
            <h1>Page non disponible</h1>
            <section className="error-container">
                <span>4</span>
                <span><span className="screen-reader-text">0</span></span>
                <span>4</span>
            </section>
            </div>
        </div>
    )
}

export default NotFoundPage;