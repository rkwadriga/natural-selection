import React from "react";
import EcosystemForm from "./EcosystemForm";

interface Props {

}

const CreateEcosystem: React.FC<Props> = () => {
    return (
        <div className="CreateEcosystem">
            <EcosystemForm ecosystem={null} />
        </div>
    );
}
export default CreateEcosystem;