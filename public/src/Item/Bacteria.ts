import {DrawableItem} from "./DrawableItem";
import {IBacteria} from "./IBacteria";
import {IFood} from "./IFood";
import {ItemType} from "./ItemType";

export class Bacteria extends DrawableItem implements IBacteria
{
    protected energy: number;

    constructor(x: number, y: number, color = [0, 0, 0], image = "", energy = 10, type?: ItemType)
    {
        super(x, y, color, image, type);
        this.energy = energy;
    }

    canEat(): boolean {
        return false;
    }

    canLive(): boolean {
        return false;
    }

    canMove(): boolean {
        return false;
    }

    canReproduce(): boolean {
        return false;
    }

    eat(food: IFood): void {
    }

    move(): void {
    }

    reproduce(): IBacteria {
        return null;
    }
}