import {EngineInterface} from './EngineInterface';
import {EngineParams} from './EngineParams';
import {Creature} from "./Creature";
import {CreatureInterface} from "./CreatureInterface";
import {ClientInterface} from "./ClientInterface";
import {FieldInterface} from "./FieldInterface";
import {MathHelper} from "./Helpers/MathHelper";

export class Engine implements EngineInterface
{
    private readonly params: EngineParams;
    private readonly client: ClientInterface;
    private readonly field: FieldInterface;

    constructor(client: ClientInterface, params: EngineParams) {
        this.client = client;
        this.field = client.getField();
        this.params = params;
    }

    public run(): number
    {
        this.addCreatures();
        this.client.drawField();
        return 0;
    }

    private addCreatures(): void
    {
        let width: number = this.field.getWidth() - 1;
        let x: number = 0, hasCreature: boolean;
        for (let i = 0; i < this.params.creaturesCount; i++) {
            hasCreature = true;
            while (hasCreature === true) {
                x = MathHelper.randomInt(0, width);
                hasCreature = this.field.hasCreature(x, 0);
            }
            this.field.addCreature(this.newCreature(x, 0));
        }
    }

    private newCreature(x: number, y: number): CreatureInterface
    {
        return new Creature(x, y);
    }
}