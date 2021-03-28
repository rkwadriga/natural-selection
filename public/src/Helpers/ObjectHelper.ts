
export const setObjectValue = (object: any, name: string, value: unknown) => {
    object[name] = value;
    return Object.assign({}, object);
};

export const setObjectValues = (object: any, values: Record<string, unknown>) => {
    const newObject = Object.assign({}, object);
    Object.keys(values).forEach((key) => {
        newObject[key] = values[key];
    });
    return newObject;
};