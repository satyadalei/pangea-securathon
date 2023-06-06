import React, { useContext, useEffect } from 'react'
import alertContext from '../context/alert/alertContext';

const Alert = () => {
    const AlertContext = useContext(alertContext);
    const { alert } = AlertContext;
    useEffect(() => {
        let alertDiv = document.getElementById('alertBox');
        alertDiv.style.visibility = "visible"
        function hideMessage() {
             alertDiv.style.visibility = "hidden";
        }
        setTimeout(hideMessage, 3000);
    }, [alert])
    return (
        <div id='alertBox' style={{ position: "absolute", width: "100vw", display: "flex", justifyContent: "space-between",zIndex:"5000" }} className={`alert alert-${alert.alertType}`} role="alert">
            <p>{alert.alertMsg}</p>
        </div>
    )
}

export default Alert