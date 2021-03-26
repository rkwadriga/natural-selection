import React, {useState} from "react";
import {Container} from "react-bootstrap";
import Header from "./Content/Header";
import Footer from "./Content/Footer";
import Router from "./Content/Router";
import {useApi, ApiConfig, Request, Response} from "./Services/Api";
import ComponentException from "./Exceptions/ComponentException";
import {addElement, removeElement} from "./Helpers/ArrayHelper";

export type Alert = {
    variant: string;
    data: any;
};

interface Props {
    config: {
        api: ApiConfig;
        mode: string;
    }
}

const App: React.FC<Props> = ({config}) => {
    // Set state
    const [infoAlerts, setInfoAlerts] = useState<Alert[]>([]);
    const [errorAlerts, setErrorAlerts] = useState<Alert[]>([]);
    const [logAlerts, setLogAlerts] = useState<Alert[]>([]);

    const VARIANT_INFO = 'primary';
    const VARIANT_ERROR = 'danger';
    const VARIANT_LOG = 'info';

    // Alert functions
    const addAlert = (variant: string, data: any, lifetime: number) => {
        let removeFunction;
        switch (variant) {
            case VARIANT_INFO:
                setInfoAlerts(addElement(infoAlerts, {variant, data}));
                removeFunction = () => {removeAlert(variant, infoAlerts.length - 1)};
                break;
            case VARIANT_ERROR:
                setErrorAlerts(addElement(errorAlerts, {variant, data}));
                removeFunction = () => {removeAlert(variant, errorAlerts.length - 1)};
                break;
            case VARIANT_LOG:
                setLogAlerts(addElement(logAlerts, {variant, data}));
                removeFunction = () => {removeAlert(variant, logAlerts.length - 1)};
                break;
            default:
                throw new ComponentException('Invalid alert variant: "' + variant + '"');
        }
        if (lifetime > 0) {
            setTimeout(removeFunction, lifetime);
        }
    };
    const removeAlert = (variant: string, index: number) => {
        switch (variant) {
            case VARIANT_INFO:
                setInfoAlerts(removeElement(infoAlerts, index));
                break;
            case VARIANT_ERROR:
                setErrorAlerts(removeElement(errorAlerts, index));
                break;
            case VARIANT_LOG:
                setLogAlerts(removeElement(logAlerts, index));
                break;
            default:
                throw new ComponentException('Invalid alert variant: "' + variant + '"');
        }
    };

    const addInfoAlert = (data: any, lifetime = 5000) => { addAlert(VARIANT_INFO, data, lifetime) };
    const removeInfoAlert = (index: number) => { removeAlert(VARIANT_INFO, index); };

    const addErrorAlert = (data: any, lifetime = 5000) => { addAlert(VARIANT_ERROR, data, lifetime) };
    const removeErrorAlert = (index: number) => { removeAlert(VARIANT_ERROR, index); };

    const addLogAlert = (data: any, lifetime = 0) => { addAlert(VARIANT_LOG, data, lifetime) };
    const removeLogAlert = (index: number) => { removeAlert(VARIANT_LOG, index); };

    // Configure router
    const api = useApi();
    api.setConfig(config.api);
    api.setBeforeRequestHandler((request: Request) => {
        if (config.mode === 'dev') {
            addInfoAlert(request.method + " " + request.url + " " + JSON.stringify(request.params), 0);
        }
        return true;
    });
    api.setErrorHandler((response: Response) => {
        if (config.mode === 'dev') {
            addErrorAlert(response.status + ": " + response.error, 0);
        }
        return true;
    });
    api.setSuccessHandler((response: Response) => {
        if (config.mode === 'dev') {
            addLogAlert(response.data);
        }
        return true;
    });

    return (
        <div className="App">
            <header className="App-header">
                <Container fluid>
                    <Header
                        infoAlerts={infoAlerts}
                        removeInfoAlert={removeInfoAlert}
                        errorAlerts={errorAlerts}
                        removeErrorAlert={removeErrorAlert}
                    />
                    <Router />

                    <Footer
                        logAlerts={logAlerts}
                        removeLogAlert={removeLogAlert}
                    />
                </Container>
            </header>
        </div>
    );
}
export default App;