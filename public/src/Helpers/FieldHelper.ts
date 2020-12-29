import {MathHelper} from "./MathHelper";

export class FieldHelper
{
    public static getRandomStartPosition(w: number, h: number): Array<number>
    {
        let x = -2, y = -1;
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

    public static getRandomStep(x0: number, y0: number, w: number, h: number): Array<number>
    {
        let x: number, y: number;
        let inHorizontal = y0 < 0 || y0 >= h;
        let inVertical = x0 < 0 || x0 >= w - 1;

        if (inHorizontal && inVertical) {
            x = 2;
            y = 1;
        } else if (inHorizontal) {
            x = 0;
            y = 1;
        } else if (inVertical) {
            x = 2;
            y = 0;
        } else {
            x = MathHelper.randomInt(0, 1);
            y = MathHelper.randomInt(0, 1);
        }

        return [x, y];
    }
}