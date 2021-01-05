import {IDrawableItemFactory} from "./IDrawableItemFactory";
import {PredatoryBacteria} from "./PredatoryBacteria";

export class PredatoryBacteriaFactory implements IDrawableItemFactory
{
    createDrawableItem(): PredatoryBacteria {
        return undefined;
    }
}