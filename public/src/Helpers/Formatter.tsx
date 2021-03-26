import React from "react";

const createElement = (object: any, margin = 0, showOpenTag = true) => {
    if (typeof object !== "object") {
        return React.createElement('div', null, object);
    }
    let index = 0;
    const isObject = !Array.isArray(object);
    return React.createElement('div', null,
        <div>
            {showOpenTag ? <div>{isObject ? "{" : "["}</div> : ""}
            {Object.keys(object).map(key => {
                index++;
                let value = object[key];
                const isObjectVal = (typeof value === 'object');
                if (isObject) {
                    key = "\"" + key + "\"";
                }
                if (typeof value === "string") {
                    value = "\"" + value + "\"";
                } else if (value === null) {
                    value = "NULL";
                } else if (value === true) {
                    value = "TRUE";
                } else if (value === false) {
                    value = "FALSE";
                }
                return React.createElement('div', {key: key + "_" + index, style: {marginLeft: margin + 20 }},
                    <div>
                        {key + ": " + (isObjectVal ? (!Array.isArray(value) ? "{" : "[") : "")}
                        {createElement(value, 20, false)}
                    </div>
                )
            })}
            {React.createElement('div', {style: {marginLeft: margin}}, isObject ? "}" : "]")}
        </div>
    );
}
export default createElement;