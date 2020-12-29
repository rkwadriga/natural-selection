import {ClientInterface} from './ClientInterface';
import {FieldInterface} from './FieldInterface';
import {Terminal} from './ConsoleVIew/Terminal';
import {CreatureInterface} from "./CreatureInterface";

export class ConsoleClient implements ClientInterface
{
    private readonly field: FieldInterface;

    constructor(field: FieldInterface) {
        this.field = field;
    }

    public drawField()
    {
        let creatures = this.field.getCreatures();
        let points: number[][] = [];
        let creature: CreatureInterface;
        let color: Array<number>;

        for (let key in creatures) {
            creature = creatures[key];
            color = creature.getColor();
            points.push([creature.getX(), creature.getY(), color[0], color[1], color[2]])
        }

        (new Terminal()).draw(this.field.getWidth(), this.field.getHeight(), points);
    }

    public getField(): FieldInterface
    {
        return this.field;
    }
}