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
exports.BacteriaFactory = void 0;
var ItemFactory_1 = require("./ItemFactory");
var FieldHelper_1 = require("../Helpers/FieldHelper");
var BacteriaFactory = /** @class */ (function (_super) {
    __extends(BacteriaFactory, _super);
    function BacteriaFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BacteriaFactory.prototype.getRandomPosition = function (x0, y0, x1, y1) {
        return FieldHelper_1.FieldHelper.getRandomStartPosition(x1 - x0, y1 - y0);
    };
    return BacteriaFactory;
}(ItemFactory_1.ItemFactory));
exports.BacteriaFactory = BacteriaFactory;
