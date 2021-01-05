import {IDrawableItem} from "../Item/IDrawableItem";

export interface IField
{
    getWidth(): number;
    getHeight(): number;
    getItems(): Array<IDrawableItem>;
    getItem(coordinates: string): IDrawableItem;
    addItem(item: IDrawableItem): void;
}