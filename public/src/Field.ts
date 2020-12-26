import {CreatureInterface} from "./CreatureInterface";
import {FieldInterface} from "./FieldInterface";

export class Field implements FieldInterface
{
    private readonly width: number;
    private readonly height: number;
    private readonly creatures: Array<CreatureInterface>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.creatures = [];
    }

    getWidth(): number
    {
        return this.width;
    }

    getHeight(): number
    {
        return this.height;
    }

    public addCreature(creature: CreatureInterface): void
    {
        let coordinates = Field.coordinates(creature.getX(), creature.getY());
        creature.setCoordinates(coordinates);
        this.creatures[coordinates] = creature;
    }

    public getCreatures(): Array<CreatureInterface>
    {
        return this.creatures;
    }

    public hasCreature(x: number, y: number): boolean
    {
        return this.getCreature(x, y) !== undefined;
    }

    public getCreature(x: number, y: number): CreatureInterface
    {
        return this.creatures[Field.coordinates(x, y)];
    }

    private static coordinates(x: number, y: number): string
    {
        return x + 'x' + y;
    }
}