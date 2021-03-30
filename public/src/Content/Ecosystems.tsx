import React from "react";
import { useAsync } from "react-async";
import {useApi, ECOSYSTEMS_REQUEST} from "../Services/Api";

interface Props {

}

const getEcosystems = async (props: any) => {
    const response = await props.api.call(ECOSYSTEMS_REQUEST);
    return response.data;
}

const Ecosystems: React.FC<Props> = () => {
    const api = useApi();

    const {data} = useAsync({promiseFn: getEcosystems, api});
    //console.log(data);


    console.log("OK");

    return (
        <div className="Ecosystems">
            <h1>Ecosystems List</h1>
        </div>
    );
}
export default Ecosystems;