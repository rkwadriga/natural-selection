
export const setObjectValue = (object: Record<string, any>, key: string, value: any): Record<string, any> => {
    const newObject = Object.assign(object);
    newObject[key] = value;
    return newObject;
};