import {IDrawableItem} from "../Item/IDrawableItem";
import {ItemType} from "../Types/ItemType";

export interface IField
{
    getWidth(): number;
    getHeight(): number;
    getItems(type?: ItemType): Array<IDrawableItem>;
    getItem(coordinates: string): IDrawableItem;
    addItem(item: IDrawableItem): void;
    removeItem(item: IDrawableItem): void;
    moveItem(oldCoordinates: string, newCoordinates: string): void;
}