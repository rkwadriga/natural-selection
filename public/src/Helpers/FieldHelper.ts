import {MathHelper} from "./MathHelper";

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

    public static getRandomStep(x0: number, y0: number, w: number, h: number, coefficient: number = 1): Array<number>
    {
        let x: number, y: number;
        let inHorizontal = y0 < 0 || y0 >= h;
        let inVertical = x0 < 0 || x0 >= w - 1;

        if (inHorizontal && inVertical) {
            x = coefficient;
            y = coefficient;
        } else if (inHorizontal) {
            x = 0;
            y = coefficient;
        } else if (inVertical) {
            x = coefficient;
            y = 0;
        } else {
            x = MathHelper.randomInt(0, coefficient);
            y = MathHelper.randomInt(0, coefficient);
        }

        return [x, y];
    }

    public static getRandomPosition(w: number, h: number): Array<number>
    {
        return [MathHelper.randomInt(0, w), MathHelper.randomInt(0, h)];
    }
}