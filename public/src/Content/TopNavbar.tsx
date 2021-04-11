import React, {useContext} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {
    HOME_PAGE,
    LOGIN_PAGE,
    CREATE_ECOSYSTEM_PAGE
} from "../Services/Api";
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

    return (
        <Navbar>
            <Nav.Link href={user.isLoggedIn() ? HOME_PAGE : LOGIN_PAGE}>Home</Nav.Link>
            { user.isLoggedIn()
                ? (
                    <NavDropdown title="Actions" id="top_naw_bar_actions_dropdown">
                        <NavDropdown.Item href={CREATE_ECOSYSTEM_PAGE}>Create Ecosystem</NavDropdown.Item>
                    </NavDropdown>
                )
                : null
            }
            <Navbar.Toggle />
            { user.isLoggedIn()
                ? (
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={user.getName()} id="basic-nav-dropdown">
                            <NavDropdown.Item onSelect={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                )
                : (
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Guest</Navbar.Text>
                    </Navbar.Collapse>
                )
            }
        </Navbar>
    );
}
export default TopNavbar;