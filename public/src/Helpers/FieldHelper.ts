import {MathHelper} from "./MathHelper";
import {VerticalDirection} from "../Types/VerticalDirection";
import {HorizontalDirection} from "../Types/HorizontalDirection";

export class FieldHelper
{
    public static getRandomStartPosition(w: number, h: number): Array<number>
    {
        let x = -1, y = -1;
        let border = MathHelper.randomInt(0, 3);
        let randomX = MathHelper.randomInt(0, w);
        let randomY = MathHelper.randomInt(0, h);

        switch (border) {
            case 0:
                y = randomY;
                break;
            case 1:
                x = randomX;
                break;
            case 2:
                x = w;
                y = randomY;
                break;
            case 3:
                x = randomX;
                y = h;
                break;
        }

        return [x, y];
    }

    public static getRandomStep(x0: number, y0: number, w: number, h: number, stepSize: number = 1): Array<number>
    {
        let x: number, y: number;
        let inHorizontal = y0 < 0 || y0 >= h - 1;
        let inVertical = x0 < 0 || x0 >= w - 1;

        if (inHorizontal && inVertical) {
            x = stepSize;
            y = stepSize;
        } else if (inHorizontal) {
            x = 0;
            y = stepSize;
        } else if (inVertical) {
            x = stepSize;
            y = 0;
        } else {
            x = MathHelper.randomInt(0, stepSize);
            y = MathHelper.randomInt(0, stepSize);
        }

        return [x, y];
    }

    public static getRandomPosition(w: number, h: number): Array<number>
    {
        return [MathHelper.randomInt(0, w), MathHelper.randomInt(0, h)];
    }

    public static move(x: number, y: number, deltaX: number, deltaY: number, horizontalDirection: HorizontalDirection, verticalDirection: VerticalDirection): Array<number>
    {
        return [
            horizontalDirection === HorizontalDirection.RIGHT ? x + deltaX : x - deltaX,
            verticalDirection === VerticalDirection.DOWN ? y + deltaY : y - deltaY
        ];
    }

    public static isHorizontalDirectionCorrect(horizontalDirection: HorizontalDirection, w: number, newX: number): boolean
    {
        return (horizontalDirection === HorizontalDirection.RIGHT && newX < w) || (horizontalDirection === HorizontalDirection.LEFT && newX >= 0);
    }

    public static isVerticalDirectionCorrect(verticalDirection: VerticalDirection, h: number, newY: number): boolean
    {
        return (verticalDirection === VerticalDirection.DOWN && newY < h) || (verticalDirection === VerticalDirection.TOP && newY >= 0);
    }

    public static switchDirection(horizontalDirection: HorizontalDirection, verticalDirection: VerticalDirection): Array<number>
    {
        return [
            horizontalDirection === HorizontalDirection.RIGHT ? HorizontalDirection.LEFT : HorizontalDirection.RIGHT,
            verticalDirection === VerticalDirection.DOWN ? VerticalDirection.TOP : VerticalDirection.DOWN
        ];
    }
}