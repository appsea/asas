"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toast = require("nativescript-toast");
var settings_view_model_1 = require("./settings-view-model");
var frame_1 = require("ui/frame");
var vm;
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
