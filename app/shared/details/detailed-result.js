"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var detailed_result_view_model_1 = require("./detailed-result-view-model");
var application = require("application");
var platform_1 = require("platform");
var application_1 = require("application");
var navigationModule = require("../navigation");
var frame_1 = require("ui/frame");
var page;
var vm;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
        navigationModule.gotoLastPage();
    });
}
exports.onPageLoaded = onPageLoaded;
function pageNavigatingTo(args) {
    page = args.object;
    var state = page.navigationContext;
    vm = new detailed_result_view_model_1.DetailedResultViewModel(state);
    page.bindingContext = vm;
}
exports.pageNavigatingTo = pageNavigatingTo;
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function all() {
    vm.all();
}
exports.all = all;
function correct() {
    vm.correct();
}
exports.correct = correct;
function incorrect() {
    vm.incorrect();
}
exports.incorrect = incorrect;
function skipped() {
    vm.skipped();
}
exports.skipped = skipped;
