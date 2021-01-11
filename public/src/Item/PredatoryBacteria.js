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
exports.PredatoryBacteria = void 0;
var Bacteria_1 = require("./Bacteria");
var ItemType_1 = require("../Types/ItemType");
var PredatoryBacteria = /** @class */ (function (_super) {
    __extends(PredatoryBacteria, _super);
    function PredatoryBacteria() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = [255, 0, 0];
        _this.image = "\u2B24";
        _this.name = "Predatory bacteria";
        _this.eatingCost = 0.6;
        return _this;
    }
    PredatoryBacteria.prototype.canEat = function (item) {
        return item.getType() === ItemType_1.ItemType.EDIBLE_BACTERIA || item.getType() === ItemType_1.ItemType.OMNIVOROUS_BACTERIA;
    };
    PredatoryBacteria.prototype.createClone = function () {
        return new PredatoryBacteria(this.getCloneParams());
    };
    return PredatoryBacteria;
}(Bacteria_1.Bacteria));
exports.PredatoryBacteria = PredatoryBacteria;
