"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var result_view_model_1 = require("./result-view-model");
var application = require("application");
var platform_1 = require("platform");
var application_1 = require("application");
var page;
var state;
var vm;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
        data.cancel = true;
    });
}
exports.onPageLoaded = onPageLoaded;
function pageNavigatingTo(args) {
    page = args.object;
    state = page.navigationContext;
    vm = new result_view_model_1.ResultViewModel(state);
    page.bindingContext = vm;
}
exports.pageNavigatingTo = pageNavigatingTo;
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function detailedResult() {
    vm.detailedResult();
}
exports.detailedResult = detailedResult;
