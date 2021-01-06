import {ItemType} from "../Types/ItemType";

export interface IDrawableItem
{
    getType(): ItemType;
    getX(): number;
    getY(): number;
    getCoordinates(): string;
    getColor(): Array<number>;
    getImage(): string;
}