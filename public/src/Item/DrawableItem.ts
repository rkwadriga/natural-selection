import {IDrawableItem} from "./IDrawableItem";

export class DrawableItem implements IDrawableItem
{
    protected readonly x: number;
    protected readonly y: number;
    protected readonly color: Array<number>;
    protected readonly image: string;

    constructor(x: number, y: number, color = [0, 0, 0], image: "")
    {
        this.x = x;
        this.y = y;
        this.color = color;
        this.image = image;
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