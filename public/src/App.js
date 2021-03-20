import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './Components/LoginForm';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Container>
                        <LoginForm />
                    </Container>
                </header>
            </div>
        )
    }
}
export default App;