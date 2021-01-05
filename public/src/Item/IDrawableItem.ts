export interface IDrawableItem
{
    getX(): number;
    getY(): number;
    getCoordinates(): string;
    getColor(): Array<number>;
    getImage(): string;
}