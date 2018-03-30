"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_property_decorator_1 = require("../../shared/observable-property-decorator");
/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
var MyDrawerViewModel = /** @class */ (function (_super) {
    __extends(MyDrawerViewModel, _super);
    /* ***********************************************************
    * Use the MyDrawer view model constructor to initialize the properties data values.
    *************************************************************/
    function MyDrawerViewModel(selectedPage) {
        var _this = _super.call(this) || this;
        _this.selectedPage = selectedPage;
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], MyDrawerViewModel.prototype, "selectedPage", void 0);
    return MyDrawerViewModel;
}(observable_1.Observable));
exports.MyDrawerViewModel = MyDrawerViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlEcmF3ZXItdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk15RHJhd2VyLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBMkM7QUFFM0MsNEZBQThFO0FBRTlFOzs4REFFOEQ7QUFDOUQ7SUFBdUMscUNBQVU7SUFHN0M7O2tFQUU4RDtJQUM5RCwyQkFBWSxZQUFvQjtRQUFoQyxZQUNJLGlCQUFPLFNBR1Y7UUFERyxLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzs7SUFDckMsQ0FBQztJQVRxQjtRQUFyQixrREFBa0IsRUFBRTs7MkRBQXNCO0lBVS9DLHdCQUFDO0NBQUEsQUFYRCxDQUF1Qyx1QkFBVSxHQVdoRDtBQVhZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHtPYnNlcnZhYmxlUHJvcGVydHl9IGZyb20gXCIuLi8uLi9zaGFyZWQvb2JzZXJ2YWJsZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogS2VlcCBkYXRhIHRoYXQgaXMgZGlzcGxheWVkIGluIHlvdXIgYXBwIGRyYXdlciBpbiB0aGUgTXlEcmF3ZXIgY3VzdG9tIGNvbXBvbmVudCB2aWV3IG1vZGVsLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgY2xhc3MgTXlEcmF3ZXJWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBzZWxlY3RlZFBhZ2U6IHN0cmluZztcclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIE15RHJhd2VyIHZpZXcgbW9kZWwgY29uc3RydWN0b3IgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydGllcyBkYXRhIHZhbHVlcy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RlZFBhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gc2VsZWN0ZWRQYWdlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==