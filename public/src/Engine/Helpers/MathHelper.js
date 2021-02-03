"use strict";
exports.__esModule = true;
exports.MathHelper = void 0;
var MathHelper = /** @class */ (function () {
    function MathHelper() {
    }
    MathHelper.randomInt = function (min, max) {
        return min + Math.floor(Math.random() * (max + 1));
    };
    MathHelper.getDistance = function (x0, y0, x1, y1) {
        return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    };
    return MathHelper;
}());
exports.MathHelper = MathHelper;
