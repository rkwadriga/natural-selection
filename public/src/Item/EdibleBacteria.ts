import {Bacteria} from "./Bacteria";
import {IFood} from "./IFood";

export class EdibleBacteria extends Bacteria implements IFood
{
    getEnergy(): number {
        return this.energy;
    }
}