"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var detailed_result_view_model_1 = require("./detailed-result-view-model");
var application_1 = require("application");
var platform_1 = require("platform");
var navigationModule = require("../navigation");
var frame_1 = require("ui/frame");
var page;
var vm;
var list;
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
function pageNavigatingTo(args) {
    page = args.object;
    list = page.getViewById("listView");
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
    list.scrollToIndex(0);
}
exports.all = all;
function correct() {
    vm.correct();
    list.scrollToIndex(0);
}
exports.correct = correct;
function incorrect() {
    vm.incorrect();
    list.scrollToIndex(0);
}
exports.incorrect = incorrect;
function skipped() {
    vm.skipped();
    list.scrollToIndex(0);
}
exports.skipped = skipped;
