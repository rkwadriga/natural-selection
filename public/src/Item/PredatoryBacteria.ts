import {Bacteria} from "./Bacteria";
import {ItemType} from "./ItemType";

export class PredatoryBacteria extends Bacteria
{
    constructor(x: number, y: number, color = [0, 0, 0], image = "", energy = 10)
    {
        super(x, y, color, image, energy, ItemType.PREDATORY_BACTERIA);
    }
}