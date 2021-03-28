
export const addElement = (arr: any[], element: any): any[] => {
    return arr.concat([element]);
};

export const removeElement = (arr: any[], index: number): any[] => {
    let newArray: any[] = [];
    arr.map((element, i) => {
        if (i !== index) {
            newArray.push(element);
        }
    });
    return newArray;
};