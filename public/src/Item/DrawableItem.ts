import {IDrawableItem} from "./IDrawableItem";
import {ItemType} from "./ItemType";

export class DrawableItem implements IDrawableItem
{
    protected readonly type: ItemType;
    protected readonly x: number;
    protected readonly y: number;
    protected readonly color: Array<number>;
    protected readonly image: string;

    constructor(x: number, y: number, color = [255, 255, 255], image = "\u2B24", type?: ItemType)
    {
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
        return this.getX() + "x" + this.getY();
    }

    getColor(): Array<number> {
        return this.color;
    }

    getImage(): string {
        return this.image;
    }
}