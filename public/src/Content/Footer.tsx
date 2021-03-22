import React from "react";
import {Alert as AlertBlock} from "react-bootstrap";
import Alert from "./AlertInterface";

interface Props {
    logAlerts: Alert[];
    removeLogAlert: (index: number) => void;
}

const Footer: React.FC<Props> = ({logAlerts, removeLogAlert}) => {
    return (
        <div className="Content-Footer">
            {/* Log Alerts */}
            { logAlerts.map((alert: Alert, index: number) => {
                return (
                    <AlertBlock
                        key={alert.variant + index}
                        className="log-alert"
                        variant={alert.variant}
                        onClose={() => removeLogAlert(index)}
                        dismissible
                    >
                        { alert.text }
                    </AlertBlock>
                );
            }) }
        </div>
    );
}
export default Footer;