import React from 'react';
import {BrowserRouter as Router, Link, Switch, Route, useLocation, useHistory} from "react-router-dom";
import {Row, Col, Nav} from 'react-bootstrap';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

class NotLoggedInBlock extends React.Component {
    constructor(props) {
        super(props);
        this.switchPage = this.switchPage.bind(this);
        this.state = {
            page: "/login"
        };
    }

    switchPage(page) {
        this.setState({page});
    }

    componentDidMount() {
        /* Problem! */
        //const history = useHistory();
        //history.push("/login");
    }

    render() {
        return (
            <div className="Content-Not-Logged-In">
                <Router>
                    <Row>
                        <div className="vertical-align-middle">
                            <Col md className="align-left">
                                <Link
                                    to="/login"
                                    className={this.state.page === "/login" ? "link active" : "link"}
                                    onClick={() => this.switchPage( "/login")}
                                >
                                    Login
                                </Link>
                                <br/>
                                <Link
                                    to="/registration"
                                    className={this.state.page === "/registration" ? "link active" : "link"}
                                    onClick={() => this.switchPage("/registration")}
                                >
                                    Registration
                                </Link>
                            </Col>
                        </div>
                        <Col md className="margin-left-30">
                            <Switch>
                                <Route path="/login">
                                    <LoginForm
                                        api={this.props.api}
                                    />
                                </Route>
                                <Route path="/registration">
                                    <RegistrationForm
                                        api={this.props.api}
                                    />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Router>
            </div>
        )
    }
}
export default NotLoggedInBlock;