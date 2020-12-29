import {CreatureInterface} from "./CreatureInterface";
import {MathHelper} from "./Helpers/MathHelper";
import {FieldInterface} from "./FieldInterface";
import {FieldHelper} from "./Helpers/FieldHelper";

enum VerticalDirection {Up, Down}
enum HorizontalDirection {Left, Right}

export class Creature implements CreatureInterface
{
    private field: FieldInterface;
    private x: number;
    private y: number;
    private coordinates: string;
    private verticalDirection: VerticalDirection;
    private horizontalDirection: HorizontalDirection;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
        this.verticalDirection = VerticalDirection.Down;
        this.horizontalDirection = HorizontalDirection.Right;
    }

    public setField(field: FieldInterface): void
    {
        this.field = field;
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }

    public move(): void
    {
        let x: number, y: number;
        [x, y] = FieldHelper.getRandomStep(this.x, this.y, this.field.getWidth(), this.field.getHeight());
        this.setDirection(x, y);

        switch (this.verticalDirection) {
            case VerticalDirection.Down:
                this.y += y;
                break;
            case VerticalDirection.Up:
                this.y -= y;
                break;
        }
        switch (this.horizontalDirection) {
            case HorizontalDirection.Right:
                this.x += x;
                break;
            case HorizontalDirection.Left:
                this.x -= x;
                break;
        }
    }

    public setCoordinates(coordinates: string): void
    {
        this.coordinates = coordinates;
    }

    public getCoordinates(): string
    {
        return this.coordinates;
    }

    public getColor(): Array<number>
    {
        return [255, 0, 0];
    }

    private setDirection(x: number, y: number): void
    {
        let newY: number;
        let newX: number;
        switch (this.verticalDirection) {
            case VerticalDirection.Down:
                newY = this.y + y;
                break;
            case VerticalDirection.Up:
                newY = this.y - y;
                break;
        }
        switch (this.horizontalDirection) {
            case HorizontalDirection.Right:
                newX = this.x + x;
                break;
            case HorizontalDirection.Left:
                newX = this.x - x;
                break;
        }
        let hasCreature = this.field.hasCreature(newX, newY);

        switch (this.verticalDirection) {
            case VerticalDirection.Down:
                if (newY >= this.field.getHeight() || hasCreature) {
                    this.verticalDirection = VerticalDirection.Up;
                }
                break;
            case VerticalDirection.Up:
                if (newY < 0 || hasCreature) {
                    this.verticalDirection = VerticalDirection.Down;
                }
                break;
        }
        switch (this.horizontalDirection) {
            case HorizontalDirection.Right:
                if (newX >= this.field.getWidth() - 1 || hasCreature) {
                    this.horizontalDirection = HorizontalDirection.Left;
                }
                break;
            case HorizontalDirection.Left:
                if (newX < 0 || hasCreature) {
                    this.horizontalDirection = HorizontalDirection.Right;
                }
                break;
        }
    }
}