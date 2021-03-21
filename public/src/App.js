import React from 'react';
import Api from './Api';
import LoginForm from './Components/LoginForm';
import {
    Container,
    Alert,
    Row,
    Col
} from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.config = props.config;
        this.api = new Api(this.config);
        this.api.beforeRequestHandler = this.handleBeforeRequest.bind(this);
        this.api.successHandler = this.handleSuccessResult.bind(this);
        this.api.errorHandler = this.handleErrorResult.bind(this);

        this.state = {
            infoAlerts: [],
            errorAlerts: [],
            logAlerts: [],
        };
    }

    removeInfoAlert(index) {
        const alerts = this.state.infoAlerts;
        alerts.splice(index, 1);
        this.setState({infoAlerts: alerts})
    }

    removeErrorAlert(index) {
        const alerts = this.state.errorAlerts;
        alerts.splice(index, 1);
        this.setState({errorAlerts: alerts})
    }

    removeLogAlert(index) {
        const alerts = this.state.logAlerts;
        alerts.splice(index, 1);
        this.setState({logAlerts: alerts})
    }

    addInfoAlert(data, lifetime = 5000) {
        const alerts = this.state.infoAlerts;
        alerts.push({variant: "primary", data});
        this.setState({infoAlerts: alerts});
        if (lifetime > 0) {
            console.log(lifetime);
            setTimeout(() => { this.removeInfoAlert(alerts.length - 1) }, lifetime);
        }
    }

    addErrorAlert(data, lifetime = 5000) {
        const alerts = this.state.errorAlerts;
        alerts.push({variant: "danger", data});
        this.setState({errorAlerts: alerts});
        if (lifetime > 0) {
            setTimeout(() => { this.removeErrorAlert(alerts.length - 1) }, lifetime);
        }
    }

    addLogAlert(data, lifetime = 0) {
        const alerts = this.state.logAlerts;
        alerts.push({variant: "info", data});
        this.setState({logAlerts: alerts});
        if (lifetime > 0) {
            setTimeout(() => { this.removeLogAlert(alerts.length - 1) }, lifetime);
        }
    }

    handleBeforeRequest(request) {
        if (this.config.mode === 'dev') {
            this.addInfoAlert(request.method + ' ' + request.url, 0);
        }
    }

    handleSuccessResult(result) {
        if (this.config.mode === 'dev') {
            this.addLogAlert(JSON.stringify(result.data), 0);
        }
    }

    handleErrorResult(result) {
        const lifetime = this.config.mode === 'dev' ? 0 : 5000;
        this.addErrorAlert(result.status + ': ' + result.error, lifetime);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Container>
                        { /* Info Alerts */ }
                        { this.state.infoAlerts.map((alert, index) => {
                            return (
                                <Alert
                                    variant={alert.variant}
                                    onClose={() => this.removeInfoAlert(index)}
                                    dismissible
                                >
                                    { (index  + 1) + ') ' + alert.data }
                                </Alert>
                            );
                        }) }

                        {/* Error Alerts */}
                        { this.state.errorAlerts.map((alert, index) => {
                            return (
                                <Alert
                                    variant={alert.variant}
                                    onClose={() => this.removeErrorAlert(index)}
                                    dismissible
                                >
                                    { (index  + 1) + ') ' + alert.data }
                                </Alert>
                            );
                        }) }

                        <LoginForm api={ this.api } />


                        <Row>
                            {/* Log Alerts */}
                            { this.state.logAlerts.map((alert, index) => {
                                return (
                                    <Col>
                                        <Alert
                                            variant={alert.variant}
                                            onClose={() => this.removeLogAlert(index)}
                                            dismissible
                                        >
                                            { (index  + 1) + ') ' + alert.data }
                                        </Alert>
                                    </Col>
                                );
                            }) }
                        </Row>
                    </Container>
                </header>
            </div>
        )
    }
}
export default App;