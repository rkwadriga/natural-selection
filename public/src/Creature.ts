import {CreatureInterface} from "./CreatureInterface";

export class Creature implements CreatureInterface
{
    private readonly x: number;
    private readonly y: number;
    private coordinates: string;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }

    public move(): void
    {

    }

    public setCoordinates(coordinates: string): void
    {
        this.coordinates = coordinates;
    }

    public getCoordinates(): string
    {
        return this.coordinates;
    }
}