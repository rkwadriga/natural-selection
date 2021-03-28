"use strict";
exports.__esModule = true;
exports.Field = void 0;
var Field = /** @class */ (function () {
    function Field(width, height) {
        this.width = width;
        this.height = height;
        this.items = [];
    }
    Field.prototype.getWidth = function () {
        return this.width;
    };
    Field.prototype.getHeight = function () {
        return this.height;
    };
    Field.prototype.getItem = function (coordinates) {
        return this.items[coordinates] === undefined ? null : this.items[coordinates];
    };
    Field.prototype.addItem = function (item) {
        this.items[item.getCoordinates()] = item;
    };
    Field.prototype.removeItem = function (item) {
        this.items[item.getCoordinates()] = undefined;
    };
    Field.prototype.moveItem = function (from, to) {
        var item = this.items[from];
        this.items[from] = undefined;
        this.items[to] = item;
    };
    Field.prototype.getItems = function (type) {
        if (type === void 0) { type = null; }
        var items = [];
        for (var coordinates in this.items) {
            var item = this.items[coordinates];
            if (item !== undefined && (type === null || type === item.getType())) {
                items.push(item);
            }
        }
        return items;
    };
    return Field;
}());
exports.Field = Field;
