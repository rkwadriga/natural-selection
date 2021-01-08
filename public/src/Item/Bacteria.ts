import {DrawableItem} from "./DrawableItem";
import {IBacteria} from "./IBacteria";
import {HorizontalDirection} from "../Types/HorizontalDirection";
import {VerticalDirection} from "../Types/VerticalDirection";
import {FieldHelper} from "../Helpers/FieldHelper";
import {IDrawableItem} from "./IDrawableItem";
import {Food} from "./Food";
import {IFood} from "./IFood";

export abstract class Bacteria extends DrawableItem implements IBacteria, IFood
{
    protected energy = 1;
    protected readonly speed = 1;
    protected verticalDirection = VerticalDirection.DOWN;
    protected horizontalDirection = HorizontalDirection.RIGHT;
    protected readonly movementCost = 0.5;

    abstract canEat(item: IDrawableItem): boolean;

    getEnergy(): number {
        return this.energy;
    }

    canLive(): boolean {
        return this.energy > 0;
    }

    canMove(): boolean {
        return this.energy > 0;
    }

    canReproduce(): boolean {
        return true;
    }

    eat(item: IDrawableItem): void {
        if (!this.canEat(item)) {
            return;
        }
        if (item instanceof Food || item instanceof Bacteria) {
            this.energy += item.getEnergy();
        }
    }

    move(): void {
        let deltaX: number, deltaY: number, newX: number, newY: number;
        let newHorizontalDirection: HorizontalDirection, newVerticalDirection: VerticalDirection;
        for (let i = 0; i <= 8; i++) {
            [deltaX, deltaY] = FieldHelper.getRandomStep(this.speed);
            [newX, newY] = FieldHelper.move(this.x, this.y, deltaX, deltaY, this.horizontalDirection, this.verticalDirection);
            if (this.canGo(newX, newY)) {
                [this.x, this.y] = [newX, newY];
                return;
            }

            [newHorizontalDirection, newVerticalDirection] = FieldHelper.switchDirection(this.horizontalDirection, this.verticalDirection);
            if (FieldHelper.isHorizontalDirectionCorrect(newHorizontalDirection, this.field.getWidth(), newX)) {
                this.horizontalDirection = newHorizontalDirection;
            }
            if (FieldHelper.isVerticalDirectionCorrect(newVerticalDirection, this.field.getHeight(), newY)) {
                this.verticalDirection = newVerticalDirection;
            }
        }
    }

    reproduce(): IBacteria {
        return null;
    }

    protected canGo(newX: number, newY: number): boolean
    {
        let item = this.field.getItem(DrawableItem.createCoordinates(newX, newY));
        return (item === null || this.canEat(item))
            && FieldHelper.isHorizontalDirectionCorrect(this.horizontalDirection, this.field.getWidth(), newX)
            && FieldHelper.isVerticalDirectionCorrect(this.verticalDirection, this.field.getHeight(), newY);
    }
}