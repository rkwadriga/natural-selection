import {Drawer} from "./Drawer";
import {IField} from "../Field/IField";
let ctx = require('axel');

export class ConsoleDrawer extends Drawer
{
    draw(field: IField): void {
        let width = field.getWidth();
        let height = field.getHeight();
        let backgroundColor = [255, 255, 153];
        let symbolsColor = [255, 0, 0];

        // Top and left lines
        ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        ctx.fg(symbolsColor[0], symbolsColor[1], symbolsColor[2]);
        for (let x = 0; x < width + 5; x++) {
            ctx.text(x, 0, '#');
        }
        for (let y = 0; y < height + 2; y++) {
            ctx.text(0, y, '##');
        }

        // Field
        ctx.box(3, 2, width, height);

        // Right and bottom lines
        ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        ctx.fg(symbolsColor[0], symbolsColor[1], symbolsColor[2]);
        for (let x = 0; x < width + 5; x++) {
            ctx.text(x, height + 2, '#');
        }
        for (let y = 0; y < height + 2; y++) {
            ctx.text(width + 3, y, '##');
        }

        // Add items
        field.getItems().forEach(item => {
            let color = item.getColor();
            ctx.fg(color[0], color[1], color[2]);
            ctx.text(item.getX() + 3, item.getY() + 2, item.getImage());
        });

        // Add creatures
        /*points.forEach(point => {
            if (point[0] === 1) {
                ctx.fg(point[4], point[5], point[6]);
                ctx.text(point[1] + 3, point[2] + 2, '\u2B24');
            }
        });*/

        ctx.cursor.restore();
    }
}