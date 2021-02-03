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
exports.Food = void 0;
var DrawableItem_1 = require("./DrawableItem");
var Food = /** @class */ (function (_super) {
    __extends(Food, _super);
    function Food() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.energy = 2;
        _this.color = [0, 200, 0];
        _this.image = "\u25B3";
        _this.name = "Food";
        return _this;
    }
    Food.prototype.getEnergy = function () {
        return this.energy;
    };
    return Food;
}(DrawableItem_1.DrawableItem));
exports.Food = Food;
