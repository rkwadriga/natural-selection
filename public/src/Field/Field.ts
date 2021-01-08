import {IField} from "./IField";
import {IDrawableItem} from "../Item/IDrawableItem";

export class Field implements IField
{
    protected readonly width: number;
    protected readonly height: number;
    protected items: Array<IDrawableItem>

    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.items = [];
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getItem(coordinates: string): IDrawableItem {
        return this.items[coordinates] === undefined ? null : this.items[coordinates];
    }

    addItem(item: IDrawableItem): void {
        this.items[item.getCoordinates()] = item;
    }

    removeItem(item: IDrawableItem): void {
        this.items[item.getCoordinates()] = undefined;
    }

    moveItem(oldCoordinates: string, newCoordinates: string): void {
        let item = this.items[oldCoordinates];
        this.items[oldCoordinates] = undefined;
        this.items[newCoordinates] = item;
    }

    getItems(type = null): Array<IDrawableItem> {
        let items = [];
        for (let coordinates in this.items) {
            let item = this.items[coordinates];
            if (item !== undefined && (type === null || type === item.getType())) {
                items.push(item);
            }
        }
        return items;
    }
}