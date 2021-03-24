import React from "react";
import {Alert as AlertBlock} from "react-bootstrap";
import {Alert} from "../App";

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
                        { alert.data }
                    </AlertBlock>
                );
            }) }
        </div>
    );
}
export default Footer;