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
exports.OmnivorousBacteria = void 0;
var Bacteria_1 = require("./Bacteria");
var ItemType_1 = require("../Types/ItemType");
var OmnivorousBacteria = /** @class */ (function (_super) {
    __extends(OmnivorousBacteria, _super);
    function OmnivorousBacteria() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = [0, 255, 255];
        _this.image = "\u25C8";
        _this.name = "Omnivorous bacteria";
        _this.energy = 10;
        _this.movementCost = 0.05;
        _this.eatingCost = 0.6;
        return _this;
    }
    OmnivorousBacteria.prototype.canEat = function (item) {
        return item.getType() === ItemType_1.ItemType.EDIBLE_BACTERIA || item.getType() === ItemType_1.ItemType.FOOD;
    };
    OmnivorousBacteria.prototype.createClone = function () {
        return new OmnivorousBacteria(this.getCloneParams());
    };
    OmnivorousBacteria.prototype.isAfraid = function (item) {
        return item.getType() === ItemType_1.ItemType.PREDATORY_BACTERIA;
    };
    return OmnivorousBacteria;
}(Bacteria_1.Bacteria));
exports.OmnivorousBacteria = OmnivorousBacteria;
