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
        console.log("Saving.." + this._settings.totalQuestionsMain + " and " + this._settings.totalQuestionsShort);
        settings_service_1.SettingsService.getInstance().saveSetting(this._settings);
    };
    return SettingsViewModel;
}(observable_1.Observable));
exports.SettingsViewModel = SettingsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBc0Q7QUFFdEQsaUVBQTZEO0FBRTdEO0lBQXVDLHFDQUFVO0lBRzdDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxrQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzlELEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7SUFDbkIsQ0FBQztJQUVPLG1DQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUM3SCxDQUFDO0lBRUQsc0JBQUksdUNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsZ0NBQUksR0FBSjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzRyxrQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUF1Qyx1QkFBVSxHQXFCaEQ7QUFyQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudERhdGEsIE9ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7SVNldHRpbmd9IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSBfc2V0dGluZ3M6IElTZXR0aW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gU2V0dGluZ3NTZXJ2aWNlLmdldEluc3RhbmNlKCkucmVhZFNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHVibGlzaCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLl9zZXR0aW5nc30pO1xuICAgIH1cblxuICAgIGdldCBzZXR0aW5ncygpe1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTYXZpbmcuLlwiICsgdGhpcy5fc2V0dGluZ3MudG90YWxRdWVzdGlvbnNNYWluICsgXCIgYW5kIFwiICsgdGhpcy5fc2V0dGluZ3MudG90YWxRdWVzdGlvbnNTaG9ydCk7XG4gICAgICAgIFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpLnNhdmVTZXR0aW5nKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG59Il19