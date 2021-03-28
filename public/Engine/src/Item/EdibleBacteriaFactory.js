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
exports.EdibleBacteriaFactory = void 0;
var EdibleBacteria_1 = require("./EdibleBacteria");
var BacteriaFactory_1 = require("./BacteriaFactory");
var EdibleBacteriaFactory = /** @class */ (function (_super) {
    __extends(EdibleBacteriaFactory, _super);
    function EdibleBacteriaFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EdibleBacteriaFactory.prototype.createDrawableItem = function (params) {
        this.initParams(params);
        return new EdibleBacteria_1.EdibleBacteria(params);
    };
    return EdibleBacteriaFactory;
}(BacteriaFactory_1.BacteriaFactory));
exports.EdibleBacteriaFactory = EdibleBacteriaFactory;
