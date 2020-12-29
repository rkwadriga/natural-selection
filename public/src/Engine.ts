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

        let time = 0;
        let period = 1000 / this.params.runSpeed;

        // Draw a field with creatures in a start position
        this.client.drawField();

        let interval = setInterval(() => {
            // Clear console
            console.clear();

            // Make all creatures to move
            this.iterate();
            this.client.drawField();

            // Stop the process when the time is run out
            if ((time += period) >= this.params.runtime * 1000) {
                clearInterval(interval);
            }
        }, period);
        return 0;
    }

    private iterate()
    {
        let creatures = this.field.getCreatures();
        for (let key in creatures) {
            let creature = creatures[key];
            creature.move();
        }
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
            this.field.addCreature(Engine.newCreature(x, 0));
        }
    }

    private static newCreature(x: number, y: number): CreatureInterface
    {
        return new Creature(x, y);
    }
}