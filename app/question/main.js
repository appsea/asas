"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var question_view_model_1 = require("./question-view-model");
var application = require("application");
var platform_1 = require("platform");
var application_1 = require("application");
var settings_service_1 = require("../services/settings.service");
var vm;
var optionList;
var scrollView;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
        previous();
        data.cancel = true;
    });
}
exports.onPageLoaded = onPageLoaded;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    var page = args.object;
    optionList = page.getViewById("optionList");
    scrollView = page.getViewById("scrollView");
    vm = new question_view_model_1.QuestionViewModel(settings_service_1.SettingsService.MAIN);
    page.bindingContext = vm;
    application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
        previous();
        data.cancel = true;
    });
}
exports.onNavigatingTo = onNavigatingTo;
/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function handleSwipe(args) {
    if (args.direction == 1) {
        previous();
    }
    else if (args.direction == 2) {
        next();
    }
}
exports.handleSwipe = handleSwipe;
function showMap() {
    vm.showMap();
}
exports.showMap = showMap;
function previous() {
    vm.previous();
}
exports.previous = previous;
function next() {
    vm.next();
}
exports.next = next;
function submit() {
    vm.submit();
}
exports.submit = submit;
function quit() {
    vm.quit();
}
exports.quit = quit;
function showAnswer() {
    vm.showAnswer();
}
exports.showAnswer = showAnswer;
function selectOption(args) {
    vm.selectOption(args);
    optionList.refresh();
}
exports.selectOption = selectOption;
