export class ArrayHelper
{
    static merge(arr: object, ...arrays): object {
        arrays.forEach(arr2 => {
            for (let param in arr2) {
                arr[param] = arr2[param];
            }
        });
        return arr;
    }
}