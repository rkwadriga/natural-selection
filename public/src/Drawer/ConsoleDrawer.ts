import {Drawer} from "./Drawer";
import {IField} from "../Field/IField";
let ctx = require('axel');

export class ConsoleDrawer extends Drawer
{
    private iterationsCount = 0;

    viewField(field: IField): void {
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
    }

    viewStatistics(field: IField, itemsParams: Array<object>): void {
        let x0 = 0;
        let y0 = field.getHeight() + 4;
        let width = 20;
        let height = 30;
        let items = [];
        let maxCount = 0;
        let backgroundColor = [248, 255, 7];
        let symbolsColor = [50, 50, 50];

        ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        ctx.box(x0, y0, itemsParams.length * (width + 2), height + 2);

        // Add items counts and objects to special array
        itemsParams.forEach(params => {
            let fieldItems = field.getItems(params['type']);
            let count = fieldItems.length;
            if (count === 0) {
                return;
            }
            if (count > maxCount) {
                maxCount = count;
            }

            let item = fieldItems[0];
            items.push({
                count: count,
                text: item.getImage() + item.toString(),
                color: item.getColor()
            });
        });

        let i = 0;
        items.forEach(item => {
            let itemHeight = item['count'] * height / maxCount;

            // Items count count line
            ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
            ctx.fg(symbolsColor[0], symbolsColor[1], symbolsColor[2]);
            ctx.text(x0 + 5 + width * i, y0 + height - itemHeight, "(" + item['count'] + ")");

            // Items count column
            ctx.bg(item['color'][0], item['color'][1], item['color'][2]);
            ctx.box(x0 + 5 + width * i, y0 + height - itemHeight + 1, 5, itemHeight);

            // Items name line
            ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
            ctx.text(x0 + 3 + width * i, y0 + height + 1, item['text']);
            i++;
        });

        this.iterationsCount++;
        ctx.text(x0, y0 + height + 3, "Iteration: " + this.iterationsCount);
    }

    draw(): void {
        ctx.cursor.restore();
    }
}