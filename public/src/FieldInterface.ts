import {CreatureInterface} from "./CreatureInterface";

export interface FieldInterface {
    addCreature(creature: CreatureInterface): void;
    getCreatures(): Array<CreatureInterface>;
    getWidth(): number;
    getHeight(): number;
    hasCreature(x: number, y: number): boolean;
    getCreature(x: number, y: number): CreatureInterface;
}