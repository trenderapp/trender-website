import React from "react";

function AlertCross({ setAlert }) {
    return (
        <div className="notyf__dismiss">
            <button className="notyf__dismiss-btn" onClick={() => setAlert({ display: false })} />
        </div>
    )
}

export default AlertCross;