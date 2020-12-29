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
        for (let x = 0; x < width + 7; x++) {
            ctx.text(x, 0, '#');
        }
        for (let y = 0; y < height + 2; y++) {
            ctx.text(0, y, '##');
        }

        // Field
        ctx.box(4, 2, width, height);

        // Points
        points.forEach(point => {
            ctx.bg(point[2], point[3], point[4]);
            ctx.box(4 + point[0], point[1] + 2, 2, 1);
        });

        // Right and bottom lines
        ctx.bg(128, 255, 0);
        ctx.fg(255, 0, 0);
        for (let x = 0; x < width + 7; x++) {
            ctx.text(x, height + 2, '#');
        }
        for (let y = 0; y < height + 2; y++) {
            ctx.text(width + 5, y, '##');
        }

        ctx.cursor.restore();
    }
}