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

    addItem(item: IDrawableItem): void {
        this.items[item.getCoordinates()] = item;
    }

    getItem(coordinates: string): IDrawableItem {
        return this.items[coordinates] === undefined ? null : this.items[coordinates];
    }

    getItems(): Array<IDrawableItem> {
        return this.items;
    }
}