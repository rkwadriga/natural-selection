import React from "react";
import {Alert as AlertBlock} from "react-bootstrap";
import {Alert} from "../App";

interface Props {
    infoAlerts: Alert[];
    errorAlerts: Alert[];
    removeInfoAlert: (index: number) => void;
    removeErrorAlert: (index: number) => void;
}

const Header: React.FC<Props> = ({ infoAlerts, errorAlerts, removeInfoAlert, removeErrorAlert}) => {
    return (
        <div className="Header">
            { /* Info Alerts */ }
            { infoAlerts.map((alert: Alert, index: number) => {
                return (
                    <AlertBlock
                        key={alert.variant + index}
                        variant={alert.variant}
                        onClose={() => removeInfoAlert(index)}
                        dismissible
                    >
                        {(index  + 1) + ') '} {alert.data}
                    </AlertBlock>
                );
            }) }

            {/* Error Alerts */}
            { errorAlerts.map((alert: Alert, index: number) => {
                return (
                    <AlertBlock
                        key={alert.variant + index}
                        variant={alert.variant}
                        onClose={() => removeErrorAlert(index)}
                        dismissible
                    >
                        {(index  + 1) + ') '} {alert.data}
                    </AlertBlock>
                );
            }) }
        </div>
    );
}
export default Header;