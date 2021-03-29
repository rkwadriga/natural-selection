import React from "react";
import {useUser} from "../Services/User";

interface Props {

}

const Account: React.FC<Props> = () => {
    const user = useUser();

    return (
        <div className="Account">
            <h1>{user.getName()}</h1>
        </div>
    );
}
export default Account;