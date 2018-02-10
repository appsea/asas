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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29ubmVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQThEO0FBRTlEOztHQUVHO0FBQ0g7SUFVSTtRQUNJLFlBQVksQ0FBQyxlQUFlLENBQUMsaUNBQWlDLGlCQUF5QjtZQUNuRixNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJO29CQUNqQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUNwQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7b0JBQ2pDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ25DLEtBQUssQ0FBQztnQkFDVixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDbkMsaUJBQWlCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDbkMsS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRCTSw2QkFBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQXNCRCx1Q0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBdEJjLDJCQUFTLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUUvRCwyQkFBUyxHQUFZLElBQUksQ0FBQztJQXFCckMsd0JBQUM7Q0FBQSxBQTdCRCxJQTZCQztBQTdCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb25uZWN0aXZpdHkgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSByYWtlc2ggb24gMTUtTm92LTIwMTcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBDb25uZWN0aW9uU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25TZXJ2aWNlLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IENvbm5lY3Rpb25TZXJ2aWNlID0gbmV3IENvbm5lY3Rpb25TZXJ2aWNlKCk7XHJcblxyXG4gICAgc3RhdGljIGNvbm5lY3RlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBjb25uZWN0aXZpdHkuc3RhcnRNb25pdG9yaW5nKGZ1bmN0aW9uIG9uQ29ubmVjdGlvblR5cGVDaGFuZ2VkKG5ld0Nvbm5lY3Rpb25UeXBlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBDb25uZWN0aW9uU2VydmljZS5jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XHJcbiAgICAgICAgICAgICAgICAgICAgQ29ubmVjdGlvblNlcnZpY2UuY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcclxuICAgICAgICAgICAgICAgICAgICBDb25uZWN0aW9uU2VydmljZS5jb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3RlZDtcclxuICAgIH1cclxufVxyXG4iXX0=