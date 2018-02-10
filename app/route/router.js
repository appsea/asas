"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_service_1 = require("../services/settings.service");
function onPageLoaded(args) {
}
exports.onPageLoaded = onPageLoaded;
function onNavigatingTo(args) {
    settings_service_1.SettingsService.route();
}
exports.onNavigatingTo = onNavigatingTo;
