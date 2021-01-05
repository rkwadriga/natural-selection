import {IDrawableItem} from "../Item/IDrawableItem";
import {ItemType} from "../Item/ItemType";

export interface IField
{
    getWidth(): number;
    getHeight(): number;
    getItems(type?: ItemType): Array<IDrawableItem>;
    getItem(coordinates: string): IDrawableItem;
    addItem(item: IDrawableItem): void;
}