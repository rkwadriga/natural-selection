import {PredatoryBacteria} from "./PredatoryBacteria";
import {BacteriaFactory} from "./BacteriaFactory";

export class PredatoryBacteriaFactory extends BacteriaFactory
{
    createDrawableItem(params: object): PredatoryBacteria {
        this.initParams(params);
        return new PredatoryBacteria(params);
    }
}