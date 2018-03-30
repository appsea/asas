"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var settings_service_1 = require("../services/settings.service");
var SettingsViewModel = /** @class */ (function (_super) {
    __extends(SettingsViewModel, _super);
    function SettingsViewModel() {
        var _this = _super.call(this) || this;
        _this._settings = settings_service_1.SettingsService.getInstance().readSettings();
        _this.publish();
        return _this;
    }
    SettingsViewModel.prototype.publish = function () {
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'settings', value: this._settings });
    };
    Object.defineProperty(SettingsViewModel.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    SettingsViewModel.prototype.save = function () {
        settings_service_1.SettingsService.getInstance().saveSetting(this._settings);
    };
    return SettingsViewModel;
}(observable_1.Observable));
exports.SettingsViewModel = SettingsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBc0Q7QUFFdEQsaUVBQTZEO0FBRTdEO0lBQXVDLHFDQUFVO0lBRzdDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxrQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzlELEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7SUFDbkIsQ0FBQztJQUVPLG1DQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUM3SCxDQUFDO0lBRUQsc0JBQUksdUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsZ0NBQUksR0FBSjtRQUNJLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQXVDLHVCQUFVLEdBb0JoRDtBQXBCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge0lTZXR0aW5nfSBmcm9tIFwiLi4vc2hhcmVkL3F1ZXN0aW9ucy5tb2RlbFwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1ZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgcHJpdmF0ZSBfc2V0dGluZ3M6IElTZXR0aW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5yZWFkU2V0dGluZ3MoKTtcclxuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLl9zZXR0aW5nc30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZXR0aW5ncygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpLnNhdmVTZXR0aW5nKHRoaXMuX3NldHRpbmdzKTtcclxuICAgIH1cclxufSJdfQ==