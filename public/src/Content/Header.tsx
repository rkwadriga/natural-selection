import React from "react";
import {Alert as AlertBlock} from "react-bootstrap";
import {Alert} from "../App";
import createElement from '../Helpers/Formatter';

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
                        className='align-left'
                        onClose={() => removeInfoAlert(index)}
                        dismissible
                    >
                        {(index  + 1) + ")"} {createElement(alert.data)}
                    </AlertBlock>
                );
            }) }

            {/* Error Alerts */}
            { errorAlerts.map((alert: Alert, index: number) => {
                return (
                    <AlertBlock
                        key={alert.variant + index}
                        variant={alert.variant}
                        className='align-left'
                        onClose={() => removeErrorAlert(index)}
                        dismissible
                    >
                        {(index  + 1) + ")"} {createElement(alert.data)}
                    </AlertBlock>
                );
            }) }
        </div>
    );
}
export default Header;