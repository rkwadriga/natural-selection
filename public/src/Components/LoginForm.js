import React from 'react';
import {Button, Form} from 'react-bootstrap';

class LoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: null,
            password: null
        };
    }

    handleInputChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/token', {
            "method": "PUT",
            "body": JSON.stringify(this.state)
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="Login-form">
                <Form onSubmit={ this.handleSubmit }>
                    <Form.Group controlId="login_form_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={ this.handleInputChange } name="email" type="email" placeholder="Example@mail.com" required />
                    </Form.Group>

                    <Form.Group controlId="login_form_password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={ this.handleInputChange } name="password" type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button variant="secondary" type="submit">Login</Button>
                </Form>
            </div>
        )
    }
}
export default LoginForm;