"use strict";
exports.__esModule = true;
exports.ArrayHelper = void 0;
var ArrayHelper = /** @class */ (function () {
    function ArrayHelper() {
    }
    ArrayHelper.merge = function (arr) {
        var arrays = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arrays[_i - 1] = arguments[_i];
        }
        arrays.forEach(function (arr2) {
            for (var param in arr2) {
                arr[param] = arr2[param];
            }
        });
        return arr;
    };
    return ArrayHelper;
}());
exports.ArrayHelper = ArrayHelper;
