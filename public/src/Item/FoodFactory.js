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
exports.FoodFactory = void 0;
var Food_1 = require("./Food");
var ItemFactory_1 = require("./ItemFactory");
var FoodFactory = /** @class */ (function (_super) {
    __extends(FoodFactory, _super);
    function FoodFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FoodFactory.prototype.createDrawableItem = function (params) {
        this.initParams(params);
        return new Food_1.Food(params);
    };
    return FoodFactory;
}(ItemFactory_1.ItemFactory));
exports.FoodFactory = FoodFactory;
