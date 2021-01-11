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
exports.EdibleBacteria = void 0;
var Bacteria_1 = require("./Bacteria");
var ItemType_1 = require("../Types/ItemType");
var EdibleBacteria = /** @class */ (function (_super) {
    __extends(EdibleBacteria, _super);
    function EdibleBacteria() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = [100, 100, 0];
        _this.image = "\u25FC";
        _this.name = "Edible bacteria";
        _this.movementCost = 0.05;
        return _this;
    }
    EdibleBacteria.prototype.getEnergy = function () {
        return this.energy;
    };
    EdibleBacteria.prototype.isAfraid = function (item) {
        return item.getType() !== ItemType_1.ItemType.FOOD && item.getType() !== this.type;
    };
    EdibleBacteria.prototype.canEat = function (item) {
        return item.getType() === ItemType_1.ItemType.FOOD;
    };
    EdibleBacteria.prototype.createClone = function () {
        return new EdibleBacteria(this.getCloneParams());
    };
    return EdibleBacteria;
}(Bacteria_1.Bacteria));
exports.EdibleBacteria = EdibleBacteria;
