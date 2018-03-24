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
