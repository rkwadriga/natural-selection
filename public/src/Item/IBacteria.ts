import {IDrawableItem} from "./IDrawableItem";

export interface IBacteria extends IDrawableItem
{
    canReproduce(): boolean;
    canMove(): boolean;
    canLive(): boolean;
    reproduce(): IBacteria;
    move(): void;
    canEat(item: IDrawableItem): boolean;
    eat(item: IDrawableItem): void;
}