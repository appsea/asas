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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBc0Q7QUFFdEQsaUVBQTZEO0FBRTdEO0lBQXVDLHFDQUFVO0lBRzdDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxrQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzlELEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7SUFDbkIsQ0FBQztJQUVPLG1DQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUM3SCxDQUFDO0lBRUQsc0JBQUksdUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsZ0NBQUksR0FBSjtRQUNJLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQXVDLHVCQUFVLEdBb0JoRDtBQXBCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtJU2V0dGluZ30gZnJvbSBcIi4uL3NoYXJlZC9xdWVzdGlvbnMubW9kZWxcIjtcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9zZXR0aW5nczogSVNldHRpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5yZWFkU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwdWJsaXNoKCkge1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuX3NldHRpbmdzfSk7XG4gICAgfVxuXG4gICAgZ2V0IHNldHRpbmdzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5zYXZlU2V0dGluZyh0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxufSJdfQ==