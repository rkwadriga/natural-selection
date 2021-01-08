import {IDrawableItem} from "./IDrawableItem";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";

export abstract class DrawableItem implements IDrawableItem
{
    protected readonly field?: IField = null;
    protected readonly type?: ItemType = null;
    protected x = 0;
    protected y = 0;
    protected readonly color = [0, 0, 0];
    protected readonly image?: string = null;

    constructor(params: object)
    {
        for (let param in params) {
            if (this[param] !== undefined) {
                this[param] = params[param];
            }
        }
    }

    getType(): ItemType {
        return this.type;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getCoordinates(): string {
        return DrawableItem.createCoordinates(this.getX(), this.getY());
    }

    getColor(): Array<number> {
        return this.color;
    }

    getImage(): string {
        return this.image;
    }



    protected static createCoordinates(x: number, y: number): string
    {
        return x + "x" + y;
    }
}