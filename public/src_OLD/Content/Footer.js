import React from 'react';
import {Alert} from "react-bootstrap";

class Footer extends React.Component {
    render() {
        return (
            <div className="Content-Footer">
                {/* Log Alerts */}
                { this.props.logAlerts.map((alert, index) => {
                    return (
                        <Alert
                            key={alert.variant + index}
                            className="log-alert"
                            variant={alert.variant}
                            onClose={() => this.props.removeLogAlert(index)}
                            dismissible
                        >
                            { this.props.formatter.format(alert.data) }
                        </Alert>
                    );
                }) }
            </div>
        )
    }
}
export default Footer;