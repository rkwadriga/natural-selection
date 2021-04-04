import React, {useContext} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {HOME_PAGE, LOGIN_PAGE} from "../Services/Api";
import {useUser} from "../Services/User";
import {AlertsContext} from "../App";

interface Props {

}

const TopNavbar: React.FC<Props> = () => {
    const user = useUser();
    const alertFunctions = useContext(AlertsContext);

    const handleLogout = async () => {
        // Logout user
        try {
            await user.logOut();
        } catch (e) {
            alertFunctions.addErrorAlert(e.message, 5000);
            return;
        }
    };

    const usersPanel = React.createElement('div', null,
        <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={user.getName()} id="basic-nav-dropdown">
                <NavDropdown.Item onSelect={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
    );
    const guestsPanel = React.createElement('div', {className: "justify-content-end"},
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Guest</Navbar.Text>
        </Navbar.Collapse>
    );

    return (
        <Navbar>
            <Nav.Link href={user.isLoggedIn() ? HOME_PAGE : LOGIN_PAGE}>Home</Nav.Link>
            <Navbar.Toggle />
            {user.isLoggedIn() ? usersPanel : guestsPanel}
        </Navbar>
    );
}
export default TopNavbar;