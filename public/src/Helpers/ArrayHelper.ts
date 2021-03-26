
export const addElement = (arr: any[], element: any) => {
    return arr.concat([element]);
};

export const removeElement = (arr: any[], index: number) => {
    let newArray: any[] = [];
    arr.map((element, i) => {
        if (i !== index) {
            newArray.push(element);
        }
    });
    return newArray;
};