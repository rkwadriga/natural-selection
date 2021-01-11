"use strict";
exports.__esModule = true;
exports.Config = void 0;
var Config = /** @class */ (function () {
    function Config(params) {
        this.width = 50;
        this.height = 25;
        this.duration = 0;
        this.speed = 1;
        this.foods = [];
        this.bacterias = [];
        for (var param in params) {
            if (this[param] !== undefined) {
                this[param] = params[param];
            }
        }
    }
    return Config;
}());
exports.Config = Config;
