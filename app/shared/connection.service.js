"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectivity = require("tns-core-modules/connectivity");
/**
 * Created by rakesh on 15-Nov-2017.
 */
var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
        connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType) {
            switch (newConnectionType) {
                case connectivity.connectionType.none:
                    ConnectionService.connected = false;
                    break;
                case connectivity.connectionType.wifi:
                    ConnectionService.connected = true;
                    break;
                case connectivity.connectionType.mobile:
                    ConnectionService.connected = true;
                    break;
            }
        });
    }
    ConnectionService.getInstance = function () {
        return ConnectionService._instance;
    };
    ConnectionService.prototype.isConnected = function () {
        return ConnectionService.connected;
    };
    ConnectionService._instance = new ConnectionService();
    ConnectionService.connected = true;
    return ConnectionService;
}());
exports.ConnectionService = ConnectionService;
