/*
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <h1>Hello world!</h1>
        )
    }
}
export default App;
*/

import {
    Button,
    Alert,
    Breadcrumb,
    Card,
    Form,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import ns_image_1 from './static/img/ns_image_1.jpg';

function Example() {
    return (
        <div className="App">
            <header className="App-header">
                <Container fluid>
                    <Form>
                        <Row>
                            <Col md>
                                <Form.Group controlId="login_form_email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Example@mail.com" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email address, trust us!
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group controlId="login_form_password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                    <Form.Text className="text-muted">
                                        Please, create a strong password
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="secondary" type="submit">Login</Button>
                    </Form>

                    <Card className="mb-3" style={{ color: "#000" }}>
                        <Card.Img src={ ns_image_1 } style={{ width: 600 }} />
                        <Card.Body>
                            <Card.Title>Card Example</Card.Title>
                            <Card.Text>This is an example of react-bootstrap cards</Card.Text>
                            <Button variant="primary">Read more</Button>
                        </Card.Body>
                    </Card>

                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Page 1</Breadcrumb.Item>
                        <Breadcrumb.Item active>Page 2</Breadcrumb.Item>
                    </Breadcrumb>

                    <Alert variant="primary">This is a button!</Alert>
                </Container>
            </header>
        </div>
    );
}
export default Example;