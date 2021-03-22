import React from 'react';
import {Alert} from "react-bootstrap";

class Header extends React.Component {
    render() {
        return (
            <div className="Content-Header">
                { /* Info Alerts */ }
                { this.props.infoAlerts.map((alert, index) => {
                    return (
                        <Alert
                            key={alert.variant + index}
                            variant={alert.variant}
                            onClose={() => this.props.removeInfoAlert(index)}
                            dismissible
                        >
                            { (index  + 1) + ') ' + alert.data }
                        </Alert>
                    );
                }) }

                {/* Error Alerts */}
                { this.props.errorAlerts.map((alert, index) => {
                    return (
                        <Alert
                            key={alert.variant + index}
                            variant={alert.variant}
                            onClose={() => this.props.removeErrorAlert(index)}
                            dismissible
                        >
                            { (index  + 1) + ') ' + alert.data }
                        </Alert>
                    );
                }) }
            </div>
        )
    }
}
export default Header;