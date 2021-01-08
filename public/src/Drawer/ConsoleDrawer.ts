import {Drawer} from "./Drawer";
import {IField} from "../Field/IField";
let ctx = require('axel');

export class ConsoleDrawer extends Drawer
{
    draw(field: IField): void {
        let width = field.getWidth();
        let height = field.getHeight();
        let backgroundColor = [248, 255, 7];
        let symbolsColor = [200, 0, 100];

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

        ctx.cursor.restore();
    }

    viewStatistics(field: IField, items: Array<object>): void {

    }
}