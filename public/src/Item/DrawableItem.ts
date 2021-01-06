import {IDrawableItem} from "./IDrawableItem";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";

export class DrawableItem implements IDrawableItem
{
    protected readonly field: IField;
    protected readonly type: ItemType;
    protected x: number;
    protected y: number;
    protected readonly color: Array<number>;
    protected readonly image: string;

    constructor(field: IField, x: number, y: number, color = [255, 255, 255], image = "\u2B24", type?: ItemType)
    {
        this.field = field;
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = color;
        this.image = image;
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