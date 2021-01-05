import {PredatoryBacteria} from "./PredatoryBacteria";
import {BacteriaFactory} from "./BacteriaFactory";
import {FieldHelper} from "../Helpers/FieldHelper";

export class PredatoryBacteriaFactory extends BacteriaFactory
{
    createDrawableItem(x1: number, y1: number, x0 = 0, y0 = 0): PredatoryBacteria {
        let position = FieldHelper.getRandomStartPosition(x1 - x0, y1 - y0);
        return new PredatoryBacteria(position[0], position[1]);
    }
}