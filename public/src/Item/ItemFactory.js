"use strict";
exports.__esModule = true;
exports.ItemFactory = void 0;
var FieldHelper_1 = require("../Helpers/FieldHelper");
var ItemFactory = /** @class */ (function () {
    function ItemFactory() {
    }
    ItemFactory.prototype.initParams = function (params) {
        var _a;
        if (params['x'] !== undefined && params['y'] !== undefined) {
            return;
        }
        var x, y;
        var x0 = params['x0'] !== undefined ? params['x0'] : 0;
        var x1 = params['x1'] !== undefined ? params['x1'] : 0;
        var y0 = params['y0'] !== undefined ? params['y0'] : 0;
        var y1 = params['y1'] !== undefined ? params['y1'] : 0;
        _a = this.getRandomPosition(x0, y0, x1, y1), x = _a[0], y = _a[1];
        if (params['x'] === undefined) {
            params['x'] = x;
        }
        if (params['y'] === undefined) {
            params['y'] = y;
        }
    };
    ItemFactory.prototype.getRandomPosition = function (x0, y0, x1, y1) {
        return FieldHelper_1.FieldHelper.getRandomPosition(x1 - x0 - 1, y1 - y0 - 1);
    };
    return ItemFactory;
}());
exports.ItemFactory = ItemFactory;
