"use strict";
exports.__esModule = true;
exports.DrawableItem = void 0;
var DrawableItem = /** @class */ (function () {
    function DrawableItem(params) {
        this.field = null;
        this.type = null;
        this.x = 0;
        this.y = 0;
        this.color = [0, 0, 0];
        this.image = null;
        for (var param in params) {
            if (this[param] !== undefined) {
                this[param] = params[param];
            }
        }
    }
    DrawableItem.prototype.getType = function () {
        return this.type;
    };
    DrawableItem.prototype.getX = function () {
        return this.x;
    };
    DrawableItem.prototype.getY = function () {
        return this.y;
    };
    DrawableItem.prototype.getCoordinates = function () {
        return DrawableItem.createCoordinates(this.getX(), this.getY());
    };
    DrawableItem.prototype.getColor = function () {
        return this.color;
    };
    DrawableItem.prototype.getImage = function () {
        return this.image;
    };
    DrawableItem.prototype.toString = function () {
        return this.name;
    };
    DrawableItem.createCoordinates = function (x, y) {
        return x + "x" + y;
    };
    return DrawableItem;
}());
exports.DrawableItem = DrawableItem;
