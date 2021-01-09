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
    protected energy = 10;
    protected speed = 1;
    protected verticalDirection = VerticalDirection.DOWN;
    protected horizontalDirection = HorizontalDirection.RIGHT;
    protected movementCost = 0.05;
    protected reproduceCost = 2;
    protected reproduceMinEnergy: number;

    constructor(params: object) {
        super(params);
        if (this.reproduceMinEnergy === undefined) {
            this.reproduceMinEnergy = this.energy * 2;
        }
    }

    abstract canEat(item: IDrawableItem): boolean;

    abstract createClone(): Bacteria;

    getEnergy(): number {
        return this.energy;
    }

    canLive(): boolean {
        return this.energy > this.movementCost;
    }

    canMove(): boolean {
        return this.energy >= this.speed * this.movementCost;
    }

    canReproduce(): boolean {
        return this.energy >= this.reproduceMinEnergy;
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
                this.energy -= this.speed * this.movementCost * Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
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
        this.energy -= this.movementCost;
    }

    reproduce(): IBacteria {
        let clone = this.createClone();
        clone.move();
        if (clone.getCoordinates() === this.getCoordinates()) {
            return null;
        }
        this.energy -= clone.energy;
        return clone;
    }

    protected canGo(newX: number, newY: number): boolean
    {
        let item = this.field.getItem(DrawableItem.createCoordinates(newX, newY));
        return (item === null || this.canEat(item))
            && FieldHelper.isHorizontalDirectionCorrect(this.horizontalDirection, this.field.getWidth(), newX)
            && FieldHelper.isVerticalDirectionCorrect(this.verticalDirection, this.field.getHeight(), newY);
    }

    protected getCloneParams(): object {
        return {
            type: this.type,
            field: this.field,
            energy: (this.energy - this.reproduceCost) / 2,
            x: this.x,
            y: this.y
        };
    }
}