"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = (0, tslib_1.__importDefault)(require("express"));
var keycloak_connect_1 = (0, tslib_1.__importDefault)(require("keycloak-connect"));
var Sentry = (0, tslib_1.__importStar)(require("@sentry/node"));
var Tracing = (0, tslib_1.__importStar)(require("@sentry/tracing"));
var Authentication_1 = (0, tslib_1.__importDefault)(require("@/routers/Authentication"));
var Server = /** @class */ (function () {
    function Server() {
        this.startApiServer();
    }
    Object.defineProperty(Server, "port", {
        get: function () {
            return process.env.PORT || "3000";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Server, "sentryIsEnabled", {
        get: function () {
            return !!process.env.SENTRY_DSN && !!process.env.SENTRY_ENVIRONMENT;
        },
        enumerable: false,
        configurable: true
    });
    Server.enableSentry = function (app) {
        if (!Server.sentryIsEnabled)
            return;
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            integrations: [
                new Sentry.Integrations.Http({ tracing: true }),
                new Tracing.Integrations.Express({ app: app }),
            ],
            tracesSampleRate: 1.0,
            environment: process.env.SENTRY_ENVIRONMENT,
        });
        app.use(Sentry.Handlers.requestHandler());
        app.use(Sentry.Handlers.tracingHandler());
        app.use(Sentry.Handlers.errorHandler());
    };
    Server.prototype.startApiServer = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var app, keycloak;
            return (0, tslib_1.__generator)(this, function (_a) {
                app = (0, express_1.default)();
                Server.enableSentry(app);
                keycloak = new keycloak_connect_1.default({});
                app.use("/test", keycloak.protect(), Authentication_1.default);
                app.listen(Server.port, function () {
                    console.log("Server listening on " + Server.port);
                });
                return [2 /*return*/];
            });
        });
    };
    return Server;
}());
new Server();
//# sourceMappingURL=server.js.map