import React from 'react';
import {Container} from 'react-bootstrap';
import Api from './Services/Api';
import Formatter from './Services/Formatter';
import Header from "./Content/Header";
import NotLoggedInBlock from "./Content/NotLoggedInBlock";
import Body from "./Content/Body";
import Footer from "./Content/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.config = props.config;
        this.api = new Api(this.config.api);
        this.formatter = new Formatter();
        this.api.beforeRequestHandler = this.handleBeforeRequest.bind(this);
        this.api.successHandler = this.handleSuccessResult.bind(this);
        this.api.errorHandler = this.handleErrorResult.bind(this);

        this.state = {
            infoAlerts: [],
            errorAlerts: [],
            logAlerts: [],
            isLoggedIn: false
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
        this.setState({logAlerts: alerts});
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
            this.addLogAlert(result.data, 0);
        }
    }

    handleErrorResult(result) {
        const lifetime = this.config.mode === 'dev' ? 0 : 5000;
        this.addErrorAlert(result.status + ': ' + result.error, lifetime);
    }

    componentDidMount() {
        // Do nothing
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Container>
                        <Header
                            removeInfoAlert={this.removeInfoAlert.bind(this)}
                            removeErrorAlert={this.removeErrorAlert.bind(this)}
                            infoAlerts={this.state.infoAlerts}
                            errorAlerts={this.state.errorAlerts}
                        />

                        {this.state.isLoggedIn
                            ? <Body
                                    api={this.api}
                                />
                            : <NotLoggedInBlock
                                    api={this.api}
                                />
                        }

                        <Footer
                            removeLogAlert={this.removeLogAlert.bind(this)}
                            logAlerts={this.state.logAlerts}
                            formatter={this.formatter}
                        />
                    </Container>
                </header>
            </div>
        )
    }
}
export default App;