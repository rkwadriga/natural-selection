import {Bacteria} from "./Bacteria";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";

export class PredatoryBacteria extends Bacteria
{
    constructor(field: IField, x: number, y: number, color = [0, 0, 0], image = "", speed = 1, energy = 10)
    {
        super(field, x, y, color, image, energy, speed, ItemType.PREDATORY_BACTERIA);
    }
}