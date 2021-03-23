import React, {useState} from "react";
import Header from "./Content/Header";
import Footer from "./Content/Footer";
import Alert from "./Content/AlertInterface";
import Router from "./Content/Router";
import {useFormatter} from "./Services/Formatter";
import {useApi, ApiConfig, Request, Response} from "./Services/Api";

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

    const data = {
        param1: 1,
        param2: 2
    }

    console.log(useFormatter());
    /*const formattedData = useFormatter().format(data);
    console.log(typeof formattedData);*/

    // Alert functions
    const removeAlert = (index: number, alerts: Alert[], setter: (alerts: Alert[]) => void) => {
        alerts.splice(index, 1);
        setter(alerts);
    };
    const addAlert = (variant: string, text: string, alerts: Alert[], setter: (alerts: Alert[]) => void, lifetime: number) => {
        alerts.push({variant: variant, text});
        setter(alerts);
        if (lifetime > 0) {
            setTimeout(() => {
                removeAlert(alerts.length - 1, alerts, setter);
            }, lifetime);
        }
    };

    const addInfoAlert = (text: string, lifetime = 5000) => { addAlert("primary", text, infoAlerts, setInfoAlerts, lifetime) };
    const removeInfoAlert = (index: number) => { removeAlert(index, infoAlerts, setInfoAlerts); };

    const addErrorAlert = (text: string, lifetime = 5000) => { addAlert("danger", text, errorAlerts, setErrorAlerts, lifetime) };
    const removeErrorAlert = (index: number) => { removeAlert(index, errorAlerts, setErrorAlerts); };

    const addLogAlert = (text: string, lifetime = 5000) => { addAlert("info", text, logAlerts, setLogAlerts, lifetime) };
    const removeLogAlert = (index: number) => { removeAlert(index, logAlerts, setLogAlerts); };

    // Configure router
    const api = useApi();
    api.setConfig(config.api);
    api.setBeforeRequestHandler((request: Request) => {
        addInfoAlert(request.url);
        return true;
    });
    api.setErrorHandler((response: Response) => {
        addErrorAlert(response.status + ": " + response.error);
        return true;
    });
    api.setSuccessHandler((response: Response) => {
        //addLogAlert(response.data);
        return true;
    });


    return (
        <div className="App">
            <header className="App-header">
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
            </header>
        </div>
    );
}
export default App;