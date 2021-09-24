"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = (0, tslib_1.__importDefault)(require("express"));
var router = express_1.default.Router();
router.post("/", function (req, res) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    return (0, tslib_1.__generator)(this, function (_a) {
        res.status(200).send();
        return [2 /*return*/];
    });
}); });
exports.default = router;
//# sourceMappingURL=Authentication.js.map