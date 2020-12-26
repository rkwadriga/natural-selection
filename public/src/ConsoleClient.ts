import {ClientInterface} from './ClientInterface';
import {FieldInterface} from "./FieldInterface";
import {CreatureInterface} from "./CreatureInterface";
import {Creature} from "./Creature";

export class ConsoleClient implements ClientInterface
{
    private readonly field: FieldInterface;

    constructor(field: FieldInterface) {
        this.field = field;
    }

    public drawField(): void
    {
        let field: string = '';
        let width: number = this.field.getWidth();
        let height: number = this.field.getHeight();

        for (let y = 0; y < height; y++) {
            field += "\n";
            for (let x = 0; x < width; x++) {
                let figure: string = '  ';
                let creature: CreatureInterface = this.field.getCreature(x, y)
                if (creature === undefined) {
                    if (y === 0 || y === height - 1) {
                        figure = '__';
                    } else if (x === 0 || x === width - 1) {
                        figure = '|  ';
                    }
                } else {
                    figure = ' O';
                }
                field += figure;
            }
        }
        console.log(field);
    }

    public getField(): FieldInterface
    {
        return this.field;
    }
}