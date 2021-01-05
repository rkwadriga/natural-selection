import {IDrawableItemFactory} from "./IDrawableItemFactory";
import {EdibleBacteria} from "./EdibleBacteria";

export class EdibleBacteriaFactory implements IDrawableItemFactory
{
    createDrawableItem(): EdibleBacteria {
        return undefined;
    }
}