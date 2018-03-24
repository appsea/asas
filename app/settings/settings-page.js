"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toast = require("nativescript-toast");
var settings_view_model_1 = require("./settings-view-model");
var frame_1 = require("ui/frame");
var navigationModule = require("../shared/navigation");
var application_1 = require("application");
var platform_1 = require("platform");
var vm;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    var page = args.object;
    page.on(application_1.AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
}
exports.onPageLoaded = onPageLoaded;
function onActivityBackPressedEvent(args) {
    navigationModule.goBack();
    args.cancel = true;
}
exports.onActivityBackPressedEvent = onActivityBackPressedEvent;
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    /*if (args.isBackNavigation) {
        return;
    }*/
    var page = args.object;
    vm = new settings_view_model_1.SettingsViewModel();
    page.bindingContext = vm;
}
exports.onNavigatingTo = onNavigatingTo;
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function save() {
    vm.save();
    Toast.makeText("Saved!!!", "long").show();
}
exports.save = save;
