"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AuthenticationError_1 = (0, tslib_1.__importDefault)(require("../utils/AuthenticationError"));
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService() {
    }
    AuthenticationService.check = function (req) {
        if (!req.headers.authorization) {
            throw new AuthenticationError_1.default("Authorization header is missing.");
        }
    };
    return AuthenticationService;
}());
exports.default = AuthenticationService;
//# sourceMappingURL=Authentication.js.map