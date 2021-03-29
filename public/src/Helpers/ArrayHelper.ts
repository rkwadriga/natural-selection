
export const addElement = (arr: any[], element: any): any[] => {
    return arr.concat([element]);
};

export const removeElement = (arr: any[], index: number) => {
    let newArray: any[] = [];
    arr.forEach((value, i) => {
        if (i !== index) {
            newArray.push(value);
        }
    });
    return newArray;
};

export const inArray = (item: unknown, arr: unknown[]): boolean => {
    let result = false;
    arr.forEach(value => {
        if (item === value) {
            result = true;
            return;
        }
    });
    return result;
}