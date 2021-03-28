
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