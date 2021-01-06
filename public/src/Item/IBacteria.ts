import {IDrawableItem} from "./IDrawableItem";
import {IFood} from "./IFood";
import {HorizontalDirection} from "../Types/HorizontalDirection";
import {VerticalDirection} from "../Types/VerticalDirection";

export interface IBacteria extends IDrawableItem
{
    canReproduce(): boolean;
    canMove(): boolean;
    canEat(): boolean;
    canLive(): boolean;
    reproduce(): IBacteria;
    move(): void;
    eat(food: IFood): void;
}