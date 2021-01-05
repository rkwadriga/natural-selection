let ctx = require('axel');

export class Terminal
{
    public draw(width: number, height: number, points: number[][])
    {
        // Clear the terminal/screen/console
        //ctx.clear();

        // Top and left lines
        ctx.bg(128, 255, 0);
        ctx.fg(255, 0, 0);
        for (let x = 0; x < width + 5; x++) {
            ctx.text(x, 0, '#');
        }
        for (let y = 0; y < height + 2; y++) {
            ctx.text(0, y, '##');
        }

        // Field
        ctx.box(3, 2, width, height);

        // Right and bottom lines
        ctx.bg(128, 255, 0);
        ctx.fg(255, 0, 0);
        for (let x = 0; x < width + 5; x++) {
            ctx.text(x, height + 2, '#');
        }
        for (let y = 0; y < height + 2; y++) {
            ctx.text(width + 3, y, '##');
        }

        // Add food
        points.forEach(point => {
            if (point[0] === 0) {
                ctx.fg(point[4], point[5], point[6]);
                ctx.text(point[1] + 3, point[2] + 2, point[3].toString());
            }
        });

        // Add creatures
        points.forEach(point => {
            if (point[0] === 1) {
                ctx.fg(point[4], point[5], point[6]);
                ctx.text(point[1] + 3, point[2] + 2, '\u2B24');
            }
        });

        ctx.cursor.restore();
    }
}