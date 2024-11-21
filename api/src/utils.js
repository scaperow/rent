"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumber = exports.NumberName = void 0;
const lodash_1 = require("lodash");
const moment = require("moment");
var NumberName;
(function (NumberName) {
    NumberName["CONTRACT_ORDER"] = "CO";
    NumberName["TRANSACTION_ORDER"] = "TO";
})(NumberName = exports.NumberName || (exports.NumberName = {}));
const getNumber = (slug) => {
    const now = moment();
    return `${slug}-${now.format('YYYYMMDD')}-${String((0, lodash_1.random)(0, 4)).padStart(4, '0')}`;
};
exports.getNumber = getNumber;
//# sourceMappingURL=utils.js.map