"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ConsoleDrawer = void 0;
var Drawer_1 = require("./Drawer");
var ctx = require('axel');
var ConsoleDrawer = /** @class */ (function (_super) {
    __extends(ConsoleDrawer, _super);
    function ConsoleDrawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iterationsCount = 0;
        return _this;
    }
    ConsoleDrawer.prototype.viewField = function (field) {
        var width = field.getWidth();
        var height = field.getHeight();
        var backgroundColor = [248, 255, 7];
        var symbolsColor = [200, 0, 100];
        // Top and left lines
        ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        ctx.fg(symbolsColor[0], symbolsColor[1], symbolsColor[2]);
        for (var x = 0; x < width + 5; x++) {
            ctx.text(x, 0, '#');
        }
        for (var y = 0; y < height + 2; y++) {
            ctx.text(0, y, '##');
        }
        // Field
        ctx.box(3, 2, width, height);
        // Right and bottom lines
        ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        ctx.fg(symbolsColor[0], symbolsColor[1], symbolsColor[2]);
        for (var x = 0; x < width + 5; x++) {
            ctx.text(x, height + 2, '#');
        }
        for (var y = 0; y < height + 2; y++) {
            ctx.text(width + 3, y, '##');
        }
        // Add items
        field.getItems().forEach(function (item) {
            var color = item.getColor();
            ctx.fg(color[0], color[1], color[2]);
            ctx.text(item.getX() + 3, item.getY() + 2, item.getImage());
        });
    };
    ConsoleDrawer.prototype.viewStatistics = function (field, itemsParams) {
        var x0 = 0;
        var y0 = field.getHeight() + 4;
        var width = 20;
        var height = 30;
        var items = [];
        var maxCount = 0;
        var backgroundColor = [248, 255, 7];
        var symbolsColor = [50, 50, 50];
        ctx.bg(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
        ctx.box(x0, y0, itemsParams.length * (width + 2), height + 2);
        // Add items counts and objects to special array
        itemsParams.forEach(function (params) {
            var fieldItems = field.getItems(params['type']);
            var count = fieldItems.length;
            if (count === 0) {
                return;
            }
            if (count > maxCount) {
                maxCount = count;
            }
            var item = fieldItems[0];
            items.push({
                count: count,
                text: item.getImage() + item.toString(),
                color: item.getColor()
            });
        });
        var i = 0;
        items.forEach(function (item) {
            var itemHeight = item['count'] * height / maxCount;
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
    };
    ConsoleDrawer.prototype.draw = function () {
        ctx.cursor.restore();
    };
    return ConsoleDrawer;
}(Drawer_1.Drawer));
exports.ConsoleDrawer = ConsoleDrawer;
