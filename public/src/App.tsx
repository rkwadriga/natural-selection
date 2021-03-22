import React, {useState} from "react";
import Header from "./Content/Header";
import Footer from "./Content/Footer";
import Alert from "./Content/AlertInterface";

interface Props {
    config: {
        api: {};
        mode: string;
    }
}

const infoAlertsExamples: Alert[] = [
    {variant: "default", text: "Info Alert 1"},
    {variant: "default", text: "Info Alert 2"},
    {variant: "default", text: "Info Alert 3"},
];

const App: React.FC<Props> = () => {
    const [infoAlerts, setInfoAlerts] = useState<Alert[]>([]);
    const [errorAlerts, setErrorAlerts] = useState<Alert[]>([]);
    const [logAlerts, setLogAlerts] = useState<Alert[]>([]);

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

    return (
        <div className="App">
            <header className="App-header">
                <Header
                    infoAlerts={infoAlerts}
                    removeInfoAlert={removeInfoAlert}
                    errorAlerts={errorAlerts}
                    removeErrorAlert={removeErrorAlert}
                />

                <Footer
                    logAlerts={logAlerts}
                    removeLogAlert={removeLogAlert}
                />
            </header>
        </div>
    );
}
export default App;